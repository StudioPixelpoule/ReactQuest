import { QuestStep } from '@/types/quest';

export const reduxQuest: QuestStep[] = [
  {
    title: "⚙️ Introduction — Étape 1",
    content: `
### Bienvenue à la Centrale Redux Toolkit !

Ici, tu vas apprendre à gérer l'état global de ton app avec Redux Toolkit :
- Configurer le store
- Créer des slices typés
- Utiliser les hooks Redux
- Gérer des actions complexes

> 💡 Conseil de React-Bot :  
> Redux Toolkit simplifie Redux avec des outils modernes comme \`createSlice\` et \`configureStore\`.
    `,
    initialCode: `// store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    addBy(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  }
});

export const { increment, addBy } = counterSlice.actions;
export default counterSlice.reducer;`,
    validate: (code: string) =>
      code.includes("configureStore") &&
      code.includes("createSlice") &&
      code.includes("counterSlice") &&
      code.includes("PayloadAction"),
    hint: "Vérifie que tu as :\n- Configuré le store avec configureStore\n- Créé un slice avec createSlice\n- Typé l'état et les actions\n- Exporté les actions et le reducer",
    successMessage: "Bravo ! Tu as configuré ton premier store Redux Toolkit.\nC'est la base pour gérer l'état global !"
  },
  {
    title: "🔸 Étape 2 — Utiliser les hooks Redux",
    content: `
### Les hooks Redux

Redux fournit des hooks pour interagir avec le store :
- \`useSelector\` pour lire l'état
- \`useDispatch\` pour dispatcher des actions
- Des types pour la sécurité

> 💡 Conseil de React-Bot :  
> Type bien tes selectors pour avoir l'autocomplétion !
    `,
    initialCode: `import { useSelector, useDispatch } from "react-redux";
import { increment, addBy } from "./counterSlice";
import type { RootState, AppDispatch } from "./store";

function Counter() {
  // Utilise useSelector pour lire le compteur
  // Utilise useDispatch pour dispatcher les actions
  
  return (
    <div className="p-4 space-y-4">
      <p className="text-xl">
        Compteur : {/* valeur */}
      </p>
      <div className="space-x-2">
        <button
          onClick={/* increment */}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          +1
        </button>
        <button
          onClick={/* addBy(5) */}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          +5
        </button>
      </div>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useSelector") &&
      code.includes("useDispatch") &&
      code.includes("state.counter.value") &&
      code.includes("dispatch(increment())"),
    hint: "N'oublie pas :\n- D'utiliser useSelector avec RootState\n- D'utiliser useDispatch avec AppDispatch\n- De dispatcher les actions au clic\n- D'afficher la valeur du compteur",
    successMessage: "Super ! Tu sais maintenant utiliser les hooks Redux.\nTon composant est connecté au store !"
  },
  {
    title: "🔹 Étape 3 — Slices avec Thunks",
    content: `
### Actions asynchrones avec createAsyncThunk

Redux peut gérer des actions asynchrones avec les thunks :
- Appels API
- Opérations longues
- Gestion des erreurs

> 💡 Conseil de React-Bot :  
> \`createAsyncThunk\` gère automatiquement les états pending/fulfilled/rejected !
    `,
    initialCode: `import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Crée un thunk pour charger les utilisateurs
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null
  } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    // Gère les différents états du thunk
    builder
      .addCase(/* ... */)
      .addCase(/* ... */)
      .addCase(/* ... */);
  }
});

export default usersSlice.reducer;`,
    validate: (code: string) =>
      code.includes("createAsyncThunk") &&
      code.includes("fetchUsers") &&
      code.includes("addCase") &&
      code.includes("loading"),
    hint: "Vérifie que tu as :\n- Créé le thunk avec createAsyncThunk\n- Géré pending avec status: 'loading'\n- Géré fulfilled en sauvegardant les users\n- Géré rejected en stockant l'erreur",
    successMessage: "Excellent ! Tu sais maintenant gérer des actions asynchrones avec Redux."
  },
  {
    title: "🎓 Mini-Projet Final — TaskManager Redux",
    content: `
### Le Gestionnaire de Tâches Redux

Pour ce projet final, tu vas créer une app de gestion de tâches avec :
- Un store Redux complet
- Des actions synchrones et asynchrones
- Une persistance des données
- Un typage strict

Le store doit gérer :
1. La liste des tâches
2. Les filtres et la recherche
3. Le chargement et les erreurs

> 💡 Conseil de React-Bot :  
> Utilise \`redux-persist\` pour sauvegarder l'état automatiquement !
    `,
    initialCode: `// tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TasksState {
  items: Task[];
  filter: "all" | "active" | "completed";
  search: string;
}

const initialState: TasksState = {
  items: [],
  filter: "all",
  search: ""
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Implémente les actions ici
  }
});

// TaskManager.tsx
function TaskManager() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const search = useSelector((state: RootState) => state.tasks.search);
  const dispatch = useDispatch<AppDispatch>();

  // Filtre et affiche les tâches
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  }).filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          className="flex-1 p-2 border rounded"
        />
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Ajouter
        </button>
      </div>

      <div className="flex gap-2">
        <button
          className={\`px-3 py-1 rounded \${filter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary"}\`}
          onClick={() => dispatch(setFilter("all"))}
        >
          Toutes
        </button>
        <button
          className={\`px-3 py-1 rounded \${filter === "active" ? "bg-primary text-primary-foreground" : "bg-secondary"}\`}
          onClick={() => dispatch(setFilter("active"))}
        >
          Actives
        </button>
        <button
          className={\`px-3 py-1 rounded \${filter === "completed" ? "bg-primary text-primary-foreground" : "bg-secondary"}\`}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Terminées
        </button>
      </div>

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full p-2 border rounded"
      />

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => dispatch(toggleTask(task.id))}
                className="text-primary"
              >
                {task.completed ? "↩️" : "✓"}
              </button>
              <button
                onClick={() => dispatch(removeTask(task.id))}
                className="text-destructive"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("createSlice") &&
      code.includes("PayloadAction") &&
      code.includes("useSelector") &&
      code.includes("useDispatch") &&
      code.includes("filter"),
    hint: "N'oublie pas :\n- D'implémenter addTask, removeTask, toggleTask\n- D'implémenter setFilter et setSearch\n- De typer toutes les actions\n- De filtrer et chercher les tâches correctement",
    successMessage: "🎉 Félicitations ! Tu as créé une application Redux complète et typée.\nTu maîtrises maintenant la gestion d'état avancée !"
  }
];