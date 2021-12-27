import { Resolver, Arg, Mutation, InputType, Field, ObjectType } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

/**
 * User friendly error, saying what field is invalid and why
 */
@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

/**
 * Validates the inputted username 
 * @param username the username to validate
 * @returns true if valid, false otherwise
 */
function validateUsername(username: string): boolean {
    if (username.includes(" "))
        return false;

    return true;
}

/**
 * Validates the inputted password
 * @param password the password to validate
 * @returns true if valid, false otherwise
 */
function validatePassword(password: string): boolean {
    if (password.length < 8)
        return false;

    return true;
}

@Resolver()
class UserResolver {
    @Mutation(() => UserResponse)
    async register(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
        // check if the user already exists
        const isUser = await User.findOne({ where: { username: options.username } });

        if (isUser)
            return {
                errors: [{
                    field: "username",
                    message: "Username already exists"
                }],
            }

        // Validate the username and password
        if (!validateUsername(options.username))
            return {
                errors: [{
                    field: "username",
                    message: "Invalid username: can't contain spaces"
                }]
            }

        if (!validatePassword(options.password))
            return {
                errors: [{
                    field: "password",
                    message: "Invalid password: must be at least 8 characters"
                }]
            }

        // Hash the password and create the new user
        const username = options.username.toLowerCase();
        const hashedPassword = await argon2.hash(options.password);

        const user = User.create({
            username: username,
            password: hashedPassword
        });

        await user.save();
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(@Arg("options") options: UsernamePasswordInput): Promise<UserResponse> {
        const username = options.username;
        const user = await User.findOne({ where: { username: username } });

        if (!user)
            return {
                errors: [{
                    field: "username",
                    message: "That username doesn't exist"
                }],
            }


        const valid = await argon2.verify(user.password, options.password);

        if (!valid)
            return {
                errors: [{
                    field: "password",
                    message: "Incorrect password"
                }],
            }

        return { user };
    }
}

export default UserResolver;