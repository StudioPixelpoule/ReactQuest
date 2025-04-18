import { QuestStep } from '@/types/quest';

// Lazy load quest content
const questModules = {
  'foundations-components': () => import('./foundations-components'),
  'foundations-state': () => import('./foundations-state'), 
  'foundations-dashboard': () => import('./foundations-dashboard'),
  'effects-lifecycle': () => import('./effects-lifecycle'),
  'effects-refs': () => import('./effects-refs'),
  'effects-task-tracker': () => import('./effects-task-tracker'),
  'patterns-workshop': () => import('./patterns-workshop'),
  'patterns-hooks': () => import('./patterns-hooks'),
  'routing-station': () => import('./routing-station'),
  'routing-layouts': () => import('./routing-layouts'),
  'routing-final': () => import('./routing-final'),
  'state-context': () => import('./state-context'),
  'state-redux': () => import('./state-redux'),
  'state-final': () => import('./state-final'),
  'data-api': () => import('./data-api'),
  'data-query': () => import('./data-query'),
  'data-final': () => import('./data-final'),
  'forms-academy': () => import('./forms-academy'),
  'forms-validation': () => import('./forms-validation'),
  'forms-final': () => import('./forms-final'),
  'optimization-lab': () => import('./optimization-lab'),
  'testing-lab': () => import('./testing-lab'),
  'optimization-final': () => import('./optimization-final'),
  'final-quest': () => import('./final-quest')
};

// Cache for loaded quest content
const questCache: Record<string, QuestStep[]> = {};

// Load quest content dynamically
export async function loadQuestContent(questId: string): Promise<QuestStep[]> {
  if (questCache[questId]) {
    return questCache[questId];
  }

  const module = questModules[questId as keyof typeof questModules];
  if (!module) {
    throw new Error(`Quest content not found: ${questId}`);
  }

  const content = await module();
  questCache[questId] = content.default;
  return content.default;
}

// Synchronous access to cached content
export function getQuestContent(questId: string): QuestStep[] | undefined {
  return questCache[questId];
}