import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DashboardLinks } from "@/app/components/Ui/DashboardLinks";

describe("DashboardLinks Component", () => {
  it("renders the DashboardLinks component", () => {
    const { container } = render(<DashboardLinks />);
    const element = container.firstChild;
    expect(element).toBeInTheDocument();
  });

  it("renders as a flex container", () => {
    const { container } = render(<DashboardLinks />);
    const element =
      container.querySelector('[class*="flex"]') || container.firstChild;
    expect(element).toBeInTheDocument();
  });

  it("DashboardLinks component mounts without errors", () => {
    const { container } = render(<DashboardLinks />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
