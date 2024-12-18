"use client";

import DashboardNav from "@/components/DashboardNav";
import ProtectedRoute from "@/components/protectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardNav />
      {children}
    </ProtectedRoute>
  );
}
