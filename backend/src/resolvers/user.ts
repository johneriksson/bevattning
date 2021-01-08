import { Resolver, Mutation, Arg, Field, InputType, Ctx, ObjectType, Query } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../enitities/User";
import argon2 from "argon2";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuid_v4 } from "uuid";
import { validateNewPassword, validateNewUsername } from "../utils/validateUserFields";

@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@ObjectType()
export class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg("username") username: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { username }});
		// const user = await em.findOne(User, { username });
		if (!user) {
			return true;
		}

		const token = uuid_v4(); // generate random string (uuid)
		await redis.set(
			`${FORGOT_PASSWORD_PREFIX}${token}`,
			user.id,
			"ex",
			1000 * 60 * 60 * 24 * 3 // 3 days
		);
		
		sendEmail({
			to: user.username,
			subject: "Radion App: Reset password",
			html: `<a href="http://localhost:3001/change-password/${token}">Change password</a>`,
		});

		return true;
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { req, redis }: MyContext
	): Promise<UserResponse> {
		const errors = [
			...validateNewPassword(newPassword, "newPassword"),
		];
		if (errors.length) {
			return { errors };
		}

		const userId = await redis.get(`${FORGOT_PASSWORD_PREFIX}${token}`);
		if (!userId) {
			return {
				errors: [
					{
						field: "general",
						message: "Link expired or already used."
					}
				]
			};
		}


		const userIdNum = parseInt(userId);
		const user = await User.findOne(userIdNum);
		if (!user) {
			return {
				errors: [
					{
						field: "general",
						message: "User no longer exists."
					}
				]
			};
		}

		const hashedPassword = await argon2.hash(newPassword);
		User.update({ id: userIdNum }, { password: hashedPassword });
		
		await redis.unlink(`${FORGOT_PASSWORD_PREFIX}${token}`);

		// Login user after password change
		req.session.userId = user.id;
		return { user };
	}

	@Query(() => User, { nullable: true })
	async me(
		@Ctx() { req }: MyContext
	) {
		// Not logged in
		if (!req.session.userId) {
			return null;
		}

		const user = await User.findOne(req.session.userId);
		return user;
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("options") options: UsernamePasswordInput,
		@Ctx() { req }: MyContext,
	): Promise<UserResponse> {
		const errors = [
			...validateNewUsername(options.username),
			...validateNewPassword(options.password),
		];
		if (errors.length) {
			return { errors };
		}

		const hashedPassword = await argon2.hash(options.password);
		
		try {
			// const result = await getConnection()
			// 	.createQueryBuilder()
			// 	.insert()
			// 	.into(User)
			// 	.values({
			// 		username: options.username.toLowerCase(),
			// 		password: hashedPassword,
			// 	})
			// 	.returning("*")
			// 	.execute();
			
			// user = result.raw[0];
			const user = await User.create({
				username: options.username.toLowerCase(),
				password: hashedPassword,
			}).save();

			// store user id (logs them in)
			req.session.userId = user.id;

			console.log("created user:", user);
			sendEmail({
				to: "radion.app@johneriksson.me",
				subject: "New user registered",
				html: `
					<h1>New user registered:</h1>
					<p>Username: ${user.username}</p>
				`,
			});

			return { user };
		} catch(err) {
			console.log("register error", err);
			if (err.code === "23505" || err.detail.includes("already exists")) {
				return {
					errors: [
						{ field: "username", message: "Username already taken."},
					]
				}
			}

			return {
				errors: [
					{ field: "general", message: "Unknown error occured when registering :(" },
				]
			}
		}
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("options") options: UsernamePasswordInput,
		@Ctx() { req }: MyContext,
	): Promise<UserResponse> {
		const user = await User.findOne({
			where: { username: options.username.toLowerCase() }
		});
		if (!user) {
			return {
				errors: [
					{
						field: "username",
						message: "That username doesn't exist.",
					}
				],
			};
		}

		const valid = await argon2.verify(user.password, options.password);
		if (!valid) {
			return {
				errors: [
					{
						field: "password",
						message: "Incorrect password.",
					}
				],
			};
		}

		req.session.userId = user.id;
	
		return { user };
	}

	@Mutation(() => Boolean)
	logout(
		@Ctx() { req, res }: MyContext
	) {
		return new Promise(resolve => {
			req.session.destroy((err: any) => {
				res.clearCookie(COOKIE_NAME);

				if (err) {
					console.log("session destroy error", err);
					resolve(false);
					return;
				}

				resolve(true);
			});
		});
	}
}