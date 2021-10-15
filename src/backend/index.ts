import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { Transaction } from "./entity/Transaction";
import TransactionResolver from "./resolvers/Transaction";

const connection = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    database: "piggybank",
    entities: [
        Transaction
    ],
    logging: true,
} as Parameters<typeof createConnection>[0];

const main = async () => {
    await createConnection(connection);

    const app = express();
    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TransactionResolver],
            validate: false,
        }),
    });

    await apolloserver.start();
    apolloserver.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('Listening on port 4000');
    })
};

main();
