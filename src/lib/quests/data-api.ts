import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Appel d'API avec fetch",
    content: `
### Bienvenue au Port des API !

Ici, tu vas apprendre à **communiquer avec des API REST** de manière :
- Typée avec TypeScript
- Robuste avec gestion d'erreurs
- Fluide avec états de chargement

Tu commenceras par utiliser \`fetch\` pour récupérer des données.

> 💡 Conseil de React-Bot :  
> Pense à gérer les états de chargement et d'erreur pour une meilleure expérience utilisateur !
    `,
    initialCode: `import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Articles</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("fetch") &&
             code.includes("jsonplaceholder") &&
             code.includes("setPosts") &&
             code.includes("setLoading(false)");
    },
    hint: "N'oublie pas :\n- D'appeler l'API avec fetch\n- De convertir la réponse en JSON\n- De mettre à jour les posts\n- De désactiver le loading",
    successMessage: "Bravo ! Tu sais maintenant faire des appels API avec fetch.\nC'est la base pour communiquer avec un serveur !",
    solution: `import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Articles</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`
  },
  {
    title: "🔸 Étape 2 — Gestion d'erreurs avancée",
    content: `
### Gérer les erreurs proprement

Une bonne gestion d'erreur c'est :
- Des messages clairs
- Des états d'erreur typés
- Une expérience utilisateur fluide
- Des retours visuels adaptés

Tu vas améliorer ton composant pour gérer :
- Les erreurs réseau
- Les erreurs de parsing
- Les timeouts
- Les retours utilisateur

> 💡 Conseil de React-Bot :  
> Utilise un enum pour typer les erreurs possibles !
    `,
    initialCode: `import { useEffect, useState } from "react";

enum FetchError {
  NETWORK = "Erreur réseau",
  TIMEOUT = "Délai dépassé",
  PARSE = "Erreur de données",
  UNKNOWN = "Erreur inconnue"
}

interface Post {
  id: number;
  title: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchPosts = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("network");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      if (err instanceof Error) {
        switch (err.name) {
          case "AbortError":
            setError(FetchError.TIMEOUT);
            break;
          case "TypeError":
            setError(FetchError.NETWORK);
            break;
          case "SyntaxError":
            setError(FetchError.PARSE);
            break;
          default:
            setError(FetchError.UNKNOWN);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const retry = () => {
    setError(null);
    setLoading(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="p-4 border rounded animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-10 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-destructive/50 rounded-lg">
        <p className="text-destructive mb-4">{error}</p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Articles</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("enum FetchError") &&
             code.includes("AbortController") &&
             code.includes("retry") &&
             code.includes("animate-pulse");
    },
    hint: "Vérifie que tu as :\n- Créé l'enum FetchError\n- Géré le timeout avec AbortController\n- Ajouté la fonction retry\n- Mis un loading state animé",
    successMessage: "Super ! Tu sais maintenant gérer les erreurs comme un pro.",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔹 Étape 3 — Créer un hook personnalisé",
    content: `
### Factoriser la logique d'API

Pour éviter de dupliquer le code, on va créer un hook \`useFetch\` qui :
- Gère le chargement
- Gère les erreurs
- Type les données
- Est réutilisable

C'est un pattern très courant pour :
- Factoriser du code
- Améliorer la maintenabilité
- Rendre le code plus propre

> 💡 Conseil de React-Bot :  
> Un hook personnalisé peut retourner plusieurs valeurs :
> \`const { data, loading, error } = useFetch<T>(url);\`
    `,
    initialCode: `import { useState, useEffect } from "react";

enum FetchError {
  NETWORK = "Erreur réseau",
  TIMEOUT = "Délai dépassé",
  PARSE = "Erreur de données",
  UNKNOWN = "Erreur inconnue"
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: FetchError | null;
}

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("network");
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      if (err instanceof Error) {
        let error = FetchError.UNKNOWN;
        switch (err.name) {
          case "AbortError":
            error = FetchError.TIMEOUT;
            break;
          case "TypeError":
            error = FetchError.NETWORK;
            break;
          case "SyntaxError":
            error = FetchError.PARSE;
            break;
        }
        setState({ data: null, loading: false, error });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const retry = () => {
    setState({ data: null, loading: true, error: null });
    fetchData();
  };

  return { ...state, retry };
}

// Exemple d'utilisation :
interface Post {
  id: number;
  title: string;
}

function PostList() {
  const { data, loading, error, retry } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) {
    return (
      <div className="p-4 border rounded animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-10 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-destructive/50 rounded-lg">
        <p className="text-destructive mb-4">{error}</p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Articles</h2>
      <ul className="space-y-2">
        {data?.map((post) => (
          <li key={post.id} className="p-4 border rounded">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useFetch") &&
             code.includes("FetchState") &&
             code.includes("retry") &&
             code.includes("controller.abort");
    },
    hint: "Vérifie que tu as :\n- Typé l'état avec FetchState\n- Géré le timeout\n- Ajouté la fonction retry\n- Retourné toutes les valeurs nécessaires",
    successMessage: "Excellent ! Tu as créé un hook réutilisable pour les appels API.",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;