import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Files } from "@/app/components/Files/Files";

describe("Files Component", () => {
  it("renders Files component", () => {
    render(<Files />);
    expect(document.body).toBeInTheDocument();
  });

  it("Files component mounts successfully", () => {
    const { container } = render(<Files />);
    expect(container).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });
});
