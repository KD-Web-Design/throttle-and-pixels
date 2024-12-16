"use client";

import ProtectedRoute from "@/components/protectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section className="max-w-5xl px-4 m-auto h-full bg-slate-50 antialiased">
        {children}
      </section>
    </ProtectedRoute>
  );
}
