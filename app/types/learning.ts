export type CourseLevel = "basic" | "intermediate" | "advanced";
export type CourseStatus = "active" | "completed" | "abandoned";
export type SessionStatus = "active" | "passed";

export interface LearningSession {
  id: string;
  title: string;
  description: string;
  content: string;
  status: SessionStatus;
  position: number;
  summary: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  topic: string;
  level: CourseLevel;
  totalSessions: number;
  status: CourseStatus;
  sessions: LearningSession[];
  finalSummary?: string;
  relatedCourses?: RelatedCourse[];
}

export interface ModalCourseProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizCourseProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onPassed: () => Promise<void>;
  onCloseCourse: () => void;
}

export interface PreviousSession {
  position: number;
  title: string;
  summary: string;
}

export interface GenerateSessionParams {
  topic: string;
  level: CourseLevel;
  totalSessions: number;
  position: number;
  courseTitle?: string;
  previousSessions: PreviousSession[];
}

export interface GenerateSessionResponse {
  title?: string;
  session: {
    title: string;
    description: string;
    content: string;
    summary: string;
  };
}

export interface RelatedCourse {
  title: string;
  description: string;
}
