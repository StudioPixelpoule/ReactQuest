import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { quests } from './quests';

interface PlayerProgress {
  currentStep: number;
  isCompleted: boolean;
  lastUpdated: string;
}

interface PlayerState {
  username: string;
  xp: number;
  level: number;
  completedQuests: string[];
  questProgress: Record<string, PlayerProgress>;
  activeBadge: string | null;
  
  // Actions
  setUsername: (username: string) => void;
  addXP: (amount: number) => void;
  completeQuest: (questId: string) => void;
  setBadge: (badge: string) => void;
  updateQuestProgress: (questId: string, step: number) => void;
  resetProgress: () => void;
  
  // Computed
  getQuestProgress: (questId: string) => PlayerProgress;
  isQuestUnlocked: (questId: string) => boolean;
}

const initialProgress: PlayerProgress = {
  currentStep: 0,
  isCompleted: false,
  lastUpdated: new Date().toISOString()
};

const initialState = {
  username: '',
  xp: 0,
  level: 1,
  completedQuests: [],
  questProgress: {},
  activeBadge: null,
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // State
      ...initialState,

      // Actions
      setUsername: (username) => set({ username }),
      
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 1200) + 1;
        return { xp: newXP, level: newLevel };
      }),
      
      completeQuest: (questId) => set((state) => {
        const newCompletedQuests = [...state.completedQuests];
        if (!newCompletedQuests.includes(questId)) {
          newCompletedQuests.push(questId);
        }
        
        const newQuestProgress = {
          ...state.questProgress,
          [questId]: {
            ...state.questProgress[questId] || initialProgress,
            isCompleted: true,
            lastUpdated: new Date().toISOString()
          }
        };
        
        return {
          completedQuests: newCompletedQuests,
          questProgress: newQuestProgress
        };
      }),
      
      setBadge: (badge) => set({ activeBadge: badge }),
      
      updateQuestProgress: (questId, step) => set((state) => ({
        questProgress: {
          ...state.questProgress,
          [questId]: {
            currentStep: step,
            isCompleted: false,
            lastUpdated: new Date().toISOString()
          }
        }
      })),
      
      resetProgress: () => set(initialState),

      // Computed
      getQuestProgress: (questId) => {
        const state = get();
        return state.questProgress[questId] || initialProgress;
      },
      
      isQuestUnlocked: (questId) => {
        const state = get();
        const quest = quests.find(q => q.id === questId);
        
        if (!quest) return false;
        if (!quest.prerequisites || quest.prerequisites.length === 0) return true;
        
        return quest.prerequisites.every(prereqId => 
          state.completedQuests.includes(prereqId)
        );
      }
    }),
    {
      name: 'player-storage',
      version: 1,
      migrate: (persistedState: any) => persistedState
    }
  )
);