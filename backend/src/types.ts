import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
	req: Request & { session: any };//Express.Session };
	res: Response;
	redis: Redis;
}