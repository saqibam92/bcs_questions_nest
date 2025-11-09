// src/exam/exam.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async getAllExams() {
    return this.prisma.exam.findMany({
      select: {
        id: true,
        exam_name: true,
        createdAt: true,
      },
    });
  }

  async getExamById(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        subjects: {
          include: {
            questions: true, // This still loads all questions
          },
        },
      },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }
  
  /**
   * More efficient way to get exam details, separating subjects and questions
   * This would replace getExamById for the exam screen
   */
  async getExamWithSubjects(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async getQuestionsForSubject(subjectId: string) {
    return this.prisma.question.findMany({
      where: { subjectId },
    });
  }
  
  // We can create DTOs (Data Transfer Objects) for validation
  // async createExam(data: Prisma.ExamCreateInput) {
  //   return this.prisma.exam.create({ data });
  // }
}