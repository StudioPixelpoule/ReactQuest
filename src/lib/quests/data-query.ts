import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Installer et configurer React Query",
    content: `
### Bienvenue à l'Entrepôt de Données !

Ici, tu vas apprendre à utiliser React Query pour :
- Gérer le cache des données
- Automatiser les chargements
- Invalider intelligemment
- Optimiser les performances

Tu commenceras par configurer React Query dans ton app.

> 💡 Conseil de React-Bot :  
> Le QueryClientProvider doit entourer toute l'application pour partager le client React Query.
    `,
    initialCode: `// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("QueryClient") &&
             code.includes("QueryClientProvider") &&
             code.includes("defaultOptions") &&
             code.includes("staleTime");
    },
    hint: "Vérifie que tu as :\n- Créé le QueryClient\n- Configuré les options par défaut\n- Ajouté le Provider\n- Passé le client au Provider",
    successMessage: "Bravo ! React Query est maintenant configuré dans ton app.\nTu peux commencer à l'utiliser pour gérer tes données !",
    solution: `// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}`
  },
  {
    title: "🔸 Étape 2 — Utiliser useQuery",
    content: `
### Récupérer des données avec useQuery

useQuery est le hook principal de React Query pour :
- Charger des données
- Gérer le cache
- Suivre l'état de la requête
- Recharger automatiquement

> 💡 Conseil de React-Bot :  
> La clé de requête (\`queryKey\`) identifie uniquement ta requête :
> \`\`\`ts
> const { data, isLoading } = useQuery({
>   queryKey: ['posts'],
>   queryFn: fetchPosts
> });
> \`\`\`
    `,
    initialCode: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
}

function Posts() {
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Une erreur est survenue</p>;
  }

  return (
    <ul className="space-y-2">
      {data?.map((post) => (
        <li key={post.id} className="p-4 border rounded">
          {post.title}
        </li>
      ))}
    </ul>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useQuery") &&
             code.includes("queryKey") &&
             code.includes("queryFn") &&
             code.includes("isLoading");
    },
    hint: "N'oublie pas :\n- D'utiliser useQuery avec le bon type\n- De définir une queryKey unique\n- D'implémenter la queryFn\n- De gérer les états de chargement",
    successMessage: "Super ! Tu sais maintenant utiliser useQuery pour charger des données.",
    solution: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
}

function Posts() {
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Une erreur est survenue</p>;
  }

  return (
    <ul className="space-y-2">
      {data?.map((post) => (
        <li key={post.id} className="p-4 border rounded">
          {post.title}
        </li>
      ))}
    </ul>
  );
}`
  },
  {
    title: "🔹 Étape 3 — Invalidation et refetch",
    content: `
### Gérer le cache et les mises à jour

React Query permet de :
- Forcer un rechargement
- Invalider le cache
- Mettre à jour automatiquement
- Gérer les dépendances

> 💡 Conseil de React-Bot :  
> \`refetch()\` recharge manuellement les données :
> \`\`\`ts
> const { refetch } = useQuery({ ... });
> <button onClick={() => refetch()}>Recharger</button>
> \`\`\`
    `,
    initialCode: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
}

function PostList() {
  const { data, isLoading, isFetching, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          🔄 Rafraîchir
        </button>
        {isFetching && (
          <span className="text-muted-foreground">
            Mise à jour...
          </span>
        )}
      </div>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("refetch") &&
             code.includes("isFetching") &&
             code.includes("onClick") &&
             code.includes("🔄");
    },
    hint: "Vérifie que tu as :\n- Extrait refetch de useQuery\n- Ajouté le bouton de rafraîchissement\n- Géré l'état isFetching\n- Affiché un indicateur de mise à jour",
    successMessage: "Excellent ! Tu maîtrises maintenant le rechargement et l'invalidation avec React Query.",
    solution: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
}

function PostList() {
  const { data, isLoading, isFetching, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          🔄 Rafraîchir
        </button>
        {isFetching && (
          <span className="text-muted-foreground">
            Mise à jour...
          </span>
        )}
      </div>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`
  },
  {
    title: "🎓 Mini-Projet Final — Blog avec React Query",
    content: `
### Le Blog Optimisé

Pour ce projet final, tu vas créer un blog qui utilise toutes les fonctionnalités de React Query :
- Liste d'articles avec cache
- Détail d'un article
- Préchargement des données
- Gestion optimisée du cache

> 💡 Conseil de React-Bot :  
> Utilise des clés de requête dynamiques pour les articles :
> \`['post', id]\`
    `,
    initialCode: `import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

// Liste des articles
function PostList() {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="space-y-4">
      {data?.map((post) => (
        <article key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-muted-foreground">{post.body}</p>
        </article>
      ))}
    </div>
  );
}

// Détail d'un article
function PostDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts/\${id}\`
      );
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Chargement...</p>;

  if (!data) return null;

  return (
    <article className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-lg text-muted-foreground">{data.body}</p>
    </article>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("queryKey") &&
             code.includes("['post', id]") &&
             code.includes("useParams") &&
             code.includes("enabled");
    },
    hint: "Vérifie que tu as :\n- Utilisé des queryKey uniques\n- Typé les réponses\n- Géré le enabled avec l'id\n- Affiché les états de chargement",
    successMessage: "🎉 Félicitations ! Tu as créé un blog optimisé avec React Query.\nTu maîtrises maintenant la gestion avancée des données en React !",
    solution: `import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

// Liste des articles
function PostList() {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="space-y-4">
      {data?.map((post) => (
        <article key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-muted-foreground">{post.body}</p>
        </article>
      ))}
    </div>
  );
}

// Détail d'un article
function PostDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts/\${id}\`
      );
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Chargement...</p>;

  if (!data) return null;

  return (
    <article className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-lg text-muted-foreground">{data.body}</p>
    </article>
  );
}`
  }
];

export default steps;