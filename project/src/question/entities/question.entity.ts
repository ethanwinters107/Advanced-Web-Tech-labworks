// src/question/question.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Assuming you have a User entity for the teacher

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for each question

  @Column()
  content: string; // The content of the question submitted by the teacher

  @Column({ default: 'pending' })
  status: string; // Status of the question, can be 'pending', 'approved', or 'rejected'

  @ManyToOne(() => User)
  submittedBy: User; // Relation to the User (Teacher) who submitted the question
}
