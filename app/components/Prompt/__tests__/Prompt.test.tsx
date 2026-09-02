import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Prompt } from "@/app/components/Prompt/Prompt";

describe("Prompt Component", () => {
  it("renders Prompt component", () => {
    render(<Prompt />);
    expect(document.body).toBeInTheDocument();
  });

  it("Prompt component mounts successfully", () => {
    const { container } = render(<Prompt />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
