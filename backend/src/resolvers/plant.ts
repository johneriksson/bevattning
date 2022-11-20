import { MyContext } from "../types";
import { Resolver, Arg, Int, Mutation, Field, InputType, Ctx, UseMiddleware, Query, ObjectType } from "type-graphql";
import { Plant } from "../enitities/Plant";
import { isAuth } from "../middleware/isAuth";
import { createBaseResolver } from "../utils/createBaseResolver";
import { waterPlantOnce } from "../utils/waterPlantOnce";

@InputType()
class PlantInput {
	@Field()
	title: string
}

const PlantBaseResolver = createBaseResolver<Plant>("plant", Plant);

@Resolver()
export class PlantResolver extends PlantBaseResolver {

	@Query(() => [Plant])
	async plants(): Promise<Plant[]> {

		// TODO: Use query builder to only take the latest reading for each plant. No need to return all readings in this query
		const plants = await Plant.find({
			relations: ["readings"],
			order: {
				id: "ASC"
			}
		});
		// HACK 
		plants.forEach(p => {
			const latest20readings = p.readings
				.sort((pA, pB) => pB.createdAt.valueOf() - pA.createdAt.valueOf())
				.slice(0, 20);
			p.readings = latest20readings;
		});

		return plants;
	}

	@Query(() => Plant)
	@UseMiddleware(isAuth)
	async plant(
		@Arg("id", () => Int) id: number,
	): Promise<Plant | null> {
		// TODO: Use query builder to only take the latest 100 (?) readings for each plant.
		const plant = await Plant.findOne(id, {
			relations: ["readings"]
		});

		if (!plant) {
			return null;
		}

		return plant;
	}

	@Mutation(() => Plant)
	@UseMiddleware(isAuth)
	async createPlant(
		@Arg("input") input: PlantInput,
		@Ctx() { req }: MyContext
	): Promise<Plant> {
		return Plant.create({
			...input,
			creatorId: req.session.userId,
		}).save();
	}

	@Mutation(() => Plant, { nullable: true })
	@UseMiddleware(isAuth)
	async updatePlant(
		@Arg("id", () => Int) id: number,
		@Arg("title", () => String) title: string,
	): Promise<Plant | null> {
		const plant = await Plant.findOne(id);
		if (!plant) {
			return null;
		}
		if (typeof title !== "undefined") {
			await Plant.update({ id }, { title });
		}
		return plant;
	}

	@Mutation(() => Plant, { nullable: true })
	@UseMiddleware(isAuth)
	async setPlantAutoStatus(
		@Arg("id", () => Int) id: number,
		@Arg("auto", () => Boolean) auto: boolean,
	): Promise<Plant | null | undefined> {
		const plant = await Plant.findOne(id);
		if (!plant) {
			return null;
		}
		if (typeof auto !== "undefined") {
			// await Post.update({id}, {...input}).then(response => response.raw[0]);
			await Plant.update({ id }, { waterAutomatically: auto });
			return (await Plant.findOne(id));
			// return updatedPlant;
		}
		return plant;
	}

	@Mutation(() => Plant, { nullable: true })
	@UseMiddleware(isAuth)
	async waterPlant(
		@Arg("id", () => Int) id: number,
	): Promise<Plant | null> {
		const plant = await Plant.findOne(id);
		if (!plant) {
			return null;
		}

		try {
			// TODO: Add something like sensorIndex to plants table
			await waterPlantOnce(id - 1);
		} catch(e) {
			console.log("e", e);
			return null;
		}

		return null;
		// return plant;
	}
}