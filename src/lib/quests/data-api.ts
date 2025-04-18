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

  useEffect(() => {
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
}`
  }
];

export default steps;