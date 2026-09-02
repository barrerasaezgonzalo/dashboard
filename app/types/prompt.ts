export type PromptEditorProps = {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  onSubmit: () => Promise<void>;
};
