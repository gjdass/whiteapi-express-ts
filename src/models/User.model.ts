import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({length: 255})
    public email: string;
    @Column()
    public password: string;
    @Column({length: 255})
    public firstname: string;
    @Column({length: 255})
    public lastname: string;
    @Column("int")
    public birthdate: number;
}
