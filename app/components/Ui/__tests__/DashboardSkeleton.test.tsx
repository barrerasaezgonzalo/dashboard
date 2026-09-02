import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DashboardSkeleton } from "@/app/components/Ui/DashboardSkeleton";

describe("DashboardSkeleton Component", () => {
  it("renders the DashboardSkeleton component", () => {
    const { container } = render(<DashboardSkeleton />);
    const skeletonContainer = container.querySelector(
      '[class*="animate-pulse"]',
    );
    expect(skeletonContainer).toBeInTheDocument();
  });

  it("displays multiple skeleton items for loading state", () => {
    const { container } = render(<DashboardSkeleton />);
    const animatedElements = container.querySelectorAll('[class*="animate"]');
    expect(animatedElements.length).toBeGreaterThan(0);
  });
});
