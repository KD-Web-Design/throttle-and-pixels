"use client";

import BreadCrumbDemo from "@/components/BreadCrumbDemo";
import ProtectedRoute from "@/components/protectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <BreadCrumbDemo />
      {children}
    </ProtectedRoute>
  );
}
