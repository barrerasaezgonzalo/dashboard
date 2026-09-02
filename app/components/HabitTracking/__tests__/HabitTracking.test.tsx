import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HabitTracking } from "@/app/components/HabitTracking/HabitTracking";

describe("HabitTracking Component", () => {
  it("renders HabitTracking component", () => {
    render(<HabitTracking />);
    expect(document.body).toBeInTheDocument();
  });

  it("component mounts successfully", () => {
    const { container } = render(<HabitTracking />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
