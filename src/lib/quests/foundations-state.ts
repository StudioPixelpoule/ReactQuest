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
    initialCode: `import { useState, useEffect } from 'react';

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
  },
  {
    title: "🔹 Étape 3 — Input Contrôlé",
    content: `
### Les champs contrôlés

En React, on peut **contrôler** les champs de formulaire avec le state.
C'est ce qu'on appelle un **composant contrôlé**.

Tu vas créer un champ texte qui :
- Stocke sa valeur dans le state
- Met à jour le state à chaque changement
- Affiche la valeur en temps réel

---

> 💡 Conseil de React-Bot :  
> Un input contrôlé utilise :
> - \`value={state}\` pour afficher la valeur
> - \`onChange\` pour la mettre à jour :
> \`\`\`tsx
> onChange={(e) => setState(e.target.value)}
> \`\`\`
    `,
    initialCode: `import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={/* état ici */}
        onChange={/* mettre à jour le state */}
      />
      <p>Bonjour {/* afficher le nom ici */}</p>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("value={name}") &&
             code.includes("onChange") &&
             code.includes("setName") &&
             code.includes("e.target.value");
    },
    hint: "Vérifie que tu as :\n- Lié value à l'état name\n- Utilisé onChange pour mettre à jour name\n- Affiché name dans le message de bienvenue",
    successMessage: "Parfait ! Tu maîtrises maintenant les composants contrôlés.",
    solution: `import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Bonjour {name}</p>
    </div>
  );
}`
  },
  {
    title: "🎓 Mini-Projet Final — DashboardWidget",
    content: `
### Le Widget de Tableau de Bord

Pour ce projet final, tu vas créer une mini-application qui combine tout ce que tu as appris :
- Un champ pour le prénom
- Un compteur de clics
- Un bouton qui affiche une alerte personnalisée

Le widget doit :
1. Permettre de saisir un prénom
2. Compter les clics sur un bouton
3. Avoir un bouton "Saluer" qui affiche :
   "Bonjour [nom] ! Tu as cliqué [X] fois."

---

> 💡 Conseil de React-Bot :  
> Utilise \`alert()\` pour afficher le message final :
> \`\`\`tsx
> alert(\`Bonjour \${name} ! Tu as cliqué \${count} fois.\`);
> \`\`\`
    `,
    initialCode: `import { useState } from 'react';

function DashboardWidget() {
  // Crée les états nécessaires ici
  
  return (
    <div className="p-4 border rounded-lg">
      {/* Ajoute :
        - Un input pour le nom
        - Un affichage du compteur
        - Un bouton pour incrémenter
        - Un bouton pour afficher l'alerte
      */}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useState<string>") &&
             code.includes("useState<number>") &&
             code.includes("alert") &&
             code.includes("onChange") &&
             code.includes("onClick") &&
             code.includes("Bonjour") &&
             code.includes("cliqué");
    },
    hint: "N'oublie pas :\n- Créé les deux états (name et count)\n- Un input contrôlé pour le nom\n- Un bouton pour incrémenter count\n- Un bouton qui déclenche l'alert avec le message formaté",
    successMessage: "🎉 Félicitations ! Tu as créé un widget interactif complet !\nTu maîtrises maintenant la gestion d'état en React.",
    solution: `import { useState } from 'react';

function DashboardWidget() {
  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ton prénom"
        className="border p-2 rounded w-full"
      />
      
      <div>
        <p>Nombre de clics : {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Cliquer
        </button>
      </div>

      <button
        onClick={() => alert(\`Bonjour \${name} ! Tu as cliqué \${count} fois.\`)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded w-full"
      >
        Saluer
      </button>
    </div>
  );
}`
  }
];

export default steps;