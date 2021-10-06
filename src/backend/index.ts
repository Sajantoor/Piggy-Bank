import "reflect-metadata";
import { createConnection } from "typeorm";

import { Transaction } from "./entity/Transaction";

console.log("Hello, world!");

const connection = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "piggybank",
    entities: [
        Transaction
    ],
    logging: true,
} as Parameters<typeof createConnection>[0];


createConnection(connection).then(async connection => {
    console.log("Inserting a new transaction into the database...");
    const transaction = new Transaction();
}).catch(error => console.log(error));
