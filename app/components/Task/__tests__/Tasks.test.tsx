import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tasks } from "@/app/components/Task/Tasks";

vi.mock("@/app/hooks/useTask", () => ({
  useTask: () => ({
    tasks: [],
    loading: false,
    taskGroupConfig: [
      {
        status: "todo",
        title: "Pendientes",
        tasks: [],
      },
      {
        status: "in_progress",
        title: "En progreso",
        tasks: [],
      },
      {
        status: "done",
        title: "Completadas",
        tasks: [],
      },
    ],
    handleNextStatus: vi.fn(),
    handleEditTask: vi.fn(),
    handleDeleteTask: vi.fn(),
  }),
}));

describe("Tasks Component", () => {
  it("muestra el componente Tasks", () => {
    render(<Tasks />);

    expect(screen.getByText("Tareas")).toBeInTheDocument();
  });
});
