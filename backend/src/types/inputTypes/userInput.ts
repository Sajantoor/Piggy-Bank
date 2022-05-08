import { InputType, Field } from "type-graphql";

/**
 * Username, password, and email input to register
 * @param username the username
 * @param password the password
 */
@InputType()
export default class UserInput {
    @Field()
    email: string;

    @Field()
    username?: string;

    @Field()
    password: string;
}