import { Field, ObjectType } from "type-graphql";

/**
 * Field Error for errors created by a user field input
 * @field field the field that is invalid
 * @filed the message to display to the user
 */
@ObjectType()
export default class FieldError {
    /**
 * @param field the field that is invalid
 * @param message the message to display to the user
 * @returns a field error with the given field and message
 */
    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }

    @Field()
    field: string;

    @Field()
    message: string;
}
