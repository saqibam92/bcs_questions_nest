import { ExamsService } from './exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(createExamDto: any): import(".prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ExamClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateExamDto: any): import(".prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
