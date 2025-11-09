// src/types/index.ts

// Based on your new Prisma Schema
export interface Question {
  id: string;
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
  
  // These will be added in the service/component for convenience
  options?: string[];
  correctAnswerIndex?: number;
}

export interface Subject {
  id: string;
  name: string;
  examId: string;
  questions: Question[]; // This might be included or fetched separately
}

export interface Exam {
  id: string;
  exam_name: string;
  createdAt: string;
  subjects: Subject[];
  highestMark: number;
  totalExaminees?: number;
  date: string
}

// For API responses
export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
}


export interface SubjectResult {
  subjectName: string;
  correct: number;
  wrong: number;
  marks: number;
}

export interface ExamResult {
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  subjectBreakdown: SubjectResult[];
  rank?: number;
}