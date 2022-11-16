import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbiddenError";

function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ForbiddenError) {
        res.sendStatus(StatusCodes.FORBIDDEN);
    }
    else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


export default errorHandler;