import { QuestStep } from '@/types/quest';
import { componentsQuest } from './foundations-components';
import { stateQuest } from './foundations-state';
import { dashboardQuest } from './foundations-dashboard';
import { effectsQuest } from './effects-lifecycle';
import { refsQuest } from './effects-refs';
import { taskTrackerQuest } from './effects-task-tracker';
import { patternsQuest } from './patterns-workshop';
import { hooksQuest } from './patterns-hooks';
import { routingQuest } from './routing-station';
import { layoutsQuest } from './routing-layouts';
import { routingFinalQuest } from './routing-final';
import { contextQuest } from './state-context';
import { reduxQuest } from './state-redux';
import { stateFinalQuest } from './state-final';
import { dataApiQuest } from './data-api';
import { dataQueryQuest } from './data-query';
import { dataFinalQuest } from './data-final';
import { formsAcademyQuest } from './forms-academy';
import { formsValidationQuest } from './forms-validation';
import { formsFinalQuest } from './forms-final';
import { optimizationLabQuest } from './optimization-lab';
import { testingLabQuest } from './testing-lab';
import { optimizationFinalQuest } from './optimization-final';
import { finalQuest } from './final-quest';

export const questContent: Record<string, QuestStep[]> = {
  'foundations-components': componentsQuest,
  'foundations-state': stateQuest,
  'foundations-dashboard': dashboardQuest,
  'effects-lifecycle': effectsQuest,
  'effects-refs': refsQuest,
  'effects-task-tracker': taskTrackerQuest,
  'patterns-workshop': patternsQuest,
  'patterns-hooks': hooksQuest,
  'routing-station': routingQuest,
  'routing-layouts': layoutsQuest,
  'routing-final': routingFinalQuest,
  'state-context': contextQuest,
  'state-redux': reduxQuest,
  'state-final': stateFinalQuest,
  'data-api': dataApiQuest,
  'data-query': dataQueryQuest,
  'data-final': dataFinalQuest,
  'forms-academy': formsAcademyQuest,
  'forms-validation': formsValidationQuest,
  'forms-final': formsFinalQuest,
  'optimization-lab': optimizationLabQuest,
  'testing-lab': testingLabQuest,
  'optimization-final': optimizationFinalQuest,
  'final-quest': finalQuest
};