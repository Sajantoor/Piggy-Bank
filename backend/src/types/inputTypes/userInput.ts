import { InputType, Field } from "type-graphql";

/**
 * Username and password input to login or register
 * @param username the username
 * @param password the password
 */
@InputType()
export default class userInput {
    @Field()
    username: string;

    @Field()
    password: string;
}
