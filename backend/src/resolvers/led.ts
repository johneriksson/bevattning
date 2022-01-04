import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { readLEDStatus } from "../utils/readLEDstatus";
import { setLED } from "../utils/setLED";

@ObjectType()
class LEDResponse {
	@Field(() => Boolean)
	on: Boolean;

	@Field(() => Number)
	id: number;
}

@Resolver()
export class LedResolver {

	@Mutation(() => LEDResponse)
	async set(
		@Arg("on") on: Boolean,
	): Promise<LEDResponse> {
		await setLED(on);
		return { id: 0, on };
	}

	@Query(() => LEDResponse)
	async led(): Promise<LEDResponse> {
		const on = await readLEDStatus();
		console.log("on", on);
		return { id: 0, on };
	}
}