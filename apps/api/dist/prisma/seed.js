"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Start seeding ...`);
    const dataPath = path.join(__dirname, 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const examData = JSON.parse(rawData);
    await prisma.question.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.exam.deleteMany();
    console.log('Cleared existing data.');
    for (const exam of examData) {
        const createdExam = await prisma.exam.create({
            data: {
                exam_name: exam.exam_name,
                date: exam.date ? new Date(exam.date) : null,
                totalExaminees: exam.totalExaminees,
                highestMark: exam.highestMark,
                subjects: {
                    create: exam.subjectWiseSort.map((subject) => ({
                        name: subject.subject,
                        questions: {
                            create: subject.questions.map((q) => ({
                                ques_no: q.ques_no,
                                ques: q.ques,
                                option_1: q.option_1,
                                option_2: q.option_2,
                                option_3: q.option_3,
                                option_4: q.option_4,
                                correctAnswer: q.correctAnswer,
                                explanation: q.explanation,
                                add_favourite: q.add_favourite || false,
                            })),
                        },
                    })),
                },
            },
        });
        console.log(`Created exam: ${createdExam.exam_name} (ID: ${createdExam.id})`);
    }
    console.log(`Seeding finished.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map