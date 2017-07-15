import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 255})
    email: string;
    @Column()
    password: string;
    @Column({length: 255})
    firstname: string;
    @Column({length: 255})
    lastname: string;
    @Column("int")
    birthdate: number;
}
