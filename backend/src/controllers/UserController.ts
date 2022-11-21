import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { StatusCodes } from "http-status-codes";
import userService from '../services/userService';
import jwtAuthenticationMiddleware from '../middlewares/JWT-authentication';

const userController = Router();

userController.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.register(req.body);

        res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        next(error);
    }
});

userController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await userService.login(req.body);
        req.headers['authorization'] = "Bearer " + token;
        res.status(StatusCodes.OK).send({ token });
    } catch (error) {
        next(error);
    }
});

userController.get('/user', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info = await userService.getUserInfo(req.user.username);
        res.status(StatusCodes.OK).send(info);
    } catch (error) {
        next(error);
    }
});



export default userController;