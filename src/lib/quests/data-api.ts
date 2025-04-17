import { QuestStep } from '@/types/quest';

export const dataApiQuest: QuestStep[] = [
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

  useEffect(() => {
    // Appelle https://jsonplaceholder.typicode.com/posts
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("fetch") &&
      code.includes("jsonplaceholder") &&
      code.includes("setPosts") &&
      code.includes("setLoading(false)"),
    hint: "N'oublie pas :\n- D'appeler l'API avec fetch\n- De convertir la réponse en JSON\n- De mettre à jour les posts\n- De désactiver le loading",
    successMessage: "Bravo ! Tu sais maintenant faire des appels API avec fetch.\nC'est la base pour communiquer avec un serveur !"
  },
  {
    title: "🔸 Étape 2 — Appel avec axios + typage",
    content: `
### Utiliser axios

Axios est une alternative populaire à fetch qui offre :
- Une API plus simple
- Un meilleur support TypeScript
- Des fonctionnalités avancées

Tu vas refaire l'appel précédent avec axios.

> 💡 Conseil de React-Bot :  
> Axios type automatiquement la réponse si tu lui donnes le type :
> \`axios.get<Post[]>(url)\`
    `,
    initialCode: `import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

function PostListAxios() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("axios") &&
      code.includes("get") &&
      code.includes("data") &&
      code.includes("Post[]"),
    hint: "Vérifie que tu as :\n- Importé axios\n- Utilisé axios.get avec le type Post[]\n- Accédé à response.data\n- Géré le loading",
    successMessage: "Super ! Tu maîtrises maintenant axios pour tes appels API."
  },
  {
    title: "🔹 Étape 3 — Gérer les erreurs d'API",
    content: `
### Gestion des erreurs

Une API peut échouer pour plein de raisons :
- Serveur indisponible
- Erreur réseau
- Données invalides

Il faut toujours prévoir ces cas !

> 💡 Conseil de React-Bot :  
> Utilise try/catch avec async/await pour une gestion d'erreur plus claire :
> \`\`\`ts
> try {
>   const response = await axios.get(url);
> } catch (error) {
>   setError(error.message);
> }
> \`\`\`
    `,
    initialCode: `import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

function SafePostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="p-4 border border-destructive rounded text-destructive">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("catch") &&
      code.includes("setError") &&
      code.includes("try") &&
      code.includes("async"),
    hint: "N'oublie pas :\n- D'utiliser try/catch\n- De gérer l'erreur avec setError\n- D'afficher un message d'erreur\n- De typer l'erreur correctement",
    successMessage: "Excellent ! Tu sais maintenant gérer les erreurs d'API proprement."
  },
  {
    title: "🎓 Mini-Projet Final — Mini-Blog",
    content: `
### Le Mini-Blog avec API

Pour ce projet final, tu vas créer un mini-blog qui :
- Charge des articles depuis une API
- Gère le chargement et les erreurs
- Permet de filtrer les articles
- Utilise TypeScript et axios

L'API à utiliser :
https://jsonplaceholder.typicode.com/posts

> 💡 Conseil de React-Bot :  
> Ajoute un champ de recherche pour filtrer les articles par titre !
    `,
    initialCode: `import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

function MiniBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-4 border border-destructive rounded text-destructive">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Mini-Blog</h1>
      
      <input
        type="text"
        placeholder="Rechercher un article..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {loading ? (
        <p>Chargement des articles...</p>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article key={post.id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground">{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("axios") &&
      code.includes("useState") &&
      code.includes("setError") &&
      code.includes("Post") &&
      code.includes("filter"),
    hint: "Vérifie que tu as :\n- Utilisé axios avec le bon type\n- Géré loading et error\n- Implémenté la recherche\n- Affiché les articles filtrés",
    successMessage: "🎉 Félicitations ! Tu as créé un mini-blog complet avec API.\nTu maîtrises maintenant les appels API en React !"
  }
];