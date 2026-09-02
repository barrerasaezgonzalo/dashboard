export type CheckInMessage = {
  question: string;
  answer: string;
};

export type WellnessPlanRequest = {
  messages: CheckInMessage[];
};

export type GeneratedWellnessTask = {
  title: string;
  description: string;
  day: number;
  status: "pending";
};

export type GeneratedWellnessPlan = {
  title: string;
  summary: string;
  tasks: GeneratedWellnessTask[];
};

export type GroqPlanResponse = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: {
    message?: string;
  };
};

export type PlanStatus = "active" | "completed" | "rejected";

export type PlanTaskStatus = "pending" | "completed" | "rejected";

export type CheckInAnswer = {
  question: string;
  answer: string;
};

export type CheckIn = {
  id: number;
  user_id: string;
  answers: CheckInAnswer[];
  created_at: string;
};

export type PlanTask = {
  id: number;
  plan_id: number;
  title: string;
  description: string;
  day: number;
  status: PlanTaskStatus;
  created_at: string;
};

export type Plan = {
  id: number;
  user_id: string;
  checkin_id: number;
  title: string;
  summary: string;
  status: PlanStatus;
  created_at: string;
  tasks: PlanTask[];
};

export type WellnessTaskItemProps = {
  task: PlanTask;
  onStatusChange: (taskId: number, status: PlanTaskStatus) => Promise<void>;
  readOnly?: boolean;
};

export type CheckInBlockProps = {
  question: string;
  answer: string;
  setAnswer: (value: string) => void;
  loadingQuestion: boolean;
  canContinue: boolean;
  canGeneratePlan: boolean;
  onContinue: () => Promise<void>;
  onGeneratePlan: () => Promise<void>;
  checkInCompleted: boolean;
};

export type EmptyPlanBlockProps = {
  title: string;
  description: string;
  onPlanClosed?: () => void;
};
