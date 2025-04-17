import { QuestStep } from '@/types/quest';

export const finalQuest: QuestStep[] = [
  {
    title: "🏛️ TechTopia Hub — Construction Finale",
    content: `
### Bienvenue à la Quête Finale !

Tu es arrivé à la dernière étape de ton aventure : bâtir une application complète et fonctionnelle qui rassemble tout ce que tu as appris jusqu'ici. Il ne s'agit plus d'apprendre — mais de révéler ce que tu sais déjà faire.

#### Objectifs
- Structurer une application React complète
- Gérer l'état avec Redux Toolkit et React Query
- Utiliser les formulaires typés avec validation
- Intégrer une API (mock ou réelle)
- Appliquer les bonnes pratiques
- Déployer une version fonctionnelle

> 💡 Conseil de React-Bot :  
> Prends le temps de planifier ton architecture avant de commencer !
    `,
    initialCode: `// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';

// Pages
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PrivateRoute } from './components/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                <Route path="/" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="/projects" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Projects />
                  </Suspense>
                } />
                <Route path="/projects/:id" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <ProjectDetails />
                  </Suspense>
                } />
                <Route path="/profile" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Profile />
                  </Suspense>
                } />
                <Route path="/settings" element={
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Settings />
                  </Suspense>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

// store/slices/projectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  createdAt: string;
}

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;

// api/projects.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id: string) => {
  const response = await api.get(\`/projects/\${id}\`);
  return response.data;
};

export const createProject = async (data: Omit<Project, 'id'>) => {
  const response = await api.post('/projects', data);
  return response.data;
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const response = await api.patch(\`/projects/\${id}\`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  await api.delete(\`/projects/\${id}\`);
};

// hooks/useProjects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import * as api from '../api/projects';
import { setProjects, addProject, updateProject, deleteProject } from '../store/slices/projectsSlice';

export function useProjects() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: api.getProjects,
    onSuccess: (data) => {
      dispatch(setProjects(data));
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: api.createProject,
    onSuccess: (data) => {
      dispatch(addProject(data));
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      api.updateProject(id, data),
    onSuccess: (data) => {
      dispatch(updateProject(data));
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: (_, id) => {
      dispatch(deleteProject(id));
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projectsQuery.data,
    isLoading: projectsQuery.isLoading,
    error: projectsQuery.error,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
  };
}

// components/ProjectForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const projectSchema = z.object({
  title: z.string()
    .min(3, "Le titre doit faire au moins 3 caractères")
    .max(100, "Le titre est trop long"),
  description: z.string()
    .min(10, "La description doit faire au moins 10 caractères")
    .max(500, "La description est trop longue"),
  status: z.enum(['draft', 'published']),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  initialData?: Partial<ProjectFormData>;
}

export function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          {...register("title")}
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select
          onValueChange={(value) => setValue("status", value as "draft" | "published")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="published">Publié</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-destructive">{errors.status.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}`,
    validate: (code: string) =>
      code.includes("createSlice") &&
      code.includes("useQuery") &&
      code.includes("react-hook-form") &&
      code.includes("zod") &&
      code.includes("Route") &&
      code.includes("Suspense") &&
      code.includes("test"),
    hint: "Vérifie que tu as :\n- Configuré Redux Toolkit\n- Mis en place React Query\n- Créé les formulaires avec validation\n- Géré les routes protégées\n- Implémenté le lazy loading",
    successMessage: "🎉 Félicitations ! Tu as créé une application React complète et professionnelle.\nTu es maintenant un expert React !"
  }
];