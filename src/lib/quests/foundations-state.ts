import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Le Compteur",
    content: `
### Bienvenue à la Tour du State !

Tu arrives à la base de la Tour du State. Ici, on apprend aux composants à **se souvenir** : d'un nombre, d'un texte, d'une action.

Ton premier défi : créer un petit compteur.  
À chaque clic sur un bouton, la valeur affichée doit augmenter.

---

> 💡 Conseil de React-Bot :  
> \`useState<number>(0)\` crée un état de type \`number\`, initialisé à 0.  
> Il retourne un tableau avec :
> - La valeur actuelle
> - Une fonction pour la modifier
>
> \`\`\`tsx
> const [count, setCount] = useState<number>(0);
> \`\`\`
    `,
    initialCode: `import { useState } from 'react';

function Counter() {
  // Crée un état count initialisé à 0
  
  return (
    <div>
      <p>Valeur : {/* Affiche count ici */}</p>
      <button>
        Incrémenter
      </button>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useState<number>(0)") &&
             code.includes("setCount") &&
             code.includes("count") &&
             code.includes("onClick");
    },
    hint: "Vérifie que tu as :\n- Importé useState de 'react'\n- Créé un état avec useState<number>(0)\n- Utilisé setCount dans le onClick du bouton\n- Affiché count dans le paragraphe",
    successMessage: "Bravo ! Tu viens de créer ton premier composant avec état.\nIl se souvient de chaque clic !",
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);
  
  return (
    <div>
      <p>Valeur : {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`
  },
  {
    title: "🔸 Étape 2 — États Multiples",
    content: `
### Gérer plusieurs états

Un composant peut avoir **autant d'états** que nécessaire !

Dans cette étape, tu vas créer un composant qui gère :
- Un compteur
- Un message qui change selon le compteur

Le message doit alterner entre :
- "Nombre pair !" quand count est pair
- "Nombre impair !" quand count est impair

---

> 💡 Conseil de React-Bot :  
> Tu peux utiliser plusieurs \`useState\` dans un même composant :
> \`\`\`tsx
> const [count, setCount] = useState(0);
> const [message, setMessage] = useState("");
> \`\`\`
    `,
    initialCode: `import { useState } from 'react';

function MultiState() {
  // Crée deux états : count et message
  
  return (
    <div>
      <p>{/* Affiche le message */}</p>
      <p>Compteur : {/* Affiche count */}</p>
      <button>
        Incrémenter
      </button>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useState<number>") &&
             code.includes("useState<string>") &&
             code.includes("pair") &&
             code.includes("impair") &&
             code.includes("setCount") &&
             code.includes("setMessage");
    },
    hint: "N'oublie pas :\n- De créer deux états (count et message)\n- De mettre à jour le message quand count change\n- D'utiliser % 2 === 0 pour vérifier si un nombre est pair",
    successMessage: "Super ! Tu sais maintenant gérer plusieurs états qui interagissent entre eux.",
    solution: `import { useState, useEffect } from 'react';

function MultiState() {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    setMessage(count % 2 === 0 ? "Nombre pair !" : "Nombre impair !");
  }, [count]);
  
  return (
    <div>
      <p>{message}</p>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`
  }
];

export default steps;