import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { StatusCodes } from "http-status-codes";

import jwtAuthenticationMiddleware from '../middlewares/JWT-authentication';
import accountService from '../services/accountService';

const accountController = Router();

accountController.get('/balance', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;

        const balance = await accountService.balance(username);

        res.status(StatusCodes.OK).send({ balance });
    } catch (error) {
        next(error);
    }
});

export default accountController;