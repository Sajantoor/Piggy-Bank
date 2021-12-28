import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql";
import TransactionResolver from "./resolvers/Transaction";
import UserResolver from "./resolvers/User";
import connection from "./utilities/connection";

const main = async () => {
    // create connection to typeorm 
    await createConnection(connection);
    // create express server
    const app = express();

    // graphql schema with apollo-server
    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TransactionResolver, UserResolver],
            validate: false,
        }),
    });

    // apply middleware and start server
    await apolloserver.start();
    apolloserver.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('Listening on port 4000');
    })
};

main();
