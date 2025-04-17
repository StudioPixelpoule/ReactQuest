import { QuestStep } from '@/types/quest';

export const routingQuest: QuestStep[] = [
  {
    title: "🚉 Introduction — Étape 1",
    content: `
### Bienvenue à la Gare Centrale des Routes !

Ici, tu vas apprendre à créer des **chemins** dans ton application React :
- Définir des routes
- Naviguer entre les pages
- Gérer les paramètres d'URL
- Protéger certaines pages

Tu commenceras par configurer React Router et créer tes premières routes.

> 💡 Conseil de React-Bot :  
> React Router utilise des composants spéciaux :
> - \`<BrowserRouter>\` pour activer le routage
> - \`<Routes>\` pour définir les chemins
> - \`<Route>\` pour chaque page
    `,
    initialCode: `// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ajoute les routes pour / et /about */}
      </Routes>
    </BrowserRouter>
  );
}`,
    validate: (code: string) =>
      code.includes("BrowserRouter") &&
      code.includes("Route") &&
      code.includes('path="/"') &&
      code.includes('path="/about"'),
    hint: "N'oublie pas :\n- D'ajouter une Route pour la page d'accueil (/)\n- D'ajouter une Route pour la page About (/about)\n- De spécifier l'element pour chaque Route",
    successMessage: "Bravo ! Tu as configuré tes premières routes.\nTon application a maintenant plusieurs pages !"
  },
  {
    title: "🔸 Étape 2 — Navigation",
    content: `
### Navigation entre les pages

Pour naviguer entre les pages, on utilise le composant \`<Link>\`.
C'est comme une balise \`<a>\`, mais optimisée pour React Router.

Tu vas créer une barre de navigation avec :
- Un lien vers l'accueil
- Un lien vers la page À propos
- Un style actif pour la page courante

> 💡 Conseil de React-Bot :  
> \`NavLink\` est comme \`Link\` mais avec un état "actif" :
> \`\`\`tsx
> <NavLink
>   className={({ isActive }) => 
>     isActive ? "text-primary" : ""
>   }
> >
>   Accueil
> </NavLink>
> \`\`\`
    `,
    initialCode: `import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-card">
      {/* Ajoute les liens de navigation */}
    </nav>
  );
}`,
    validate: (code: string) =>
      code.includes("NavLink") &&
      code.includes('to="/"') &&
      code.includes('to="/about"') &&
      code.includes("isActive"),
    hint: "Vérifie que tu as :\n- Utilisé NavLink (pas Link)\n- Un lien vers / et /about\n- Une classe conditionnelle avec isActive",
    successMessage: "Super ! Ta navigation est maintenant interactive et réactive."
  },
  {
    title: "🔹 Étape 3 — Routes dynamiques",
    content: `
### Paramètres d'URL

Les routes peuvent être **dynamiques** avec des paramètres :
- \`/profile/:name\` capture le nom dans l'URL
- \`useParams()\` récupère ce paramètre
- On peut l'utiliser dans le composant

Tu vas créer une page de profil personnalisée selon l'URL.

> 💡 Conseil de React-Bot :  
> \`useParams\` retourne un objet avec les paramètres :
> \`\`\`tsx
> const { name } = useParams<{ name: string }>();
> \`\`\`
    `,
    initialCode: `import { useParams } from "react-router-dom";

function Profile() {
  // Récupère le paramètre "name"
  const params = useParams<{ name: string }>();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        {/* Affiche "Profil de [name]" */}
      </h2>
    </div>
  );
}

// Route à ajouter :
// <Route path="/profile/:name" element={<Profile />} />`,
    validate: (code: string) =>
      code.includes("useParams") &&
      code.includes(":name") &&
      code.includes("Profil de"),
    hint: "N'oublie pas :\n- D'utiliser useParams avec le bon type\n- D'extraire le paramètre name\n- D'afficher le nom dans le titre",
    successMessage: "Excellent ! Tu sais maintenant créer des routes dynamiques."
  },
  {
    title: "🎓 Mini-Projet Final — Mini-Portail",
    content: `
### Le Mini-Portail Utilisateur

Pour ce projet final, tu vas créer une petite application avec :
- Une navigation complète
- Des routes protégées
- Des paramètres d'URL
- Une gestion des erreurs 404

L'app doit avoir :
1. Une page d'accueil (/)
2. Une page À propos (/about)
3. Un profil dynamique (/profile/:name)
4. Une zone admin protégée (/admin)
5. Une page 404 pour les routes inconnues

> 💡 Conseil de React-Bot :  
> Utilise \`useNavigate\` pour les redirections :
> \`\`\`tsx
> const navigate = useNavigate();
> navigate("/login");
> \`\`\`
    `,
    initialCode: `import { BrowserRouter, Routes, Route, NavLink, useNavigate, useParams } from "react-router-dom";

// 1. Composant de route protégée
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true; // À remplacer par une vraie auth
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <p>Accès refusé</p>;
  }

  return <>{children}</>;
}

// 2. Barre de navigation
function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-card">
      {/* Liens de navigation */}
    </nav>
  );
}

// 3. Pages
function Home() {
  return <h1>Accueil</h1>;
}

function About() {
  return <h1>À propos</h1>;
}

function Profile() {
  const { name } = useParams<{ name: string }>();
  return <h1>Profil de {name}</h1>;
}

function Admin() {
  return <h1>Admin</h1>;
}

function NotFound() {
  return <h1>Page non trouvée</h1>;
}

// 4. App avec toutes les routes
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4">
        <Routes>
          {/* Routes ici */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}`,
    validate: (code: string) =>
      code.includes("Route") &&
      code.includes("PrivateRoute") &&
      code.includes(":name") &&
      code.includes("useParams") &&
      code.includes("NavLink") &&
      code.includes("*"),
    hint: "Vérifie que tu as :\n- Toutes les routes (/, /about, /profile/:name, /admin)\n- Une route * pour le 404\n- La route admin protégée avec PrivateRoute\n- Tous les liens dans la Navbar",
    successMessage: "🎉 Félicitations ! Tu as créé une application complète avec routage.\nTu maîtrises maintenant la navigation en React !"
  }
];