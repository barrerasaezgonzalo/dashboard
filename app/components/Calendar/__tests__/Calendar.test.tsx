import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Calendar } from "@/app/components/Calendar/Calendar";

describe("Calendar Component", () => {
  it("renders Calendar component", () => {
    render(<Calendar />);
    expect(document.body).toBeInTheDocument();
  });

  it("Calendar component mounts without errors", () => {
    const { container } = render(<Calendar />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
