// src/moderator/moderator.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Details } from '../system/details.entity';
import { Response } from 'express';

@Controller('moderator')
export class ModeratorController {
  constructor(
    @InjectRepository(Details)
    private readonly detailsRepository: Repository<Details>,
  ) {}

  @Post('upload-pdf')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'No file uploaded' };
    }

    try {
      const data = await pdfParse(file.buffer);
      const details = new Details();
      details.question = data.text.slice(0, 255) || 'No text extracted';
      details.option1 = 'N/A';
      details.pdfData = file.buffer;
      details.pdfFileName = file.originalname;

      await this.detailsRepository.save(details);

      return { message: 'PDF uploaded and saved successfully', extractedText: data.text };
    } catch (error) {
      return { error: 'Failed to parse or save PDF' };
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @Get('questions')
  async getAllQuestions() {
    return this.detailsRepository.find();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @Get('questions/:id/pdf')
  async downloadPdf(@Param('id') id: number, @Res() res: Response) {
    const detail = await this.detailsRepository.findOne({ where: { id } });
    if (!detail || !detail.pdfData) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${detail.pdfFileName}"`);
    res.send(detail.pdfData);
  }
}
