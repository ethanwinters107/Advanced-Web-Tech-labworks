// src/question/question.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity'; 

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string; 

  @Column({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @ManyToOne(() => User)
  submittedBy: User; 
}
