import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import ForbiddenError from "../models/errors/forbiddenError";
import DatabaseError from "../models/errors/databaseError";
import BadRequestError from "../models/errors/badRequestError";
import UserError from "../models/errors/userError";
import UnauthorizedError from "../models/errors/unauthorizedError";

function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    let status;
    if (error instanceof ForbiddenError) {
        status = StatusCodes.FORBIDDEN;
    }
    else if (error instanceof BadRequestError) {
        status = StatusCodes.BAD_REQUEST;
    }
    else if (error instanceof DatabaseError) {
        status = StatusCodes.BAD_REQUEST;
    }
    else if (error instanceof UnauthorizedError) {
        status = StatusCodes.UNAUTHORIZED;
    }
    else if (error instanceof UserError) {
        status = StatusCodes.UNAUTHORIZED;
    }
    else {
        status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    res.status(status).json({ message: error.message });
}


export default errorHandler;