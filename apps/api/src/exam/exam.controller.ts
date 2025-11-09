// src/exam/exam.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('api/exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getAllExams() {
    const exams = await this.examService.getAllExams();
    return {
      success: true,
      count: exams.length,
      data: exams,
    };
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    // This is the inefficient way, as per your original code
    // const exam = await this.examService.getExamById(id);
    
    // This is the new, more efficient way
    const exam = await this.examService.getExamWithSubjects(id);
    
    return {
      success: true,
      data: exam,
    };
  }

  @Get('/subjects/:subjectId/questions')
  async getQuestionsForSubject(@Param('subjectId') subjectId: string) {
    const questions = await this.examService.getQuestionsForSubject(subjectId);
    return {
      success: true,
      count: questions.length,
      data: questions,
    };
  }
}