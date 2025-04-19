import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Optimiser des calculs avec useMemo",
    content: `
### Bienvenue au Laboratoire d'Optimisation !

Ici, tu vas apprendre à rendre ton app plus rapide et plus fluide avec :
- useMemo pour les calculs lourds
- useCallback pour les fonctions
- React.memo pour les composants
- lazy et Suspense pour le code splitting

Tu commenceras par optimiser un calcul avec useMemo.

> 💡 Conseil de React-Bot :  
> \`useMemo\` mémorise le résultat d'un calcul pour éviter de le refaire à chaque rendu.
    `,
    initialCode: `import { useState, useMemo } from "react";

function HeavyComponent() {
  const [count, setCount] = useState(0);

  // Utilise useMemo pour mémoriser ce calcul lourd
  const heavyResult = useMemo(() => {
    console.log("Calcul en cours...");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total;
  }, []); // à modifier ?

  return (
    <div className="p-4 space-y-4">
      <div className="p-4 border rounded">
        <p className="text-lg mb-2">Résultat du calcul lourd :</p>
        <p className="text-2xl font-bold">{heavyResult}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter
        </button>
        <span className="text-muted-foreground">
          Compteur : {count}
        </span>
      </div>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useMemo") &&
             code.includes("Calcul en cours") &&
             code.includes("count") &&
             !code.includes("recalculé à chaque fois");
    },
    hint: "Vérifie que tu as :\n- Utilisé useMemo correctement\n- Défini les dépendances\n- Conservé le calcul lourd\n- Affiché le compteur",
    successMessage: "Bravo ! Tu sais maintenant optimiser des calculs avec useMemo.\nTon composant est plus performant !",
    solution: `import { useState, useMemo } from "react";

function HeavyComponent() {
  const [count, setCount] = useState(0);

  const heavyResult = useMemo(() => {
    console.log("Calcul en cours...");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total;
  }, []); // Pas de dépendances car le calcul ne dépend de rien

  return (
    <div className="p-4 space-y-4">
      <div className="p-4 border rounded">
        <p className="text-lg mb-2">Résultat du calcul lourd :</p>
        <p className="text-2xl font-bold">{heavyResult}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter
        </button>
        <span className="text-muted-foreground">
          Compteur : {count}
        </span>
      </div>
    </div>
  );
}`
  },
  {
    title: "🔸 Étape 2 — Stabiliser une fonction avec useCallback",
    content: `
### Stabiliser les fonctions

\`useCallback\` permet de :
- Mémoriser une fonction
- Éviter les recréations inutiles
- Optimiser les performances
- Stabiliser les props

> 💡 Conseil de React-Bot :  
> Une fonction mémorisée n'est recréée que si ses dépendances changent :
> \`\`\`ts
> const handleClick = useCallback(() => {
>   console.log(count);
> }, [count]);
> \`\`\`
    `,
    initialCode: `import { useState, useCallback } from "react";

interface ItemProps {
  id: number;
  onDelete: (id: number) => void;
}

// Composant enfant mémorisé
const Item = memo(function Item({ id, onDelete }: ItemProps) {
  console.log(\`Item \${id} rendu\`);
  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <span>Item {id}</span>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded"
      >
        Supprimer
      </button>
    </div>
  );
});

function ItemList() {
  const [items, setItems] = useState([1, 2, 3]);
  const [count, setCount] = useState(0);

  // Stabilise cette fonction avec useCallback
  const handleDelete = (id: number) => {
    setItems(items => items.filter(item => item !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        {items.map(id => (
          <Item key={id} id={id} onDelete={handleDelete} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter ({count})
        </button>
        <p className="text-sm text-muted-foreground">
          (Ce bouton force un rendu)
        </p>
      </div>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useCallback") &&
             code.includes("handleDelete") &&
             code.includes("setItems") &&
             code.includes("memo");
    },
    hint: "N'oublie pas :\n- D'utiliser useCallback\n- De définir les dépendances\n- D'utiliser la forme fonctionnelle de setItems\n- De mémoriser le composant Item avec memo",
    successMessage: "Super ! Tu sais maintenant stabiliser des fonctions avec useCallback.",
    solution: `import { useState, useCallback, memo } from "react";

interface ItemProps {
  id: number;
  onDelete: (id: number) => void;
}

const Item = memo(function Item({ id, onDelete }: ItemProps) {
  console.log(\`Item \${id} rendu\`);
  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <span>Item {id}</span>
      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded"
      >
        Supprimer
      </button>
    </div>
  );
});

function ItemList() {
  const [items, setItems] = useState([1, 2, 3]);
  const [count, setCount] = useState(0);

  const handleDelete = useCallback((id: number) => {
    setItems(items => items.filter(item => item !== id));
  }, []); // Pas de dépendances car on utilise la forme fonctionnelle de setItems

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        {items.map(id => (
          <Item key={id} id={id} onDelete={handleDelete} />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter ({count})
        </button>
        <p className="text-sm text-muted-foreground">
          (Ce bouton force un rendu)
        </p>
      </div>
    </div>
  );
}`
  },
  {
    title: "🔹 Étape 3 — Empêcher des re-render avec React.memo",
    content: `
### Mémoiser des composants

\`React.memo\` permet de :
- Éviter les rendus inutiles
- Optimiser les composants purs
- Améliorer les performances
- Contrôler les mises à jour

> 💡 Conseil de React-Bot :  
> Un composant mémorisé ne se met à jour que si ses props changent !
    `,
    initialCode: `import { memo, useState } from "react";

interface TitleProps {
  text: string;
}

// Mémorise ce composant avec memo
function Title({ text }: TitleProps) {
  console.log("Rendu de Title");
  return (
    <h2 className="text-2xl font-bold">
      {text}
    </h2>
  );
}

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 space-y-4">
      <Title text="Mon titre" />
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter ({count})
        </button>
        <p className="text-sm text-muted-foreground">
          (Ce bouton ne devrait pas causer de rendu de Title)
        </p>
      </div>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("memo") &&
             code.includes("TitleProps") &&
             code.includes("console.log") &&
             code.includes("Rendu de Title");
    },
    hint: "Vérifie que tu as :\n- Utilisé memo correctement\n- Typé les props\n- Ajouté le console.log\n- Créé un exemple d'utilisation",
    successMessage: "Excellent ! Tu sais maintenant optimiser les rendus avec React.memo.",
    solution: `import { memo, useState } from "react";

interface TitleProps {
  text: string;
}

const Title = memo(function Title({ text }: TitleProps) {
  console.log("Rendu de Title");
  return (
    <h2 className="text-2xl font-bold">
      {text}
    </h2>
  );
});

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 space-y-4">
      <Title text="Mon titre" />
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter ({count})
        </button>
        <p className="text-sm text-muted-foreground">
          (Ce bouton ne devrait pas causer de rendu de Title)
        </p>
      </div>
    </div>
  );
}`
  },
  {
    title: "🔹 Étape 4 — Code splitting avec lazy et Suspense",
    content: `
### Chargement à la demande

\`lazy\` et \`Suspense\` permettent de :
- Charger le code à la demande
- Réduire le bundle initial
- Améliorer le temps de chargement
- Gérer les états de chargement

> 💡 Conseil de React-Bot :  
> Charge les composants lourds uniquement quand ils sont nécessaires !
    `,
    initialCode: `import { lazy, Suspense, useState } from "react";

// Simule un composant lourd
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShowChart(!showChart)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        {showChart ? "Cacher" : "Afficher"} le graphique
      </button>

      {showChart && (
        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
          }
        >
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("lazy") &&
             code.includes("Suspense") &&
             code.includes("fallback") &&
             code.includes("HeavyChart");
    },
    hint: "N'oublie pas :\n- D'utiliser lazy pour importer\n- D'ajouter Suspense\n- De définir un fallback\n- De gérer l'affichage conditionnel",
    successMessage: "Parfait ! Tu sais maintenant faire du code splitting avec lazy.",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;