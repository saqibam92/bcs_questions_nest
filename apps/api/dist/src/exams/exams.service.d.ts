import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ExamsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ExamCreateInput): Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<({
        subjects: {
            id: string;
            name: string;
            examId: string;
        }[];
    } & {
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    })[]>;
    findOne(id: string): Prisma.Prisma__ExamClient<{
        subjects: {
            id: string;
            name: string;
            examId: string;
        }[];
    } & {
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.ExamUpdateInput): Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
