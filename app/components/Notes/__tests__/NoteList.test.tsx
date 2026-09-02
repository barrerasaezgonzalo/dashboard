import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { NoteList } from "@/app/components/Notes/NoteList";

describe("NoteList Component", () => {
  it("renders NoteList component", () => {
    render(
      <NoteList
        notes={[]}
        currentNote={null}
        isNewNote={false}
        handleSelectNote={vi.fn()}
      />,
    );

    expect(screen.getByText("Más notas")).toBeInTheDocument();
  });

  it("renders notes", () => {
    const mockNotes = [
      {
        id: 1,
        title: "Note 1",
        content: "Content 1",
        important: false,
        user_id: "user1",
      },
    ];

    render(
      <NoteList
        notes={mockNotes}
        currentNote={null}
        isNewNote={false}
        handleSelectNote={vi.fn()}
      />,
    );

    expect(screen.getByText("Note 1")).toBeInTheDocument();
  });

  it("marks current note as selected", () => {
    const note = {
      id: 1,
      title: "Note 1",
      content: "Content 1",
      important: false,
      user_id: "user1",
    };

    render(
      <NoteList
        notes={[note]}
        currentNote={note}
        isNewNote={false}
        handleSelectNote={vi.fn()}
      />,
    );

    expect(screen.getByText("Note 1")).toBeInTheDocument();
  });
});
