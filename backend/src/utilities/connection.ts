import { createConnection } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { User } from "../entity/User";
// this is disgusting but CRA doesn't support imports outside of src
// TODO: Make this better, possible solution: https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353
// Didn't work when I tried... :(
import { __PROD__ } from "../../../frontend/src/shared/constants";

/** Connection options for TypeORM */
const connection = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    database: "piggybank",
    entities: [
        Transaction,
        User
    ],
    debug: !__PROD__,
    logging: true,
} as Parameters<typeof createConnection>[0];

export default connection;