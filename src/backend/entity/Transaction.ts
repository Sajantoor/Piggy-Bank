import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    store: string;

    @Field()
    @Column()
    location: string;

    @Field(() => String)
    @Column()
    date: Date;

    @Field()
    @Column()
    category: string;
}
