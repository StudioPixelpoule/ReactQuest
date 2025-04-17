import { QuestStep } from '@/types/quest';

export const contextQuest: QuestStep[] = [
  {
    title: "🏭 Introduction — Étape 1",
    content: `
### Bienvenue à l'Usine du Context API !

Ici, tu vas apprendre à **partager des données globalement** entre tes composants :
- Créer un contexte typé
- L'exposer via un Provider
- Le consommer dans les composants
- Éviter le "prop drilling"

> 💡 Conseil de React-Bot :  
> Un contexte est comme une "bulle" qui entoure tes composants et leur donne accès à des données partagées.
    `,
    initialCode: `import { createContext, useState, useContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 1. Crée le contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Crée le Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Crée un hook personnalisé
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}`,
    validate: (code: string) =>
      code.includes("createContext") &&
      code.includes("ThemeProvider") &&
      code.includes("useTheme") &&
      code.includes("toggleTheme"),
    hint: "Vérifie que tu as :\n- Créé le contexte avec createContext\n- Défini le Provider avec l'état theme\n- Créé le hook useTheme\n- Géré le cas où le contexte est undefined",
    successMessage: "Bravo ! Tu as créé ton premier contexte typé.\nC'est la base pour partager des données globalement !"
  },
  {
    title: "🔸 Étape 2 — Consommer le contexte",
    content: `
### Utiliser le contexte

Maintenant que ton contexte est créé, tu vas apprendre à :
- L'utiliser dans des composants
- Accéder aux données partagées
- Déclencher des actions globales

> 💡 Conseil de React-Bot :  
> Le hook \`useTheme()\` te donne accès à \`theme\` et \`toggleTheme\` n'importe où dans l'app !
    `,
    initialCode: `// Crée un composant qui utilise le contexte de thème
function ThemeSwitcher() {
  // Utilise le hook useTheme ici
  
  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-2">
        Thème actuel : {/* affiche le thème */}
      </p>
      <button
        onClick={/* change le thème */}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Changer de thème
      </button>
    </div>
  );
}

// Exemple d'utilisation :
function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}`,
    validate: (code: string) =>
      code.includes("useTheme") &&
      code.includes("theme") &&
      code.includes("toggleTheme") &&
      code.includes("onClick"),
    hint: "N'oublie pas :\n- D'utiliser le hook useTheme\n- D'extraire theme et toggleTheme\n- D'afficher le thème actuel\n- D'appeler toggleTheme au clic",
    successMessage: "Super ! Tu sais maintenant utiliser un contexte dans tes composants."
  },
  {
    title: "🔹 Étape 3 — Contexte avec actions",
    content: `
### Actions dans le contexte

Un contexte peut aussi exposer des **actions** pour modifier l'état global.
C'est très utile pour :
- Mettre à jour des données
- Déclencher des effets
- Synchroniser plusieurs composants

> 💡 Conseil de React-Bot :  
> Pense à typer les actions avec TypeScript pour plus de sécurité !
    `,
    initialCode: `interface User {
  name: string;
  role: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  toggleRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Implémente les actions ici
  
  return (
    <UserContext.Provider value={/* valeur */}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}`,
    validate: (code: string) =>
      code.includes("login") &&
      code.includes("logout") &&
      code.includes("toggleRole") &&
      code.includes("setUser"),
    hint: "Vérifie que tu as :\n- Implémenté login avec setUser\n- Implémenté logout qui remet user à null\n- Implémenté toggleRole qui change le rôle\n- Passé toutes les actions au Provider",
    successMessage: "Excellent ! Ton contexte peut maintenant gérer des actions complexes."
  },
  {
    title: "🎓 Mini-Projet Final — CartContext",
    content: `
### Le Contexte de Panier

Pour ce projet final, tu vas créer un contexte de panier d'achat qui :
- Gère les produits
- Calcule le total
- Persiste les données

Le contexte doit exposer :
1. Le panier actuel
2. Des actions (ajouter, retirer)
3. Des calculs (total, nombre d'articles)

> 💡 Conseil de React-Bot :  
> Utilise \`localStorage\` pour sauvegarder le panier entre les rechargements !
    `,
    initialCode: `interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Charge le panier au montage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Sauvegarde le panier
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Implémente les actions et calculs ici

  return (
    <CartContext.Provider value={/* valeur */}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Exemple d'utilisation :
function CartSummary() {
  const { items, getTotal, clearCart } = useCart();
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Panier</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>{item.product.price * item.quantity}€</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t">
        <p className="font-bold">Total : {getTotal()}€</p>
        <button
          onClick={clearCart}
          className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("CartContext") &&
      code.includes("addItem") &&
      code.includes("removeItem") &&
      code.includes("localStorage") &&
      code.includes("getTotal"),
    hint: "N'oublie pas :\n- D'implémenter addItem qui gère les quantités\n- D'implémenter removeItem qui retire un produit\n- De calculer le total avec reduce\n- De sauvegarder dans localStorage",
    successMessage: "🎉 Félicitations ! Tu as créé un contexte complet et réutilisable.\nTu maîtrises maintenant le Context API en React !"
  }
];