import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    store: string;

    @Column()
    location: string;

    @Column()
    date: Date;

    @Column()
    category: string;
}
