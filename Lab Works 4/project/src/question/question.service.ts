// src/question/question.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  // Function to approve a question
  async approveQuestion(id: number): Promise<Question> {
    const question = await this.questionRepo.findOneBy({ id });
    if (!question) throw new Error('Question not found');
    question.status = 'approved';
    return this.questionRepo.save(question);
  }

  // Function to get all pending questions
  async getPendingQuestions(): Promise<Question[]> {
    return this.questionRepo.find({ where: { status: 'pending' } });
  }
}
