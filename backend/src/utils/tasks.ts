import { Reading } from "../enitities/Reading";

const spawn = require("child_process").spawn;

export function readValuesFromArduinoAndUpdateDB() {
	setInterval(() => {
		const cmd = spawn("/usr/bin/python", ["./python-scripts/read_from_arduino.py"]);

		cmd.stderr.on("data", (/*error: ErrorEvent*/) => {
			// do what?
		});

		cmd.stdout.on("data", (data: Object) => {
			console.log("Received data from python script:", data);
			insertReadingInDB(data.toString());
		});
	}, 30 * 1000);
}

function insertReadingInDB(data: string) {
	console.log("insertReadingIntoDB data:", data);
	const readings = data.split(":");
	if (readings.length !== 4) {
		throw new Error("Invalid reading?");
	}

	readings.forEach((reading, i) => {
		// TODO: Add something like sensorIndex to plants table
		const value = parseInt(reading);
		Reading.create({
			plantId: i + 1,
			value,
		}).save();
	})
}