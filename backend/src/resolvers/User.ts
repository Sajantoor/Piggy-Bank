import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";
import FieldError from "../types/objectTypes/FieldError";
import userInput from "../types/inputTypes/userInput";
import UserResponse from "../types/objectTypes/UserResponse";
import validateInput from "../utilities/validateUsername";
import { Context } from "../types/Context";

@Resolver()
class UserResolver {
    /**
     * Register a new user with a given input 
     * @param input The input that the user has entered
     * @returns The user if successful, or the errors if not
     */
    @Mutation(() => UserResponse)
    async register(@Arg("options") input: userInput, @Ctx() { req }: Context): Promise<UserResponse> {
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
        // Create a new session
        req.session.userId = user.id;
        return { user };
    }

    /**
     * Login a user with a given input 
     * @param input The input that the user has entered
     * @returns The user if successful, or the errors if not
     */
    @Mutation(() => UserResponse)
    async login(@Arg("options") input: userInput, @Ctx() { req }: Context): Promise<UserResponse> {
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
        // Create a new session
        req.session.userId = user.id;
        return { user };
    }

    @Mutation(() => UserResponse)
    async profile(@Ctx() { req }: Context): Promise<UserResponse> {
        if (req.session.userId == null) {
            return {
                errors: [new FieldError("", "You are not logged in")]
            }
        }

        const user = await User.findOne(req.session.userId)
        return {
            user: user
        }
    }
}

export default UserResolver;