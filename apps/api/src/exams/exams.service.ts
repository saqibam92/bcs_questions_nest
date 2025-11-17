// apps/api/src/exams/exams.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ExamCreateInput) {
    return this.prisma.exam.create({ data });
  }

  findAll() {
    return this.prisma.exam.findMany({ include: { subjects: true } });
  }

  findOne(id: string) {
    return this.prisma.exam.findUnique({ where: { id }, include: { subjects: true } });
  }

  update(id: string, data: Prisma.ExamUpdateInput) {
    return this.prisma.exam.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}