import "reflect-metadata";
import express from 'express';
import cors from 'cors';

import myDataSource from "./app-data-source";
import errorHandler from './middlewares/errorHandler';

import userController from './controllers/UserController';
import accountController from "./controllers/AccountController";
import transactionController from "./controllers/TransactionController";


myDataSource.initialize()
    .then(() => {
        console.log("Data Source iniciado.")
    })
    .catch((err) => {
        console.error("Erro durante o inicio do Data Source:", err)
    });

const app = express();

// Aplicação
app.use(cors());
app.use(express.json());

// Rotas
app.use(userController);
app.use(accountController);
app.use(transactionController);

// Error Handler
app.use(errorHandler);

export default app;