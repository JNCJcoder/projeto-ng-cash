import type { Secret } from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            SALT: string;
            JWT_SECRET: Secret;
        }
    }
}

export { }