export type Note = {
  id: number;
  user_id: string;
  title: string;
  content: string;
  important: boolean;
};

export type NoteFormProps = {
  selectedNote: Note | null;
  title: string;
  content: string;
  important: boolean;
  isNewNote: boolean;
  invalidTitle: boolean;
  disabledSave: boolean;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  handleSave: () => void;
  handleImportant: () => void;
  handleOpenDelete: () => void;
};

export type NoteListProps = {
  notes: Note[];
  selectedNote: Note | null;
  isNewNote: boolean;
  handleSelectNote: (note: Note) => void;
};

export type MapNoteProps = {
  id: number;
  user_id: string;
  title: string;
  content: string | null;
  important: boolean;
};
