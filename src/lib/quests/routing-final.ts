import { QuestStep } from '@/types/quest';

export const routingFinalQuest: QuestStep[] = [
  {
    title: "🌐 Mini-Projet Final — Navigation Complète",
    content: `
### Le Projet Final de Navigation

Tu vas créer une application React complète avec :
- Un système de navigation moderne
- Des layouts partagés
- Des routes protégées
- Une gestion des erreurs

L'application doit avoir :
1. Un layout principal avec header
2. Une navigation principale
3. Un dashboard protégé avec sous-navigation
4. Des routes dynamiques typées

> 💡 Conseil de React-Bot :  
> Organise bien ton code en dossiers :
> - \`/layouts\` pour les layouts
> - \`/pages\` pour les pages
> - \`/components\` pour les composants partagés
    `,
    initialCode: `// 1. Layout Principal
import { Outlet, NavLink, useNavigate, useParams } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-foreground"
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-foreground"
            }
          >
            À propos
          </NavLink>
          <NavLink
            to="/profile/guest"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-foreground"
            }
          >
            Profil
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-foreground"
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

// 2. Layout Dashboard
function DashboardLayout() {
  return (
    <div className="flex gap-8">
      <nav className="w-48 space-y-2">
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold block" : "text-foreground block"
          }
        >
          Utilisateurs
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold block" : "text-foreground block"
          }
        >
          Paramètres
        </NavLink>
      </nav>
      
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// 3. Route Protégée
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true; // À remplacer par une vraie auth
  
  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        Accès refusé
      </div>
    );
  }
  
  return <>{children}</>;
}

// 4. Pages
function Home() {
  return <h1 className="text-2xl font-bold">Accueil</h1>;
}

function About() {
  return <h1 className="text-2xl font-bold">À propos</h1>;
}

interface ProfileParams {
  name: string;
}

function Profile() {
  const { name } = useParams<ProfileParams>();
  return <h1 className="text-2xl font-bold">Profil de {name}</h1>;
}

function Users() {
  return <h1 className="text-2xl font-bold">Utilisateurs</h1>;
}

function Settings() {
  return <h1 className="text-2xl font-bold">Paramètres</h1>;
}

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-destructive">404</h1>
      <p className="text-muted-foreground">Page non trouvée</p>
    </div>
  );
}

// 5. Configuration des routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="profile/:name" element={<Profile />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`,
    validate: (code: string) =>
      code.includes("MainLayout") &&
      code.includes("DashboardLayout") &&
      code.includes("PrivateRoute") &&
      code.includes("useParams") &&
      code.includes("NavLink") &&
      code.includes(":name"),
    hint: "Vérifie que tu as :\n- Les deux layouts (Main et Dashboard)\n- La route protégée pour le dashboard\n- Les NavLink avec styles actifs\n- Le typage des paramètres d'URL\n- La gestion des 404",
    successMessage: "🎉 Félicitations ! Tu as créé une application React complète avec navigation.\nTu maîtrises maintenant les routes, les layouts et la navigation !"
  }
];