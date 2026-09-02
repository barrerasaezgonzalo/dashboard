import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Debts } from "@/app/components/Debts/Debts";

describe("Debts Component", () => {
  it("renders Debts component", () => {
    render(<Debts />);
    expect(document.body).toBeInTheDocument();
  });

  it("Debts component mounts successfully", () => {
    const { container } = render(<Debts />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
