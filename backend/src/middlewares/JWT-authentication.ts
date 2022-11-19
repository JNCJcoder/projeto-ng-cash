import type { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

import UnauthorizedError from '../models/errors/unauthorizedError';

const secret = process.env.JWT_SECRET;

async function jwtAuthenticationMiddleware(req: Request, _res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new UnauthorizedError('Tipo de autenticação inválido');
        }

        try {
            const tokenPayload = JWT.verify(token, secret!);

            if (typeof tokenPayload !== 'object' || !tokenPayload.id || !tokenPayload.username) {
                throw new UnauthorizedError('Token Inválido');
            }

            req.user = {
                username: tokenPayload.username
            };

            next();
        } catch (error) {
            throw new UnauthorizedError('Token Inválido');
        }
    }
    catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;