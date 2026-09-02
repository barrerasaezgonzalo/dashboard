import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TaskProvider } from "./providers/TaskProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { NoteProvider } from "./providers/NoteProvider";
import { ExpenseProvider } from "./providers/ExpenseProvider";
import { HabitProvider } from "./providers/HabitProvider";
import { WellnessProvider } from "./providers/WellnessProvider";
import { ErrorProvider } from "./providers/ErrorProvider";
import "./globals.css";
import { CalendarProvider } from "./providers/CalendarProvider";
import { LearningProvider } from "./providers/LearningProvider";

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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ErrorProvider>
          <AuthProvider>
            <ExpenseProvider>
              <NoteProvider>
                <HabitProvider>
                  <WellnessProvider>
                    <CalendarProvider>
                      <TaskProvider>
                        <LearningProvider>{children}</LearningProvider>
                      </TaskProvider>
                    </CalendarProvider>
                  </WellnessProvider>
                </HabitProvider>
              </NoteProvider>
            </ExpenseProvider>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
