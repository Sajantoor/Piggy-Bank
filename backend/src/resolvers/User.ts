import { Resolver, Arg, Mutation } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";
import FieldError from "../types/objectTypes/FieldError";
import userInput from "../types/inputTypes/userInput";
import UserResponse from "../types/objectTypes/UserResponse";
import validateInput from "../utilities/validateUsername";

@Resolver()
class UserResolver {
    /**
     * Register a new user with a given input 
     * @param input The input that the user has entered
     * @returns The user if successful, or the errors if not
     */
    @Mutation(() => UserResponse)
    async register(@Arg("options") input: userInput): Promise<UserResponse> {
        const errors = await validateInput(input);
        if (errors.length > 0)
            return { errors };

        // Hash the password and create the new user
        // username is case insensitive
        const username = input.username.toLowerCase();
        const hashedPassword = await argon2.hash(input.password);

        const user = User.create({
            username: username,
            password: hashedPassword
        });

        await user.save();
        return { user };
    }

    /**
     * Login a user with a given input 
     * @param input The input that the user has entered
     * @returns The user if successful, or the errors if not
     */
    @Mutation(() => UserResponse)
    async login(@Arg("options") input: userInput): Promise<UserResponse> {
        // usernames are case insensitive
        const username = input.username.toLowerCase();

        // check if the user exists if not return error 
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return {
                errors: [new FieldError("username", "No user with that username")]
            }
        }

        // check if the password is correct, ie hashes match
        const valid = await argon2.verify(user.password, input.password);

        if (!valid) {
            return {
                errors: [new FieldError("username", "No user with that username")]
            }
        }

        return { user };
    }
}

export default UserResolver;