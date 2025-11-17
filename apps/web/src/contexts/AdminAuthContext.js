// apps/web/src/contexts/AdminAuthContext.js

"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/services/api"; // Your existing API service

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token on initial load
    const token = Cookies.get("admin_token");
    if (token) {
      // In a real app, you'd verify this token against a /me endpoint
      // For now, let's just re-set the API header
      api.defaults.headers.Authorization = `Bearer ${token}`;
      // You could store admin info in localStorage to repopulate `admin` state
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Hit the new NestJS endpoint
      const { data } = await api.post("/auth/admin/login", { email, password });

      const { access_token, admin } = data;

      Cookies.set("admin_token", access_token, { expires: 1 });
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
      setAdmin(admin);
      return admin;
    } catch (error) {
      console.error("Admin login failed", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    Cookies.remove("admin_token");
    delete api.defaults.headers.Authorization;
    setAdmin(null);
    window.location.href = "/admin-login";
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, setAdmin, login, logout, loading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);