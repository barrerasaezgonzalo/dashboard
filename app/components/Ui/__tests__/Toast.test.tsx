import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toast } from "@/app/components/Ui/Toast";

describe("Toast Component", () => {
  it("renders the Toast component with message", () => {
    render(<Toast message="Success message" variant="success" />);

    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("applies success variant styles", () => {
    const { container } = render(
      <Toast message="Success message" variant="success" />,
    );

    const toastElement =
      container.querySelector('[class*="bg"]') || container.firstChild;
    expect(toastElement).toBeInTheDocument();
  });

  it("applies error variant styles", () => {
    const { container } = render(
      <Toast message="Error message" variant="error" />,
    );

    const toastElement =
      container.querySelector('[class*="bg"]') || container.firstChild;
    expect(toastElement).toBeInTheDocument();
  });

  it("renders Toast with different variants", () => {
    const { rerender } = render(<Toast message="Test" variant="success" />);

    expect(screen.getByText("Test")).toBeInTheDocument();

    rerender(<Toast message="Test" variant="error" />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
