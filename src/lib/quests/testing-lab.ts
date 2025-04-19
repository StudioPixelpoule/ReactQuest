import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Tester un composant simple",
    content: `
### Bienvenue au Centre de Tests !

Ici, tu vas apprendre à tester tes composants React avec :
- Jest pour les tests unitaires
- Testing Library pour les tests d'intégration
- TypeScript pour le typage des tests

Tu commenceras par tester un composant simple.

> 💡 Conseil de React-Bot :  
> Testing Library encourage à tester comme un utilisateur utiliserait ton app !
    `,
    initialCode: `// Greeting.tsx
interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return (
    <div className="p-4 border rounded">
      <h1 className="text-xl font-bold">Bonjour, {name} !</h1>
    </div>
  );
}

// Greeting.test.tsx
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('Greeting', () => {
  it('affiche le nom correctement', () => {
    render(<Greeting name="Alice" />);
    
    const heading = screen.getByRole('heading', {
      name: /bonjour, alice !/i
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('a les styles corrects', () => {
    render(<Greeting name="Alice" />);
    
    const container = screen.getByText(/bonjour/i).closest('div');
    expect(container).toHaveClass('p-4', 'border', 'rounded');
  });
});`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("render") &&
             code.includes("getByRole") &&
             code.includes("toBeInTheDocument") &&
             code.includes("describe");
    },
    hint: "Vérifie que tu as :\n- Importé render et screen\n- Utilisé getByRole pour l'accessibilité\n- Écrit des assertions avec expect\n- Groupé les tests avec describe",
    successMessage: "Bravo ! Tu sais maintenant tester un composant simple.\nC'est la base pour des tests fiables !",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔸 Étape 2 — Tester les interactions",
    content: `
### Tester les interactions utilisateur

Testing Library permet de simuler :
- Des clics
- Des saisies
- Des soumissions de formulaire
- Des changements d'état

Tu vas tester un formulaire simple.

> 💡 Conseil de React-Bot :  
> \`userEvent\` est préféré à \`fireEvent\` car il simule mieux les vraies interactions :
> \`\`\`ts
> await userEvent.type(input, 'test');
> await userEvent.click(button);
> \`\`\`
    `,
    initialCode: `// Counter.tsx
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  onIncrement?: (value: number) => void;
}

export function Counter({ initialValue = 0, onIncrement }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onIncrement?.(newCount);
  };

  return (
    <div className="p-4 border rounded">
      <p className="text-xl mb-4">Compteur : {count}</p>
      <button
        onClick={increment}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Incrémenter
      </button>
    </div>
  );
}

// Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  it('démarre avec la valeur initiale', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText(/compteur : 5/i)).toBeInTheDocument();
  });

  it('incrémente au clic', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    
    const button = screen.getByRole('button', { name: /incrémenter/i });
    await user.click(button);
    
    expect(screen.getByText(/compteur : 1/i)).toBeInTheDocument();
  });

  it('appelle onIncrement avec la nouvelle valeur', async () => {
    const onIncrement = vi.fn();
    const user = userEvent.setup();
    
    render(<Counter initialValue={0} onIncrement={onIncrement} />);
    
    const button = screen.getByRole('button', { name: /incrémenter/i });
    await user.click(button);
    
    expect(onIncrement).toHaveBeenCalledWith(1);
  });
});`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("userEvent") &&
             code.includes("vi.fn") &&
             code.includes("toHaveBeenCalledWith") &&
             code.includes("initialValue");
    },
    hint: "N'oublie pas :\n- D'utiliser userEvent.setup()\n- De créer un mock avec vi.fn()\n- D'attendre les actions avec await\n- De tester les props et callbacks",
    successMessage: "Super ! Tu sais maintenant tester les interactions utilisateur.",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔹 Étape 3 — Tests asynchrones",
    content: `
### Tester le code asynchrone

Les tests doivent aussi gérer :
- Les appels API
- Les chargements
- Les erreurs
- Les timeouts

> 💡 Conseil de React-Bot :  
> \`findBy\` attend qu'un élément apparaisse :
> \`\`\`ts
> const element = await screen.findByText('Chargé !');
> \`\`\`
    `,
    initialCode: `// UserProfile.tsx
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  if (!response.ok) throw new Error('Erreur API');
  return response.json();
}

export function UserProfile({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(id)
      .then(data => {
        setUser(data);
        setError(null);
      })
      .catch(() => {
        setError("Impossible de charger l'utilisateur");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-destructive">{error}</p>;
  if (!user) return null;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">Profil de {user.name}</h2>
      <p>ID : {user.id}</p>
    </div>
  );
}

// UserProfile.test.tsx
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

// Mock de fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('UserProfile', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('affiche le chargement puis les données', async () => {
    // Mock de la réponse API
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Alice' })
    });

    render(<UserProfile id={1} />);
    
    // Vérifie l'état de chargement
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
    
    // Attend et vérifie les données
    expect(await screen.findByText(/profil de alice/i)).toBeInTheDocument();
    expect(screen.getByText(/id : 1/i)).toBeInTheDocument();
  });

  it('gère les erreurs', async () => {
    // Mock d'une erreur API
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    render(<UserProfile id={1} />);
    
    // Attend et vérifie le message d'erreur
    expect(await screen.findByText(/impossible de charger/i)).toBeInTheDocument();
  });
});`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("mockFetch") &&
             code.includes("findByText") &&
             code.includes("mockResolvedValueOnce") &&
             code.includes("mockRejectedValueOnce");
    },
    hint: "Vérifie que tu as :\n- Mocké fetch globalement\n- Utilisé findByText pour l'async\n- Testé le chargement et l'erreur\n- Réinitialisé les mocks avec beforeEach",
    successMessage: "Excellent ! Tu sais maintenant tester du code asynchrone.",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🎓 Mini-Projet Final — TodoList",
    content: `
### Tester une TodoList complète

Pour ce projet final, tu vas tester une TodoList qui combine :
- Gestion d'état local
- Interactions utilisateur
- Persistance des données
- Gestion des erreurs

L'app doit être testée pour :
1. L'ajout de tâches
2. La suppression
3. Le stockage local
4. Les cas d'erreur

> 💡 Conseil de React-Bot :  
> Pense à tester les cas limites :
> - Liste vide
> - Valeurs invalides
> - Erreurs de stockage
    `,
    initialCode: `// TodoList.tsx
import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Charge les todos au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (err) {
      setError("Erreur de chargement");
    }
  }, []);

  // Sauvegarde les todos
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {
      setError("Erreur de sauvegarde");
    }
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim()
    };
    
    setTodos([...todos, newTodo]);
    setInput('');
    setError(null);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setError(null);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {error && (
        <p className="p-2 mb-4 text-destructive bg-destructive/10 rounded">
          {error}
        </p>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Nouvelle tâche"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Ajouter
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-muted-foreground">Aucune tâche</p>
      ) : (
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-destructive hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// TodoList.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoList } from './TodoList';

// Mock de localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('TodoList', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
  });

  it('affiche un message quand la liste est vide', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<TodoList />);
    expect(screen.getByText(/aucune tâche/i)).toBeInTheDocument();
  });

  it('permet d\'ajouter une tâche', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/nouvelle tâche/i);
    const button = screen.getByText(/ajouter/i);
    
    await user.type(input, 'Nouvelle tâche');
    await user.click(button);
    
    expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument();
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  it('permet de supprimer une tâche', async () => {
    const user = userEvent.setup();
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([{ id: 1, text: 'Tâche test' }])
    );
    
    render(<TodoList />);
    
    const deleteButton = screen.getByText(/supprimer/i);
    await user.click(deleteButton);
    
    expect(screen.queryByText('Tâche test')).not.toBeInTheDocument();
  });

  it('gère les erreurs de localStorage', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    render(<TodoList />);
    expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument();
  });
});`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("mockLocalStorage") &&
             code.includes("userEvent") &&
             code.includes("beforeEach") &&
             code.includes("queryByText");
    },
    hint: "Vérifie que tu as :\n- Mocké localStorage\n- Utilisé userEvent pour les interactions\n- Testé les cas d'erreur\n- Vérifié l'absence d'éléments avec queryBy",
    successMessage: "🎉 Félicitations ! Tu as créé une suite de tests complète et robuste.\nTon application est maintenant fiable et bien testée !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;