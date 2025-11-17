// apps/web/src/app/admin/exams/page.tsx


"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import  api  from "@/lib/api";
import { Exam } from "@/types";
import toast from "react-hot-toast";

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      const { data } = await api.get<Exam[]>("/exams");
      setExams(data);
    } catch (error) {
      toast.error("Failed to fetch exams");
      console.error("Failed to fetch exams", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Are you sure? This will delete all subjects and questions for this exam."
      )
    ) {
      try {
        await api.delete(`/exams/${id}`);
        toast.success("Exam deleted");
        fetchExams(); // Re-fetch the list
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete");
      }
    }
  };

  if (loading) return <div className="p-8 text-gray-900">Loading exams...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Exams</h1>
        <Link
          href="/admin/exams/add"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Add New Exam
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subjects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {exam.exam_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {exam.subjects?.length || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {exam.date ? new Date(exam.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/exams/edit/${exam.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}