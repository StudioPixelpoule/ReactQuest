import { QuestStep } from '@/types/quest';

export const optimizationLabQuest: QuestStep[] = [
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

  const heavyResult = useMemo(() => {
    console.log("Calcul en cours...");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total;
  }, []); // à modifier ?

  return (
    <div className="p-4 space-y-4">
      <p className="text-lg">Résultat lourd : {heavyResult}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        +1 ({count})
      </button>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useMemo") &&
      code.includes("Calcul en cours") &&
      code.includes("count") &&
      !code.includes("recalculé à chaque fois"),
    hint: "Vérifie que tu as :\n- Utilisé useMemo correctement\n- Défini les dépendances\n- Conservé le calcul lourd\n- Affiché le compteur",
    successMessage: "Bravo ! Tu sais maintenant optimiser des calculs avec useMemo.\nTon composant est plus performant !"
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

function CallbackExample() {
  const [value, setValue] = useState(0);

  const handleClick = useCallback(() => {
    setValue(v => v + 1);
    console.log("Click !");
  }, []);

  return (
    <div className="p-4 space-y-4">
      <p className="text-lg">Valeur : {value}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Incrémenter
      </button>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useCallback") &&
      code.includes("handleClick") &&
      code.includes("setValue") &&
      code.includes("Click !"),
    hint: "N'oublie pas :\n- D'utiliser useCallback\n- De définir les dépendances\n- D'utiliser setValue avec le callback\n- D'afficher la valeur",
    successMessage: "Super ! Tu sais maintenant stabiliser des fonctions avec useCallback."
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
    initialCode: `import { memo } from "react";

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

// Exemple d'utilisation :
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 space-y-4">
      <Title text="Mon titre" />
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Count: {count}
      </button>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("memo") &&
      code.includes("TitleProps") &&
      code.includes("console.log") &&
      code.includes("Rendu de Title"),
    hint: "Vérifie que tu as :\n- Utilisé memo correctement\n- Typé les props\n- Ajouté le console.log\n- Créé un exemple d'utilisation",
    successMessage: "Excellent ! Tu sais maintenant optimiser les rendus avec React.memo."
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

const Settings = lazy(() => import("./Settings"));

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        {show ? "Cacher" : "Afficher"} les paramètres
      </button>

      {show && (
        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              Chargement...
            </div>
          }
        >
          <Settings />
        </Suspense>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("lazy") &&
      code.includes("Suspense") &&
      code.includes("fallback") &&
      code.includes("Settings"),
    hint: "N'oublie pas :\n- D'utiliser lazy pour importer\n- D'ajouter Suspense\n- De définir un fallback\n- De gérer l'affichage conditionnel",
    successMessage: "Parfait ! Tu sais maintenant faire du code splitting avec lazy."
  },
  {
    title: "🎓 Mini-Projet Final — Performance Dashboard",
    content: `
### Le Dashboard Optimisé

Pour ce projet final, tu vas créer un dashboard qui combine toutes les optimisations :
- Calculs lourds avec useMemo
- Fonctions stables avec useCallback
- Composants mémorisés avec memo
- Chargement à la demande avec lazy

> 💡 Conseil de React-Bot :  
> Pense à mesurer les performances avec React DevTools !
    `,
    initialCode: `import { useState, useMemo, useCallback, lazy, Suspense } from "react";

// Composant de statistiques lourd
function Stats({ data }: { data: number[] }) {
  // Calcul des stats avec useMemo
  const stats = useMemo(() => {
    console.log("Calcul des statistiques...");
    return {
      total: data.reduce((a, b) => a + b, 0),
      average: data.reduce((a, b) => a + b, 0) / data.length,
      max: Math.max(...data),
    };
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 border rounded">
        <h3 className="font-medium">Total</h3>
        <p className="text-2xl">{stats.total}</p>
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-medium">Moyenne</h3>
        <p className="text-2xl">{stats.average.toFixed(2)}</p>
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-medium">Maximum</h3>
        <p className="text-2xl">{stats.max}</p>
      </div>
    </div>
  );
}

// Composant de titre mémorisé
const Title = memo(function Title({ text }: { text: string }) {
  console.log("Rendu du titre");
  return <h2 className="text-2xl font-bold mb-4">{text}</h2>;
});

// Composant de détails chargé en lazy
const Details = lazy(() => import("./Details"));

function Dashboard() {
  const [data, setData] = useState([10, 20, 30, 40, 50]);
  const [showDetails, setShowDetails] = useState(false);

  // Fonction d'ajout mémorisée
  const addValue = useCallback(() => {
    setData(d => [...d, Math.floor(Math.random() * 100)]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Title text="Dashboard de Performance" />

      <Stats data={data} />

      <div className="space-x-4">
        <button
          onClick={addValue}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Ajouter une valeur
        </button>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        >
          {showDetails ? "Cacher" : "Afficher"} les détails
        </button>
      </div>

      {showDetails && (
        <Suspense
          fallback={
            <div className="p-4 border rounded animate-pulse">
              Chargement des détails...
            </div>
          }
        >
          <Details data={data} />
        </Suspense>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useMemo") &&
      code.includes("useCallback") &&
      code.includes("memo") &&
      code.includes("lazy") &&
      code.includes("Suspense"),
    hint: "Vérifie que tu as :\n- Utilisé useMemo pour les calculs\n- Mémorisé les fonctions avec useCallback\n- Créé des composants avec memo\n- Implémenté le lazy loading",
    successMessage: "🎉 Félicitations ! Tu as créé un dashboard optimisé et performant.\nTu maîtrises maintenant les techniques d'optimisation en React !"
  }
];