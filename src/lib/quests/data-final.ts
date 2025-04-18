import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "💥 Mini-Projet Final — Blog Connecté",
    content: `
### Le Blog Connecté

Pour ce projet final, tu vas créer un blog complet qui combine tout ce que tu as appris :
- Appels API avec axios
- Gestion du cache avec React Query
- Navigation dynamique
- Typage strict

Le blog doit avoir :
1. Une liste d'articles paginée
2. Une page de détail optimisée
3. Un système de commentaires
4. Une gestion intelligente du cache

> 💡 Conseil de React-Bot :  
> Utilise des clés de requête structurées pour une meilleure organisation :
> \`['posts', { page, limit }]\`
    `,
    initialCode: `import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Types
interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  email: string;
  body: string;
}

// Composant Liste des Articles
function PostList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['posts', { page, limit }],
    queryFn: async () => {
      const start = (page - 1) * limit;
      const res = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts?_start=\${start}&_limit=\${limit}\`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Chargement des articles...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Articles</h1>

      <div className="grid gap-6">
        {data?.map((post: Post) => (
          <article key={post.id} className="p-6 border rounded-lg hover:border-primary">
            <Link to={\`/posts/\${post.id}\`} className="space-y-2 block">
              <h2 className="text-xl font-semibold hover:text-primary">
                {post.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">
                {post.body}
              </p>
            </Link>
          </article>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          ← Précédent
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={data?.length < limit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          Suivant →
        </button>
      </div>

      {isFetching && (
        <div className="text-center text-muted-foreground">
          Mise à jour...
        </div>
      )}
    </div>
  );
}

// Composant Détail d'un Article
function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts/\${id}\`
      );
      return res.data;
    },
    enabled: !!id,
  });

  const commentsQuery = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const res = await axios.get(
        \`https://jsonplaceholder.typicode.com/posts/\${id}/comments\`
      );
      return res.data;
    },
    enabled: !!id,
  });

  if (postQuery.isLoading) return <p>Chargement de l'article...</p>;
  if (!postQuery.data) return <p>Article non trouvé</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Link to="/" className="text-primary hover:underline">
        ← Retour aux articles
      </Link>

      <article className="prose dark:prose-invert max-w-none">
        <h1>{postQuery.data.title}</h1>
        <p className="text-lg">{postQuery.data.body}</p>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
        
        {commentsQuery.isLoading ? (
          <p>Chargement des commentaires...</p>
        ) : (
          <div className="space-y-4">
            {commentsQuery.data?.map((comment: Comment) => (
              <div key={comment.id} className="p-4 border rounded">
                <p className="font-medium text-sm text-primary mb-2">
                  {comment.email}
                </p>
                <p className="text-muted-foreground">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useQuery") &&
             code.includes("queryKey") &&
             code.includes("enabled") &&
             code.includes("isFetching") &&
             code.includes("pagination");
    },
    hint: "Vérifie que tu as :\n- Implémenté la pagination\n- Géré le cache des articles et commentaires\n- Utilisé des queryKey structurées\n- Ajouté la navigation entre les pages",
    successMessage: "🎉 Félicitations ! Tu as créé un blog complet et optimisé.\nTu maîtrises maintenant la gestion des données en React !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;