// src/question/question.controller.ts
import { Controller, Patch, Param, Get } from '@nestjs/common';
import { QuestionService } from './question.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard'; 
import { Roles } from '../auth/roles.decorator'; 
import { UserRole } from '../user/entities/user.entity'; 

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('pending')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MODERATOR) // Protect route with Roles
  async getPendingQuestions() {
    return this.questionService.getPendingQuestions();
  }

  @Patch('approve/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MODERATOR) 
  async approveQuestion(@Param('id') id: number) {
    return this.questionService.approveQuestion(id);
  }
}
