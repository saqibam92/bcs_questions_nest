import { PrismaService } from '../prisma/prisma.service';
export declare class ExamService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllExams(): Promise<{
        id: string;
        exam_name: string;
        createdAt: Date;
    }[]>;
    getExamById(id: string): Promise<{
        subjects: ({
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
        } & {
            id: string;
            name: string;
            examId: string;
        })[];
    } & {
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }>;
    getExamWithSubjects(id: string): Promise<{
        subjects: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        exam_name: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date | null;
        totalExaminees: number | null;
        highestMark: number | null;
    }>;
    getQuestionsForSubject(subjectId: string): Promise<{
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
}
