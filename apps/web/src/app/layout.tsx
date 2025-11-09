// src/app/layout.tsx
"use client"; // This must be a client component to manage state

import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeRegistry from "../components/ThemeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { ResultProvider } from "@/contexts/ResultContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppBar, Box } from "@mui/material";
import "./globals.css";

// We remove 'export const metadata' as this is now a "use client" component.
// You would move metadata to specific pages or a template.tsx file.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Define paths where the main layout (Header/Sidebar) should be hidden
  const authPaths = ["/login", "/register"];
  const showMainLayout = !authPaths.includes(pathname);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ResultProvider>
            <ThemeRegistry>
              {showMainLayout && (
                <>
                  <AppBar position="static" color="transparent" elevation={1}>
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                  </AppBar>
                  <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                  />
                </>
              )}
              <Box component="main">{children}</Box>
            </ThemeRegistry>
          </ResultProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
