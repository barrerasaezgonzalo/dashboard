import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/app/components/Ui/Logo";

describe("Logo Component", () => {
  it("renders the Logo component", () => {
    const { container } = render(<Logo />);
    const logoElement =
      container.querySelector("img") || container.querySelector("a");
    expect(logoElement).toBeInTheDocument();
  });

  it("displays the logo image", () => {
    render(<Logo />);
    const logoImg = screen.getByRole("img");
    expect(logoImg).toBeInTheDocument();
  });
});
