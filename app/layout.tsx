import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { ArticleProvider } from "@/context/articleContext";
import Footer from "@/components/Footer";

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
        className={`${fredoka.className} bg-slate-50 antialiased h-full px-4`}
        suppressHydrationWarning
      >
        <ArticleProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="max-w-6xl mx-auto w-full">
              <Navbar />
              {children}
              <Footer />
            </main>
          </SidebarProvider>
        </ArticleProvider>
      </body>
    </html>
  );
}
