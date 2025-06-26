import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  option1: string;

  @Column({ type: 'bytea', nullable: true })
  pdfData?: Buffer;
  
  @Column({ nullable: true })
  pdfFileName?: string;  // optional: to store original file name
}
