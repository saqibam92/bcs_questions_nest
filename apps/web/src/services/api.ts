// src/services/api.ts
import api from '@/lib/api'; 
import type { Exam, Question, ApiResponse } from '@/types';

export const getExams = async (): Promise<ApiResponse<Exam[]>> => {
  const response = await api.get('/api/exams');
  return response.data;
};

export const getExamById = async (examId: string): Promise<ApiResponse<Exam>> => {
  const response = await api.get(`/api/exams/${examId}`);
  return response.data;
};

export const getQuestionsForSubject = async (
  subjectId: string,
): Promise<ApiResponse<Question[]>> => {
  const response = await api.get(`/api/exams/subjects/${subjectId}/questions`);
  return response.data;
};