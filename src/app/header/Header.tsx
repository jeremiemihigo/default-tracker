"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toogle";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

function HeaderComponent({ children, title }: Props) {
  const router = useRouter();
  const loading = async () => {
    try {
      const response = await fetch("/api/categorisation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.data !== "Done") {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loading();
    };
    initialize();
  }, []);
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main style={{ width: "100%" }}>
            <div className="w-full">
              <nav className="flex nav-app w-screen">
                <div className="first_div">
                  <SidebarTrigger />
                  <ModeToggle />
                  <p>{title}</p>
                </div>
              </nav>

              <div style={{ padding: "10px" }}>{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}

export default HeaderComponent;
