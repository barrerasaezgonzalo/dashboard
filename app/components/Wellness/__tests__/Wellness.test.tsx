import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Wellness } from "@/app/components/Wellness/Wellness";

describe("Wellness Component", () => {
  it("renders Wellness component", () => {
    render(<Wellness />);
    expect(document.body).toBeInTheDocument();
  });

  it("Wellness component mounts successfully", () => {
    const { container } = render(<Wellness />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
