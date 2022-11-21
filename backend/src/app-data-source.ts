import { DataSource } from "typeorm"

import User from "./models/User";
import Account from "./models/Account";
import Transaction from "./models/Transaction";

const myDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.POSTGRES_HOST),
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Account, Transaction],
    logging: false,
    synchronize: true,
});

export default myDataSource;