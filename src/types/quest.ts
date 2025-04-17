export interface QuestStep {
  title: string;
  content: string;
  initialCode: string;
  validate: (code: string) => boolean;
  hint: string;
  successMessage: string;
}