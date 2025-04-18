import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🏙️ Introduction — Étape 1",
    content: `
### Bienvenue à la Station des Layouts !

Ici, tu vas apprendre à créer des **structures de page réutilisables** :
- Un layout principal avec header et contenu
- Des layouts imbriqués pour des sections spécifiques
- Une navigation organisée et typée

Tu commenceras par créer un layout principal qui utilise \`Outlet\` pour injecter le contenu des pages.

> 💡 Conseil de React-Bot :  
> \`Outlet\` est comme un espace réservé où React Router injecte le contenu des routes enfants.
    `,
    initialCode: `import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">ReactQuest</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Utilise Outlet ici */}
      </main>
    </div>
  );
}

// Dans les routes :
// <Route element={<MainLayout />}>
//   <Route path="/" element={<Home />} />
//   <Route path="/about" element={<About />} />
// </Route>`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("Outlet") &&
             code.includes("MainLayout") &&
             code.includes("Route") &&
             code.includes("element");
    },
    hint: "Vérifie que tu as :\n- Importé Outlet de react-router-dom\n- Placé <Outlet /> dans la balise main\n- Configuré les routes correctement",
    successMessage: "Bravo ! Tu as créé ton premier layout réutilisable.\nToutes tes pages auront maintenant une structure commune !",
    solution: `import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">ReactQuest</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}`
  },
  {
    title: "🔸 Étape 2 — Navigation imbriquée",
    content: `
### Navigation imbriquée

Les layouts peuvent aussi avoir leur propre navigation !
C'est parfait pour des sections comme un dashboard avec des onglets.

Tu vas créer un layout \`DashboardLayout\` avec :
- Une navigation à gauche
- Le contenu à droite
- Des routes imbriquées

> 💡 Conseil de React-Bot :  
> Les routes imbriquées s'ajoutent comme des enfants :
> \`\`\`tsx
> <Route path="dashboard" element={<DashboardLayout />}>
>   <Route path="profile" element={<Profile />} />
>   <Route path="settings" element={<Settings />} />
> </Route>
> \`\`\`
    `,
    initialCode: `import { Outlet, NavLink } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="flex gap-8">
      <nav className="w-48 space-y-2">
        {/* Ajoute les NavLink ici */}
      </nav>
      
      <div className="flex-1">
        {/* Utilise Outlet ici */}
      </div>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("DashboardLayout") &&
             code.includes("NavLink") &&
             code.includes("profile") &&
             code.includes("Outlet");
    },
    hint: "N'oublie pas :\n- D'ajouter les NavLink vers profile et settings\n- D'utiliser isActive pour le style actif\n- De placer <Outlet /> dans la div de droite",
    successMessage: "Super ! Tu sais maintenant créer des layouts avec navigation imbriquée.",
    solution: `import { Outlet, NavLink } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="flex gap-8">
      <nav className="w-48 space-y-2">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold block" : "text-foreground block"
          }
        >
          Profil
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
}`
  },
  {
    title: "🔹 Étape 3 — Typage des paramètres",
    content: `
### Typage des paramètres d'URL

TypeScript peut nous aider à rendre les routes plus sûres en :
- Typant les paramètres d'URL
- Évitant les erreurs de typo
- Garantissant la présence des valeurs

Tu vas créer une page utilisateur avec :
- Un paramètre \`id\` typé
- Une validation du paramètre
- Un affichage sécurisé

> 💡 Conseil de React-Bot :  
> Type les paramètres avec une interface :
> \`\`\`tsx
> interface UserParams {
>   id: string;
> }
> const { id } = useParams<UserParams>();
> \`\`\`
    `,
    initialCode: `import { useParams } from "react-router-dom";

// Type les paramètres ici
interface UserParams {
  id: string;
}

function UserPage() {
  // Utilise useParams avec le type
  const params = useParams();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Utilisateur #{/* id ici */}
      </h2>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useParams") &&
             code.includes("UserParams") &&
             code.includes("id: string");
    },
    hint: "Vérifie que tu as :\n- Créé l'interface UserParams\n- Utilisé useParams avec le type\n- Extrait et affiché l'id",
    successMessage: "Excellent ! Tes routes sont maintenant typées et plus sûres.",
    solution: `import { useParams } from "react-router-dom";

interface UserParams {
  id: string;
}

function UserPage() {
  const { id } = useParams<UserParams>();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Utilisateur #{id}
      </h2>
    </div>
  );
}`
  },
  {
    title: "🎓 Mini-Projet Final — AdminPanel",
    content: `
### Le Panneau d'Administration

Pour ce projet final, tu vas créer un espace admin complet avec :
- Un layout principal
- Une navigation latérale
- Des routes imbriquées
- Des paramètres typés

L'interface doit avoir :
1. Une barre latérale avec navigation
2. Une page utilisateurs (/admin/users)
3. Une page détails (/admin/users/:id)
4. Une page logs (/admin/logs)

> 💡 Conseil de React-Bot :  
> Organise bien tes composants :
> - Un layout pour la structure
> - Des composants pour chaque page
> - Des types pour les paramètres
    `,
    initialCode: `import { Outlet, NavLink, useParams } from "react-router-dom";

// 1. Layout Admin
function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r p-4 space-y-2">
        {/* Navigation ici */}
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

// 2. Pages
function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
      {/* Liste des utilisateurs */}
    </div>
  );
}

interface UserParams {
  id: string;
}

function UserDetails() {
  const { id } = useParams<UserParams>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Détails de l'utilisateur #{id}
      </h1>
    </div>
  );
}

function LogsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Journaux</h1>
      {/* Liste des logs */}
    </div>
  );
}

// 3. Routes
// <Route path="/admin" element={<AdminLayout />}>
//   <Route path="users" element={<UsersPage />} />
//   <Route path="users/:id" element={<UserDetails />} />
//   <Route path="logs" element={<LogsPage />} />
// </Route>`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("AdminLayout") &&
             code.includes("Outlet") &&
             code.includes("useParams") &&
             code.includes(":id") &&
             code.includes("NavLink");
    },
    hint: "N'oublie pas :\n- Les NavLink dans la barre latérale\n- L'Outlet dans le layout\n- Le typage des paramètres\n- Les routes imbriquées",
    successMessage: "🎉 Félicitations ! Tu as créé une interface admin complète et bien structurée.\nTu maîtrises maintenant les layouts et les routes imbriquées !",
    solution: `import { Outlet, NavLink, useParams } from "react-router-dom";

// 1. Layout Admin
function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r p-4 space-y-2">
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold block" : "text-foreground block"
          }
        >
          Utilisateurs
        </NavLink>
        <NavLink
          to="logs"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold block" : "text-foreground block"
          }
        >
          Journaux
        </NavLink>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

// 2. Pages
function UsersPage() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded">
            <NavLink
              to={\`\${user.id}\`}
              className="hover:text-primary"
            >
              {user.name}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

interface UserParams {
  id: string;
}

function UserDetails() {
  const { id } = useParams<UserParams>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Détails de l'utilisateur #{id}
      </h1>
      <NavLink
        to=".."
        className="text-primary hover:underline"
      >
        ← Retour à la liste
      </NavLink>
    </div>
  );
}

function LogsPage() {
  const logs = [
    { id: 1, message: "Connexion utilisateur", date: new Date().toISOString() },
    { id: 2, message: "Mise à jour profil", date: new Date().toISOString() },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Journaux</h1>
      <div className="space-y-2">
        {logs.map(log => (
          <div key={log.id} className="p-4 border rounded">
            <p className="font-medium">{log.message}</p>
            <p className="text-sm text-muted-foreground">{log.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`
  }
];

export default steps;