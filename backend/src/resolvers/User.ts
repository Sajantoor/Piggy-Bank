import { Resolver, Arg, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";
import FieldError from "../types/objectTypes/FieldError";
import UserInput from "../types/inputTypes/userInput";
import UserResponse from "../types/objectTypes/UserResponse";
import validateInput from "../utilities/validateRegister";
import { Context } from "../types/Context";
import { isAuth } from "../middlewares/authentication";
import { COOKIE_NAME } from "../utilities/constants";

@Resolver()
class UserResolver {
    /**
     * Register a new user with a given input 
     * @param input The input that the user has entered
     * @returns The user if successful, or the errors if not
     */
    @Mutation(() => UserResponse)
    async register(@Arg("options") input: UserInput, @Ctx() { req }: Context): Promise<UserResponse> {
        // For registration, username is required
        if (!input.username)
            return {
                errors: [new FieldError("username", "Username is required")]
            }

        const errors = await validateInput(input);
        if (errors.length > 0)
            return { errors };

        // Hash the password and create the new user
        // username and email is case insensitive
        const email = input.email.toLowerCase();
        const username = input.username.toLowerCase();
        const hashedPassword = await argon2.hash(input.password);

        const user = User.create({
            email: email,
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
    async login(@Arg("options") input: UserInput, @Ctx() { req }: Context): Promise<UserResponse> {
        // usernames are case insensitive
        const email = input.email.toLowerCase();

        // check if the user exists if not return error 
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return {
                errors: [new FieldError("email", "No user with that email")]
            }
        }

        // check if the password is correct, ie hashes match
        const valid = await argon2.verify(user.password, input.password);

        if (!valid) {
            return {
                errors: [new FieldError("email", "No user with that email")]
            }
        }
        // Create a new session
        req.session.userId = user.id;
        return { user };
    }

    /**
     * Gets the currently logged in user authenticated by session 
     * @returns The user, if logged in and session is created, errors otherwise.
     */
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


    /**
     * Logs out the currently logged in user, requires authentication to logout. 
     * Destroys the session and clears the cookie.
     * @returns True, if able to logout, False if there's some error
     */
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
        return new Promise((resolve) => {
            req.session.destroy((e) => {
                if (e) {
                    resolve(false);
                    console.error("Failed to logout " + e);
                }

                res.clearCookie(COOKIE_NAME);
                resolve(true);
            })

        })
    }
}

export default UserResolver;