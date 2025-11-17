// apps/api/src/questions/questions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AdminRole, Prisma } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Post()
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  create(@Body() createQuestionDto: Prisma.QuestionCreateInput) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Get('subject/:subjectId')
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.questionsService.findBySubject(subjectId);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles(AdminRole.MODERATOR, AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: Prisma.QuestionUpdateInput,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(AdminRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}