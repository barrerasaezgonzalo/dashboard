import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TaskProvider } from "./providers/TaskProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { NoteProvider } from "./providers/NoteProvider";
import { ExpenseProvider } from "./providers/ExpenseProvider";
import { HabitProvider } from "./providers/HabitProvider";
import { CalendarProvider } from "./providers/CalendarProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ExpenseProvider>
            <NoteProvider>
              <HabitProvider>
                <CalendarProvider>
                  <TaskProvider>{children}</TaskProvider>
                </CalendarProvider>
              </HabitProvider>
            </NoteProvider>
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
