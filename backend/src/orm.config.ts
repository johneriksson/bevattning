import { ConnectionOptions } from "typeorm";
import { Plant } from "./enitities/Plant";
import { Reading } from "./enitities/Reading";
// import { __prod__ } from "./constants";
import { User } from "./enitities/User";

export default {
	host: "localhost",
	type: "postgres",
	database: "bevattning",
	username: "postgres",
	password: "postgres",
	logging: true,
	synchronize: true,
	entities: [Plant, User, Reading],
} as ConnectionOptions;