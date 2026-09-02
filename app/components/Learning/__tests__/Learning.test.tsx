import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Learning } from "@/app/components/Learning/Learning";

describe("Learning Component", () => {
  it("renders Learning component", () => {
    render(<Learning />);
    expect(document.body).toBeInTheDocument();
  });

  it("Learning component mounts successfully", () => {
    const { container } = render(<Learning />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
