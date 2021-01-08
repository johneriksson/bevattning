import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";

import ormConfig from "./orm.config"
import { COOKIE_NAME, __prod__ } from "./constants";
import { PlantResolver } from "./resolvers/plant";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { readValuesFromArduinoAndUpdateDB } from "./utils/tasks";

const main = async () => {
	await createConnection(ormConfig);

	const app = express();
	app.use(cors({
		origin: "http://localhost:3000",
		credentials: true,
	}));

	const RedisStore = connectRedis(session);
	const redis = new Redis();
	app.use(session({
		name: COOKIE_NAME,
		store: new RedisStore({
			client: redis,
			disableTouch: true,
		}),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
			httpOnly: true,
			sameSite: "lax",
			secure: __prod__,
		},
		saveUninitialized: false,
		secret: "asdsadwqlökopdsfkop",
		resave: false,
	}));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [PlantResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ req, res, redis }),
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.get("/", (_, res) => {
		res.send("Hello world");
	});

	app.listen(4000, () => {
		console.log("Server started on localhost:4000");
	});
	
	readValuesFromArduinoAndUpdateDB();

	// const post = orm.em.create(Post, { title: "my first post" });
	// await orm.em.persistAndFlush(post);
};

main().catch(console.error);