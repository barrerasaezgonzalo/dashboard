import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardSection } from "@/app/components/Ui/DashboardSection";

describe("DashboardSection Component", () => {
  it("renders the DashboardSection component", () => {
    const { container } = render(
      <DashboardSection header="Test Section" id={""}>
        <div>Test Content</div>
      </DashboardSection>,
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <DashboardSection header="Test Section" id={""}>
        <div>Test Content</div>
      </DashboardSection>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <DashboardSection header="Test Section" id={""}>
        <div>Test Content</div>
      </DashboardSection>,
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <DashboardSection header="Test Section" id={""}>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
      </DashboardSection>,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.getByText("Content 3")).toBeInTheDocument();
  });
});
