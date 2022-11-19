import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from '../middlewares/JWT-authentication';
import transactionService from '../services/transactionService';

const transactionController = Router();

transactionController.post('/transactions', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;
        await transactionService.cashin(req.body, username);

        res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        next(error);
    }
});

transactionController.get('/transactions', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.user;
        const list = await transactionService.list(username);

        res.status(StatusCodes.OK).send(list);
    } catch (error) {
        next(error);
    }
});

export default transactionController;