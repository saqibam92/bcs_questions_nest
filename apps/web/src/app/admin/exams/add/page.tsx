// apps/web/src/app/admin/exams/add/page.tsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ExamForm from "@/components/admin/ExamForm";
import toast from "react-hot-toast";
import { ExamCreateDto } from "@/types";

export default function AddExamPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: ExamCreateDto) => {
    setIsSaving(true);
    try {
      await api.post("/exams", data);
      toast.success("Exam created successfully");
      router.push("/admin/exams");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create exam");
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Exam</h1>
      <ExamForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}