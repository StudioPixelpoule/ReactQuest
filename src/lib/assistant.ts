import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import OpenAI from 'openai';

// Check if API key exists
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.');
}

const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key', // Prevent initialization error
  dangerouslyAllowBrowser: true
});

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: number;
}

interface AssistantState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (content: string, type: 'user' | 'assistant') => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setTyping: (typing: boolean) => void;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      addMessage: (content, type) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: Date.now().toString(),
              content,
              type,
              timestamp: Date.now(),
            },
          ],
        })),
      sendMessage: async (content: string) => {
        // Check for API key before making request
        if (!apiKey) {
          get().addMessage("Configuration error: OpenAI API key is missing. Please contact support.", 'assistant');
          return;
        }

        // Add user message
        get().addMessage(content, 'user');
        set({ isTyping: true });

        try {
          const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "Tu es ReactBot, un assistant pédagogique expert en React et TypeScript. Tu aides les développeurs à comprendre et maîtriser ces technologies de manière claire, imagée et bienveillante. Tu donnes des explications concises mais précises, avec des exemples concrets quand c'est pertinent."
              },
              ...get().messages.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
              })),
              { role: 'user', content }
            ],
            temperature: 0.7,
            max_tokens: 500
          });

          const assistantMessage = response.choices[0]?.message?.content;
          if (assistantMessage) {
            get().addMessage(assistantMessage, 'assistant');
          }
        } catch (error) {
          console.error('Error calling GPT-4:', error);
          get().addMessage("Désolé, je rencontre des difficultés techniques. Réessaie plus tard !", 'assistant');
        } finally {
          set({ isTyping: false });
        }
      },
      clearMessages: () => set({ messages: [] }),
      setTyping: (typing) => set({ isTyping: typing }),
    }),
    {
      name: 'assistant-storage',
    }
  )
);