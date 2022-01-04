// import { MyContext } from "../types";
// import { Resolver, Arg, Int, Mutation, Field, InputType, Ctx, UseMiddleware, Query, ObjectType } from "type-graphql";
// import { isAuth } from "../middleware/isAuth";
// import { setLED } from "../utils/setLED";
// import { readLEDStatus } from "../utils/readLEDstatus";

// @ObjectType()
// class LEDResponse {
// 	@Field(() => Boolean)
// 	on: Boolean;

// 	@Field(() => Number)
// 	id: number;
// }

// @Resolver()
// export class MiscResolver {

// 	@Mutation(() => LEDResponse)
// 	// @UseMiddleware(isAuth)
// 	async setLED(
// 		@Arg("on") on: Boolean,
// 	): Promise<LEDResponse> {
// 		await setLED(on);
// 		return { id: 0, on };
// 	}

// 	@Query(() => LEDResponse)
// 	async getLED(): Promise<LEDResponse> {
// 		const on = await readLEDStatus();
// 		console.log("on", on);
// 		return { id: 0, on };
// 	}
// }