import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "💥 Mini-Projet Final — Refactorisation Redux",
    content: `
### Le Projet Final de Gestion d'État

Pour ce projet final, tu vas transformer l'application de tâches pour utiliser Redux Toolkit :
- Extraire l'état dans un store centralisé
- Créer un slice typé pour les tâches
- Connecter les composants avec les hooks Redux
- Supprimer les useState pour la gestion des tâches

> 💡 Conseil de React-Bot :  
> Commence par créer le store et le slice, puis connecte progressivement les composants !
    `,
    initialCode: `// 1. store.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 2. tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  label: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({ id: Date.now(), label: action.payload });
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;

// 3. TaskApp.tsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { addTask, removeTask } from '../slices/tasksSlice';

export function TaskApp() {
  const [input, setInput] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Mes Tâches (Redux)</h2>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => {
            if (input.trim() !== '') {
              dispatch(addTask(input));
              setInput('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center">
            <span>{task.label}</span>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("configureStore") &&
             code.includes("createSlice") &&
             code.includes("useSelector") &&
             code.includes("useDispatch") &&
             code.includes("addTask") &&
             code.includes("removeTask");
    },
    hint: "Vérifie que tu as :\n- Créé le store avec configureStore\n- Défini le slice avec createSlice\n- Utilisé useSelector et useDispatch\n- Implémenté addTask et removeTask\n- Connecté le composant au store",
    successMessage: "🎉 Félicitations ! Tu as créé une architecture Redux complète et professionnelle.\nTon application est maintenant prête à évoluer !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;