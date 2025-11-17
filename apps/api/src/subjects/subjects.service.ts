// apps/api/src/subjects/subjects.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SubjectCreateInput) {
    return this.prisma.subject.create({
      data,
      include: { exam: true },
    });
  }

  findAll() {
    return this.prisma.subject.findMany({
      include: { exam: true, questions: true },
      orderBy: { name: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: { exam: true, questions: true },
    });
  }

  update(id: string, data: Prisma.SubjectUpdateInput) {
    return this.prisma.subject.update({
      where: { id },
      data,
      include: { exam: true },
    });
  }

  remove(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }
}