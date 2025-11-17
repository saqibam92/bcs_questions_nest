// apps/web/src/app/admin/exams/edit/[id]/page.tsx


"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import  api  from "@/lib/api";
import ExamForm from "@/components/admin/ExamForm";
import { Exam, ExamUpdateDto } from "@/types";
import toast from "react-hot-toast";

export default function EditExamPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [exam, setExam] = useState<Exam | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchExam = async () => {
        try {
          const { data } = await api.get<Exam>(`/exams/${id as string}`);
          setExam(data);
        } catch (error) {
          toast.error("Failed to fetch exam data");
          console.error("Failed to fetch exam", error);
        }
      };
      fetchExam();
    }
  }, [id]);

  const handleSubmit = async (data: ExamUpdateDto) => {
    setIsSaving(true);
    try {
      await api.patch(`/exams/${id as string}`, data);
      toast.success("Exam updated successfully");
      router.push("/admin/exams");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update exam");
      setIsSaving(false);
    }
  };

  if (!exam)
    return <div className="p-8 text-gray-900">Loading exam data...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Exam</h1>
      <ExamForm
        initialData={exam}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />
    </div>
  );
}