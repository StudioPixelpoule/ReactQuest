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
    initialCode: `// 1. store.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 2. postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;

// 3. api/posts.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async (page: number = 1, limit: number = 10) => {
  const start = (page - 1) * limit;
  const response = await api.get(\`/posts?_start=\${start}&_limit=\${limit}\`);
  return response.data;
};

export const getPost = async (id: string) => {
  const response = await api.get(\`/posts/\${id}\`);
  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await api.get(\`/posts/\${postId}/comments\`);
  return response.data;
};

// 4. hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import * as api from '../api/posts';

export function usePosts(page: number = 1) {
  return useQuery({
    queryKey: ['posts', { page }],
    queryFn: () => api.getPosts(page),
    keepPreviousData: true,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getPost(id),
    enabled: !!id,
  });
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId),
    enabled: !!postId,
  });
}

// 5. components/PostList.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

export function PostList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = usePosts(page);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-4 border rounded animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Articles</h1>

      <div className="space-y-4">
        {data?.map((post) => (
          <article key={post.id} className="p-6 border rounded-lg hover:border-primary">
            <Link to={\`/post/\${post.id}\`} className="block">
              <h2 className="text-xl font-bold hover:text-primary">{post.title}</h2>
              <p className="mt-2 text-muted-foreground line-clamp-2">{post.body}</p>
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
          disabled={!data || data.length < 10}
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

// 6. components/PostDetail.tsx
import { Link, useParams } from 'react-router-dom';
import { usePost, useComments } from '../hooks/usePosts';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading: postLoading } = usePost(id!);
  const { data: comments, isLoading: commentsLoading } = useComments(id!);

  if (postLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <div className="h-8 bg-muted rounded w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Link to="/" className="text-primary hover:underline">
        ← Retour aux articles
      </Link>

      <article className="prose dark:prose-invert max-w-none">
        <h1>{post.title}</h1>
        <p className="text-lg">{post.body}</p>
      </article>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
        
        {commentsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-4 border rounded animate-pulse">
                <div className="h-3 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-2 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {comments?.map((comment) => (
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