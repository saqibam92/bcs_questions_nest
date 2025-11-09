"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const csvParser = require("csv-parser");
const stream_1 = require("stream");
let UploadService = class UploadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkUploadExams(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded.');
        }
        const examsToCreate = [];
        const stream = stream_1.Readable.from(file.buffer.toString());
        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.exam_name) {
                    reject(new common_1.BadRequestException('CSV must have "exam_name" column.'));
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
                }
                catch (e) {
                    reject(new common_1.BadRequestException(`Database error: ${e.message}`));
                }
            })
                .on('error', (e) => {
                reject(new common_1.BadRequestException(`CSV parsing error: ${e.message}`));
            });
        });
    }
    async uploadQuestionsForExam(examId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded.');
        }
        const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
        if (!exam) {
            throw new common_1.BadRequestException('Exam not found.');
        }
        const questionsBySubject = new Map();
        const stream = stream_1.Readable.from(file.buffer.toString());
        return new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', (row) => {
                if (!row.subject || !row.ques_no || !row.ques || !row.correctAnswer) {
                    reject(new common_1.BadRequestException('Missing required columns in CSV (subject, ques_no, ques, correctAnswer).'));
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
                        const subjectPromise = this.prisma.subject.upsert({
                            where: {
                                name_examId: {
                                    name: subjectName,
                                    examId: examId,
                                },
                            },
                            update: {},
                            create: {
                                name: subjectName,
                                examId: examId,
                            },
                        }).then(subject => {
                            totalQuestions += questions.length;
                            return this.prisma.question.createMany({
                                data: questions.map(q => (Object.assign(Object.assign({}, q), { subjectId: subject.id }))),
                                skipDuplicates: true,
                            });
                        });
                        transactionPromises.push(subjectPromise);
                    }
                    await this.prisma.$transaction(transactionPromises);
                    resolve({ message: `Successfully uploaded ${totalQuestions} questions across ${questionsBySubject.size} subjects.` });
                }
                catch (e) {
                    console.error(e);
                    reject(new common_1.BadRequestException(`Database error: ${e.message}`));
                }
            })
                .on('error', (e) => {
                reject(new common_1.BadRequestException(`CSV parsing error: ${e.message}`));
            });
        });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map