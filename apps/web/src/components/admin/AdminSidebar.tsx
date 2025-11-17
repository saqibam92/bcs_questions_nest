// apps/web/src/components/admin/AdminSidebar.tsx

"use client";
import React from "react";
import Link from "next/link";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminSidebar() {
  const { logout, admin } = useAdminAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Exams", href: "/admin/exams" },
    { name: "Subjects", href: "/admin/subjects" },
    { name: "Questions", href: "/admin/questions" },
  ];

  // Conditionally add the Manage Admins link
  if (admin && admin.role === "SUPER_ADMIN") {
    navItems.push({ name: "Manage Admins", href: "/admin/manage-admins" });
  }

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold text-center">BCS Admin</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={logout}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-600 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}