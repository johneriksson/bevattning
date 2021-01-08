import { Arg, ClassType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { BaseEntity, getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";


export function createBaseResolver<T extends BaseEntity>(
	suffix: string,
	TClass: ClassType<T>,
) {

	@Resolver(() => TClass, { isAbstract: true })
	abstract class BaseResolver {

		// @Query(
		// 	() => [TClass],
		// 	{ name: `${suffix}s` }
		// )
		// async getAll(): Promise<T[]> {
		// 	const qb = getConnection()
		// 		.getRepository<T>(suffix)
		// 		.createQueryBuilder("r")
		// 		.orderBy(`r."createdAt"`, "DESC");

		// 	const items = await qb.getMany();
		// 	return items;
		// }

		@Query(() => TClass, { name: suffix, nullable: true })
		async getOne(
			@Arg("id", () => Int) id: number,
		): Promise<T | undefined> {
			const qb = getConnection()
				.getRepository<T>(suffix)
				.createQueryBuilder("r")
				.where("id = :id", { id });
			
			const item = await qb.getOne();
			return item;
		}

		@Mutation(() => Boolean, { name: `delete${suffix.charAt(0).toUpperCase()}${suffix.substr(1)}` })
		@UseMiddleware(isAuth)
		async delete(
			@Arg("id", () => Int) id: number,
		): Promise<boolean> {
			const qb = getConnection()
				.getRepository<T>(suffix)
				.createQueryBuilder()
				.delete()
				.from(TClass)
				.where("id = :id", { id });
			
			qb.execute();
			return true;
		}
	}

	return BaseResolver;
}