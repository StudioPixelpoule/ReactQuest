import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🧪 Introduction — Étape 1",
    content: `
### Bienvenue au Laboratoire des Effets !

Ici, tu vas apprendre à faire **quelque chose dès que le composant est monté**. Comme afficher un message, appeler une API, ou démarrer un chrono.

> 💡 Conseil de React-Bot :  
> \`useEffect(() => { ... }, [])\` s'exécute **une seule fois** à la création du composant.
    `,
    initialCode: `import { useEffect } from "react";

function HelloEffect() {
  useEffect(() => {
    // Affiche un message dans la console
  }, []);

  return <p>Composant monté.</p>;
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useEffect") &&
             code.includes("console.log") &&
             code.includes("[]");
    },
    hint: "N'oublie pas :\n- D'utiliser useEffect\n- D'ajouter un console.log\n- De mettre un tableau de dépendances vide []",
    successMessage: "Bravo ! Tu viens d'exécuter ton premier effet.\nTon composant sait maintenant réagir à son cycle de vie !",
    solution: `import { useEffect } from "react";

function HelloEffect() {
  useEffect(() => {
    console.log("Le composant est monté !");
  }, []);

  return <p>Composant monté.</p>;
}`
  },
  {
    title: "🔸 Étape 2 — Effet avec dépendances",
    content: `
### Réagir aux changements

Un effet peut aussi se déclencher quand une valeur change.
C'est très utile pour synchroniser ton interface avec des données.

Dans cette étape, tu vas créer un compteur qui :
- Affiche sa valeur
- Notifie dans la console à chaque changement

> 💡 Conseil de React-Bot :  
> Le tableau de dépendances de useEffect définit **quand** l'effet doit se déclencher :
> \`\`\`tsx
> useEffect(() => {
>   // Se déclenche quand count change
> }, [count]);
> \`\`\`
    `,
    initialCode: `import { useEffect, useState } from "react";

function CountEffect() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Affiche dans la console "Compteur : X" à chaque changement
  }, [count]);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useEffect") &&
             code.includes("count") &&
             code.includes("[count]") &&
             code.includes("console.log");
    },
    hint: "Vérifie que tu as :\n- Ajouté count dans les dépendances\n- Utilisé console.log dans l'effet\n- Affiché la valeur actuelle de count",
    successMessage: "Excellent ! Ton composant réagit maintenant aux changements d'état.",
    solution: `import { useEffect, useState } from "react";

function CountEffect() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Compteur :", count);
  }, [count]);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrémenter</button>
    </div>
  );
}`
  },
  {
    title: "🔹 Étape 3 — Nettoyage d'un effet",
    content: `
### Nettoyer les effets

Certains effets ont besoin d'être **nettoyés** :
- Quand le composant est démonté
- Avant que l'effet ne se relance

C'est le cas des :
- Timers et intervalles
- Écouteurs d'événements
- Connexions WebSocket
- etc.

> 💡 Conseil de React-Bot :  
> La fonction de nettoyage est retournée par l'effet :
> \`\`\`tsx
> useEffect(() => {
>   // Effet
>   return () => {
>     // Nettoyage
>   };
> }, []);
> \`\`\`
    `,
    initialCode: `import { useEffect } from "react";

function TimerEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("tic");
    }, 1000);

    // Nettoyage ici
  }, []);

  return <p>Le temps passe...</p>;
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("clearInterval") &&
             code.includes("return () =>") &&
             code.includes("setInterval");
    },
    hint: "N'oublie pas :\n- De retourner une fonction de nettoyage\n- D'utiliser clearInterval\n- De passer l'ID de l'intervalle à clearInterval",
    successMessage: "Parfait ! Tu sais maintenant nettoyer tes effets.\nTes composants sont propres et efficaces !",
    solution: `import { useEffect } from "react";

function TimerEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("tic");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Le temps passe...</p>;
}`
  },
  {
    title: "🎓 Mini-Projet Final — AutoCounter",
    content: `
### Le Compteur Automatique

Pour ce projet final, tu vas créer un composant qui combine tout ce que tu as appris :
- Un état pour le compteur
- Un effet pour l'incrémentation automatique
- Un nettoyage propre

Le composant doit :
1. Afficher un compteur
2. L'augmenter automatiquement chaque seconde
3. Se nettoyer proprement quand il est démonté

> 💡 Conseil de React-Bot :  
> Pense à utiliser \`setInterval\` dans l'effet et à le nettoyer avec \`clearInterval\` !
    `,
    initialCode: `import { useEffect, useState } from "react";

function AutoCounter() {
  // Crée l'état count
  // Utilise useEffect pour incrémenter automatiquement
  // Nettoie l'intervalle

  return <p>Le compteur est {/* ... */}</p>;
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useEffect") &&
             code.includes("setInterval") &&
             code.includes("clearInterval") &&
             code.includes("count") &&
             code.includes("return () =>");
    },
    hint: "Vérifie que tu as :\n- Un état count avec useState\n- Un setInterval dans useEffect\n- Un clearInterval dans la fonction de nettoyage\n- L'affichage du compteur dans le JSX",
    successMessage: "🎉 Félicitations ! Tu as créé un composant complet avec effet et nettoyage !\nTu maîtrises maintenant les effets de bord en React.",
    solution: `import { useEffect, useState } from "react";

function AutoCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Le compteur est {count}</p>;
}`
  }
];

export default steps;