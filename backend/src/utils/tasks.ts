import { Plant } from "../enitities/Plant";
import { Reading } from "../enitities/Reading";
import { waterPlantOnce } from "./waterPlantOnce";

const spawn = require("child_process").spawn;

export function readValuesFromArduinoAndUpdateDB() {
	setInterval(async () => {
		const cmd = spawn("/usr/bin/python", ["./python-scripts/read_from_arduino.py"]);

		cmd.stderr.on("data", (error: ErrorEvent) => {
			console.error(error);
		});

		cmd.stdout.on("data", async (data: Object) => {
			console.log("Received data from python script:", data);
			await insertReadingInDB(data.toString());
			await automaticallyWaterDryPlants();
		});
	}, 30 * 1000);
}

async function insertReadingInDB(data: string) {
	console.log("insertReadingIntoDB data:", data);
	const readings = data.split(":");
	if (readings.length !== 4) {
		throw new Error("Invalid reading?");
	}

	readings.forEach(async (reading, i) => {
		// TODO: Add something like sensorIndex to plants table
		const value = parseInt(reading);
		await Reading.create({
			plantId: i + 1,
			value,
		}).save();
	})
}

async function automaticallyWaterDryPlants() {
	const plants = await Plant.find({
		relations: ["readings"],
		order: { id: "ASC" }
	});
	// console.log("plants", plants);

	plants.forEach(async (plant, i) => {
		if (!plant.waterAutomatically) {
			console.log("Automatic watering is off for index", i);
			return;
		}

		// OBS dom är felkopplade, 2 är inte 2......
		const latestReadings = plant.readings
			.sort((pA, pB) => pB.createdAt.valueOf() - pA.createdAt.valueOf())
			.slice(0, 20);

		const valueSum = latestReadings.reduce((sum, current) => sum + current.value, 0);
		const valueAverage = valueSum / latestReadings.length;
		if (valueAverage < 20) { // TODO: Unique threshold for each plant
			console.log("Watering index", i);
			await waterPlantOnce(i); // TODO: Add something like sensorIndex to plants table
			console.log("Finished");
		} else {
			console.log("No need to water index", i);
		}
	});
}