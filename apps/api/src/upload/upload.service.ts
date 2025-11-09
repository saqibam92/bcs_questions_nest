// apps/api/src/upload/upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  /**
   * Uploads a batch of new exams from a CSV file.
   * CSV Format: exam_name,date,totalExaminees,highestMark
   */
  async bulkUploadExams(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    const examsToCreate: any[] = [];
    const stream = Readable.from(file.buffer.toString());

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          // Basic validation
          if (!row.exam_name) {
            reject(new BadRequestException('CSV must have "exam_name" column.'));
            stream.destroy();
          }
          
          examsToCreate.push({
            exam_name: row.exam_name,
            date: row.date ? new Date(row.date) : null,
            totalExaminees: row.totalExaminees ? parseInt(row.totalExaminees, 10) : null,
            highestMark: row.highestMark ? parseFloat(row.highestMark) : null,
          });
        })
        .on('end', async () => {
          try {
            const result = await this.prisma.exam.createMany({
              data: examsToCreate,
              skipDuplicates: true,
            });
            resolve({ message: `${result.count} exams uploaded successfully.` });
          } catch (e) {
            reject(new BadRequestException(`Database error: ${e.message}`));
          }
        })
        .on('error', (e) => {
          reject(new BadRequestException(`CSV parsing error: ${e.message}`));
        });
    });
  }

  /**
   * Uploads a full set of questions for a specific exam.
   * CSV Format: subject,ques_no,ques,option_1,option_2,option_3,option_4,correctAnswer,explanation
   */
  async uploadQuestionsForExam(examId: string, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    // Check if exam exists
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new BadRequestException('Exam not found.');
    }

    const questionsBySubject: Map<string, any[]> = new Map();

    const stream = Readable.from(file.buffer.toString());

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          // Validate required fields
          if (!row.subject || !row.ques_no || !row.ques || !row.correctAnswer) {
            reject(new BadRequestException('Missing required columns in CSV (subject, ques_no, ques, correctAnswer).'));
            stream.destroy();
            return;
          }

          if (!questionsBySubject.has(row.subject)) {
            questionsBySubject.set(row.subject, []);
          }

          questionsBySubject.get(row.subject).push({
            ques_no: parseInt(row.ques_no, 10),
            ques: row.ques,
            option_1: row.option_1,
            option_2: row.option_2,
            option_3: row.option_3,
            option_4: row.option_4,
            correctAnswer: row.correctAnswer,
            explanation: row.explanation,
            add_favourite: false,
          });
        })
        .on('end', async () => {
          try {
            const transactionPromises = [];
            let totalQuestions = 0;

            for (const [subjectName, questions] of questionsBySubject.entries()) {
              // Find or create the subject under this exam
              const subjectPromise = this.prisma.subject.upsert({
                
                // --- THIS IS THE FIX ---
                where: {
                  name_examId: { // Use the composite key name Prisma generates
                    name: subjectName,
                    examId: examId,
                  },
                },
                // -----------------------

                update: {}, // No update needed if found
                create: {
                  name: subjectName,
                  examId: examId,
                },
              }).then(subject => {
                // Now create all questions for this subject
                totalQuestions += questions.length;
                return this.prisma.question.createMany({
                  data: questions.map(q => ({
                    ...q,
                    subjectId: subject.id,
                  })),
                  skipDuplicates: true,
                });
              });
              transactionPromises.push(subjectPromise);
            }

            await this.prisma.$transaction(transactionPromises);
            resolve({ message: `Successfully uploaded ${totalQuestions} questions across ${questionsBySubject.size} subjects.` });

          } catch (e) {
            console.error(e);
            reject(new BadRequestException(`Database error: ${e.message}`));
          }
        })
        .on('error', (e) => {
          reject(new BadRequestException(`CSV parsing error: ${e.message}`));
        });
    });
  }
}