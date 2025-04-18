import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("configureStore") &&
             code.includes("createSlice") &&
             code.includes("counterSlice") &&
             code.includes("PayloadAction");
    },
    hint: "Vérifie que tu as :\n- Configuré le store avec configureStore\n- Créé un slice avec createSlice\n- Typé l'état et les actions\n- Exporté les actions et le reducer",
    successMessage: "Bravo ! Tu as configuré ton premier store Redux Toolkit.\nC'est la base pour gérer l'état global !",
    solution: `// store.ts
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
export default counterSlice.reducer;`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useSelector") &&
             code.includes("useDispatch") &&
             code.includes("state.counter.value") &&
             code.includes("dispatch(increment())");
    },
    hint: "N'oublie pas :\n- D'utiliser useSelector avec RootState\n- D'utiliser useDispatch avec AppDispatch\n- De dispatcher les actions au clic\n- D'afficher la valeur du compteur",
    successMessage: "Super ! Tu sais maintenant utiliser les hooks Redux.\nTon composant est connecté au store !",
    solution: `import { useSelector, useDispatch } from "react-redux";
import { increment, addBy } from "./counterSlice";
import type { RootState, AppDispatch } from "./store";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <div className="p-4 space-y-4">
      <p className="text-xl">
        Compteur : {count}
      </p>
      <div className="space-x-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(addBy(5))}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          +5
        </button>
      </div>
    </div>
  );
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("createAsyncThunk") &&
             code.includes("fetchUsers") &&
             code.includes("addCase") &&
             code.includes("loading");
    },
    hint: "Vérifie que tu as :\n- Créé le thunk avec createAsyncThunk\n- Géré pending avec status: 'loading'\n- Géré fulfilled en sauvegardant les users\n- Géré rejected en stockant l'erreur",
    successMessage: "Excellent ! Tu sais maintenant gérer des actions asynchrones avec Redux.",
    solution: `import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

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
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Une erreur est survenue";
      });
  }
});

export default usersSlice.reducer;`
  }
];

export default steps;