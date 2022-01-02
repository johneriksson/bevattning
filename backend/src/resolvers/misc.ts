import { MyContext } from "../types";
import { Resolver, Arg, Int, Mutation, Field, InputType, Ctx, UseMiddleware, Query, ObjectType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { toggleLED } from "src/utils/toggleLED";

@Resolver()
export class MiscResolver {

	@Mutation()
	@UseMiddleware(isAuth)
	async toggleLED(): Promise<null> {
		try {
			await toggleLED();
		} catch(e) {
			console.log("e", e);
			return null;
		}

        return null;
	}
}