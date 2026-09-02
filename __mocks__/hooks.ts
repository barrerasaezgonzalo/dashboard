import { vi } from "vitest";

// Mock global para useAuth
vi.mock("@/app/hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    isAuthenticated: false,
    loginWithGoogle: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock global para useNote
vi.mock("@/app/hooks/useNote", () => ({
  useNote: () => ({
    notes: [],
    loading: false,
    selectedNote: null,
    setSelectedNote: vi.fn(),
    createNote: vi.fn(),
    deleteNote: vi.fn(),
    updateNote: vi.fn(),
    loadNotes: vi.fn(),
  }),
}));

// Mock global para useTask
vi.mock("@/app/hooks/useTask", () => ({
  useTask: () => ({
    tasks: [],
    loading: false,
    selectedTask: null,
    setSelectedTask: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    changeTaskStatus: vi.fn(),
    loadTasks: vi.fn(),
  }),
}));

// Mock global para useHabit
vi.mock("@/app/hooks/useHabit", () => ({
  useHabit: () => ({
    habits: [],
    loading: false,
    createHabit: vi.fn(),
    updateHabit: vi.fn(),
    deleteHabit: vi.fn(),
    updateHabitCompleted: vi.fn(),
    loadHabits: vi.fn(),
  }),
}));

// Mock global para useWellness
vi.mock("@/app/hooks/useWellness", () => ({
  useWellness: () => ({
    activePlan: null,
    selectedPlan: null,
    planHistory: [],
    loading: false,
    selectPlan: vi.fn(),
    clearSelectedPlan: vi.fn(),
    createCheckIn: vi.fn(),
    createPlan: vi.fn(),
    updatePlanTaskStatus: vi.fn(),
    updatePlanStatus: vi.fn(),
    loadPlanHistory: vi.fn(),
    deletePlan: vi.fn(),
    responseOperationMessage: "",
  }),
}));

// Mock global para useLearning
vi.mock("@/app/hooks/useLearning", () => ({
  useLearning: () => ({
    activeCourse: null,
    selectedSession: null,
    quiz: null,
    loading: false,
    setActiveCourse: vi.fn(),
    setSelectedSession: vi.fn(),
    setQuiz: vi.fn(),
    setLoading: vi.fn(),
    completedCourse: null,
    setCompletedCourse: vi.fn(),
  }),
}));

// Mock global para useCalendar
vi.mock("@/app/hooks/useCalendar", () => ({
  useCalendar: () => ({
    events: [],
    visibleEvents: [],
    loading: false,
    currentDate: new Date(2024, 0, 1),
    isModalOpen: false,
    selectedEvent: null,
    title: "",
    date: "",
    time: "",
    summary: "",
    responseOperationMessage: "",
    dateFormatter: new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dayFormatter: new Intl.DateTimeFormat("es-ES", { weekday: "short" }),
    monthFormatter: new Intl.DateTimeFormat("es-ES", {
      month: "long",
      year: "numeric",
    }),
    setSummary: vi.fn(),
    setTitle: vi.fn(),
    setDate: vi.fn(),
    setTime: vi.fn(),
    setIsModalOpen: vi.fn(),
    handleCurrentMonth: vi.fn(),
    handleNextMonth: vi.fn(),
    handlePreviousMonth: vi.fn(),
    handleNewEvent: vi.fn(),
    handleEditEvent: vi.fn(),
    handleSubmit: vi.fn(),
    deleteEvent: vi.fn(),
  }),
}));

// Mock global para useExpense
vi.mock("@/app/hooks/useExpense", () => ({
  useExpense: () => ({
    expenses: [],
    loading: false,
    loadExpenses: vi.fn(),
    updateAmount: vi.fn(),
  }),
}));

// Mock global para useFiles
vi.mock("@/app/hooks/useFiles", () => ({
  useFiles: () => ({
    files: [],
    loading: false,
    uploadFile: vi.fn(),
    deleteFile: vi.fn(),
    loadFiles: vi.fn(),
    selectedFile: null,
    setSelectedFile: vi.fn(),
    responseOperationMessage: "",
  }),
}));

// Mock global para usePrompt
vi.mock("@/app/hooks/usePrompt", () => ({
  usePrompt: () => ({
    prompt: "",
    setPrompt: vi.fn(),
    loading: false,
    handlePrompt: vi.fn(),
  }),
}));

// Mock global para useCheckIn
vi.mock("@/app/hooks/useCheckIn", () => ({
  useCheckIn: () => ({
    question: "",
    answer: "",
    messages: [],
    loadingQuestion: false,
    canContinue: false,
    canGeneratePlan: false,
    checkInCompleted: false,
    handleContinue: vi.fn(),
    handlePreparePlan: vi.fn(),
    resetCheckIn: vi.fn(),
  }),
}));
