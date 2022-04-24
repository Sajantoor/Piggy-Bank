import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import TransactionResolver from './resolvers/Transaction';
import UserResolver from './resolvers/User';
import connection from './utilities/connection';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { COOKIE_NAME } from './utilities/constants';
import { __PROD__ } from '../../frontend/src/shared/constants';
import { Context } from './types/Context';

const IS_APOLLO_STUDIO = true;

const main = async () => {
    // create connection to typeorm
    await createConnection(connection);
    // create express server
    const app = express();

    if (IS_APOLLO_STUDIO)
        app.set('trust proxy', 1);

    // create redis client
    const RedisStore = connectRedis(session);
    const redisClient = createClient({ legacyMode: true });
    redisClient.connect().catch(console.error);

    // Create session middleware with redis
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                httpOnly: true,
                sameSite: 'none', // csrf
                secure: IS_APOLLO_STUDIO || __PROD__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET!,
            resave: false,
        }),
    );

    // graphql schema with apollo-server
    const apolloserver = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TransactionResolver, UserResolver],
        }),
        context: ({ req, res }): Context => ({ req, res }),
    });

    const cors = IS_APOLLO_STUDIO ? { "credentials": true, "origin": "https://studio.apollographql.com" } : {};

    // apply middleware and start server
    await apolloserver.start();
    apolloserver.applyMiddleware({
        app,
        cors: cors
    });

    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
};

main();
