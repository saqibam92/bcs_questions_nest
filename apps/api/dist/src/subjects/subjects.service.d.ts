import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class SubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SubjectCreateInput): Prisma.Prisma__SubjectClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        questions: {
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
        }[];
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
    })[]>;
    findOne(id: string): Prisma.Prisma__SubjectClient<{
        questions: {
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
        }[];
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.SubjectUpdateInput): Prisma.Prisma__SubjectClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__SubjectClient<{
        id: string;
        name: string;
        examId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
