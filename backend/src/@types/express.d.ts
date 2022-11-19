interface userInterface {
    username: string,
};

declare namespace Express {
    export interface Request {
        user: userInterface;
    }
}