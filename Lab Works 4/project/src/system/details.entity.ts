import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Details
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    question: string;
    @Column()
    option1: string;
}