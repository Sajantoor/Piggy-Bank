import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { Transaction } from "./entity/Transaction";
import TransactionResolver from "./resolvers/Transaction";
// this is disgusting but CRA doesn't support imports outside of src
// TODO: Make this better, possible solution: https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353
// Didn't work when I tried... :(
import { __PROD__ } from "../../frontend/src/shared/constants";

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
    debug: !__PROD__,
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
