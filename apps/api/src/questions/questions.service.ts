// apps/api/src/questions/questions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionCreateInput) {
    return this.prisma.question.create({
      data,
      include: { subject: true },
    });
  }

  findAll() {
    return this.prisma.question.findMany({
      include: { subject: { include: { exam: true } } },
      orderBy: { createdAt: 'desc' }, // Assuming you add createdAt to Question model, otherwise remove this line
      take: 100, // Limit for performance, implement pagination later
    });
  }

  findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
      include: { subject: { include: { exam: true } } },
    });
  }

  // New method to filter questions by Subject
  findBySubject(subjectId: string) {
    return this.prisma.question.findMany({
      where: { subjectId },
      orderBy: { ques_no: 'asc' },
    });
  }

  update(id: string, data: Prisma.QuestionUpdateInput) {
    return this.prisma.question.update({
      where: { id },
      data,
      include: { subject: true },
    });
  }

  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}