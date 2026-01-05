import { Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    new Logger().log(`[${req.method}] /// ${req.url} /// ${res.statusCode}`);
    next();
}
