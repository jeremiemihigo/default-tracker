"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toogle";
import { ThemeProvider } from "@/components/theme-provider";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

function HeaderComponent({ children, title }: Props) {
  const [messageError, setMessageError] = React.useState<string>("");
  const loading = async () => {
    try {
      setMessageError("");
      const response = await fetch("/api/categorisation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === 201) {
        setMessageError(result.data);
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
                {messageError && (
                  <div style={{ marginLeft: "15px" }}>
                    <Alert variant="destructive">
                      <AlertCircleIcon />
                      <AlertTitle>{messageError}</AlertTitle>
                    </Alert>
                  </div>
                )}
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
