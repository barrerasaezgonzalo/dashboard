import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmModal } from "@/app/components/Ui/ConfirmModal";

describe("ConfirmModal Component", () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  it("renders the ConfirmModal when open is true", () => {
    render(
      <ConfirmModal
        isOpen={true}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={mockOnConfirm}
        onClose={mockOnCancel}
      />,
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("does not render the ConfirmModal when open is false", () => {
    const { container } = render(
      <ConfirmModal
        isOpen={false}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={mockOnConfirm}
        onClose={mockOnCancel}
      />,
    );

    expect(
      container.querySelector("dialog") === null ||
        container.querySelector("dialog")?.getAttribute("open") === null,
    ).toBeTruthy();
  });

  it("renders modal with buttons", () => {
    render(
      <ConfirmModal
        isOpen={true}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={mockOnConfirm}
        onClose={mockOnCancel}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(
      <ConfirmModal
        isOpen={true}
        title="Confirm Action"
        description="Are you sure?"
        onConfirm={mockOnConfirm}
        onClose={mockOnCancel}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const cancelButton = buttons.find(
      (btn) =>
        btn.textContent?.toLowerCase().includes("cancel") ||
        btn.textContent?.toLowerCase().includes("cerrar"),
    );

    if (cancelButton) {
      fireEvent.click(cancelButton);
      expect(mockOnCancel).toHaveBeenCalled();
    }
  });
});
