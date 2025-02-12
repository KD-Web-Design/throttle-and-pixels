import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { ArticleProvider } from "@/context/articleContext";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const fredoka = Fredoka({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Throttle & Pixels",
  description: "Sim Racing blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} bg-slate-50 antialiased h-full px-2`}
        suppressHydrationWarning
      >
        <ArticleProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="max-w-7xl mx-auto w-full h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
          </SidebarProvider>
        </ArticleProvider>
        <Toaster />
      </body>
    </html>
  );
}
