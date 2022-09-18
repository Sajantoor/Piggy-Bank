import { User } from "../entity/User";
import FieldError from "../types/objectTypes/FieldError";
import UserInput from "../types/inputTypes/userInput";

/**
 * Validates the inputted email
 * @param email the email to validate
 * @returns Whether the email is valid
 */
function validateEmail(email: string): boolean {
    if (email.includes(" ")) return false;
    if (!email.includes("@")) return false;
    if (!email.includes(".")) return false;
    return true;
}

/**
 * Validates the inputted username
 * @param username the username to validate
 * @returns true if valid, false otherwise
 */
function validateUsername(username: string): boolean {
    if (username.length < 4)
        return false;

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

/**
 * Validates the user iput and creates errors if any exist
 * @param input the user input to validate
 * @returns An array of field errors if any
 */
async function validateInput(input: UserInput): Promise<FieldError[]> {
    // check if the user already exists
    const isUser = await User.findOne({ where: { username: input.username } });
    const isEmail = await User.findOne({ where: { email: input.email } })
    const errors: FieldError[] = [];

    // username has to be unique and not contain spaces
    if (isEmail)
        errors.push(new FieldError("email", "That email is already taken"))

    if (isUser)
        errors.push(new FieldError("username", "That username is already taken"));

    // We check if username exists, before this point. 
    if (!validateUsername(input.username!))
        errors.push(new FieldError("username", "Username must not contain spaces and must be longer than 4 characters long"));

    if (!validateEmail(input.email))
        errors.push(new FieldError("email", "Invalid email"))


    if (!validatePassword(input.password))
        errors.push(new FieldError("password", "Password must be at least 8 characters long"));

    return errors;
}

export default validateInput;
