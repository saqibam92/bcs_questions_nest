import { QuestionsService } from './questions.service';
import { Prisma } from '@prisma/client';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: Prisma.QuestionCreateInput): Prisma.Prisma__QuestionClient<{
        subject: {
            id: string;
            name: string;
            examId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        subject: {
            exam: {
                id: string;
                exam_name: string;
                createdAt: Date;
                updatedAt: Date;
                date: Date | null;
                totalExaminees: number | null;
                highestMark: number | null;
            };
        } & {
            id: string;
            name: string;
            examId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    })[]>;
    findOne(id: string): Prisma.Prisma__QuestionClient<{
        subject: {
            exam: {
                id: string;
                exam_name: string;
                createdAt: Date;
                updatedAt: Date;
                date: Date | null;
                totalExaminees: number | null;
                highestMark: number | null;
            };
        } & {
            id: string;
            name: string;
            examId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findBySubject(subjectId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    }[]>;
    update(id: string, updateQuestionDto: Prisma.QuestionUpdateInput): Prisma.Prisma__QuestionClient<{
        subject: {
            id: string;
            name: string;
            examId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__QuestionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ques_no: number;
        ques: string;
        option_1: string;
        option_2: string;
        option_3: string;
        option_4: string;
        correctAnswer: string;
        explanation: string;
        add_favourite: boolean;
        subjectId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
