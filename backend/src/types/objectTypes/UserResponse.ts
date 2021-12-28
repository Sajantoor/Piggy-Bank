import { Field, ObjectType } from "type-graphql";
import { User } from "../../entity/User";
import FieldError from "./FieldError";

/**
 * Response to the user, containing the user if successful and errors if not
 * @field user the user to return
 * @field errors the errors to return
 */
@ObjectType()
export default class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}
