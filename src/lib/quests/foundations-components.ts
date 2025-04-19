import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🧱 Introduction — Étape 1",
    content: `
### Bienvenue à l'Académie des Composants !

Tu es sur le point de créer ton tout premier **composant React**.  
Un composant, c'est comme un **bloc de construction LEGO** que tu peux réutiliser partout dans ton interface.

Dans cette première étape, ton objectif est simple mais fondamental :  
🛠️ **Créer un composant \`Welcome\`** qui affiche le message **"Bonjour ReactQuest !"** dans une balise \`<div>\`.

---

> 💡 Conseil de React-Bot :  
> Un composant est une fonction qui **retourne du JSX** (le langage entre HTML et JS utilisé par React).
    `,
    initialCode: `function Welcome() {
  return (
    <div>
      {/* Commence à coder ici */}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes('function Welcome') &&
             code.includes('<div>') &&
             code.includes('Bonjour ReactQuest');
    },
    hint: "As-tu bien :\n- appelé ta fonction Welcome ?\n- utilisé une balise <div> ?\n- inséré exactement \"Bonjour ReactQuest\" (casse incluse) ?",
    successMessage: "Bravo, tu viens de créer ton tout premier composant React !\nC'est la première pierre de TechTopia que tu viens de poser.",
    solution: `function Welcome() {
  return (
    <div>
      Bonjour ReactQuest !
    </div>
  );
}`
  },
  {
    title: "🔹 Étape 2 — Les Props",
    content: `
### Les Props (paramètres d'un composant)

Maintenant que tu sais créer un composant, on va le rendre **intelligent** et **personnalisable**.

Un composant React peut recevoir des **props**, c'est-à-dire des **informations qu'on lui transmet depuis l'extérieur**.

Tu vas créer un composant \`Greeting\` qui **reçoit un prénom** et l'affiche dans une phrase comme :  
👉 "Bonjour, Kylian !"

---

> 💡 Conseil de React-Bot :  
> En TypeScript, on définit les props avec une \`interface\`. Ensuite, on les extrait dans les **accolades** de la fonction :
> \`\`\`ts
> interface Props {
>   name: string;
> }
> function Greeting({ name }: Props) { ... }
> \`\`\`
    `,
    initialCode: `// 1. Crée une interface GreetingProps avec une prop "name"
// 2. Utilise-la pour typer les props du composant
// 3. Affiche "Bonjour, [name] !" dans un <p>

function Greeting( ) {
  return (
    <p>
      {/* Affiche ici le message avec la prop name */}
    </p>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("interface GreetingProps") &&
             code.includes("name: string") &&
             code.includes("function Greeting({ name }: GreetingProps)") &&
             code.includes("Bonjour") &&
             code.includes("{name}");
    },
    hint: "Vérifie bien :\n- Que tu as créé une interface GreetingProps\n- Que tu utilises { name } dans la fonction et dans le JSX\n- Que tu n'as pas oublié les accolades autour de name dans l'affichage",
    successMessage: "Bien joué !\nTu viens d'écrire ton premier composant typé. Il est maintenant plus flexible et plus sûr, comme un pro.",
    solution: `interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return (
    <p>
      Bonjour, {name} !
    </p>
  );
}`
  },
  {
    title: "🔸 Étape 3 — Props Optionnelles",
    content: `
### Flexibilité avec les props optionnelles

Tu sais maintenant transmettre des données à un composant. Mais… et si on ne t'en donnait **qu'une partie** ?

Bienvenue dans le monde des **props optionnelles** !  
Tu vas maintenant enrichir ton composant \`Greeting\` pour qu'il accepte un **titre optionnel**, comme :

> "👑 Bonjour, Dr Kylian !"  
> ou simplement :  
> "👋 Bonjour, Kylian !" si aucun titre n'est fourni.

---

> 💡 Conseil de React-Bot :  
> - Une prop optionnelle se déclare avec \`?\` dans l'interface :  
>   \`title?: string\`
> - Tu peux afficher une valeur par défaut avec une **condition ternaire** :  
>   \`{title ? title : "Visiteur"}\`
    `,
    initialCode: `// Ajoute une prop "title" optionnelle à l'interface
// Affiche "Bonjour, [title] [name] !" si title est présent,
// sinon "Bonjour, Visiteur [name] !"

interface GreetingProps {
  name: string;
  // ...
}

function Greeting({ name, title }: GreetingProps) {
  return (
    <p>
      {/* Ton message conditionnel ici */}
    </p>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("title?: string") &&
             code.includes("{title ?") &&
             code.includes("Visiteur") &&
             code.includes("name");
    },
    hint: "N'oublie pas :\n- De déclarer title? comme optionnel\n- D'utiliser une condition ternaire\n- D'afficher le titre s'il existe\n- D'afficher 'Visiteur' sinon",
    successMessage: "Excellent ! Tu maîtrises maintenant les props optionnelles.",
    solution: `interface GreetingProps {
  name: string;
  title?: string;
}

function Greeting({ name, title }: GreetingProps) {
  return (
    <p>
      Bonjour, {title ? title : "Visiteur"} {name} !
    </p>
  );
}`
  },
  {
    title: "🎓 Mini-Projet Final — TechCard",
    content: `
### Le défi final : TechCard

C'est l'heure de mettre en pratique tout ce que tu as appris !

Tu vas créer un composant \`TechCard\` qui affiche une carte de technologie avec :
- Son nom
- Une description
- Un niveau de difficulté (de 1 à 5 étoiles ⭐)

Ce projet utilise les trois notions vues précédemment :
- Création de composant
- Props typées
- Rendu conditionnel

#### Exemple d'utilisation :
\`\`\`tsx
<TechCard
  name="React"
  description="Une bibliothèque JavaScript pour créer des interfaces"
  difficulty={4}
/>
\`\`\`

> 💡 Astuce :  
> Pour afficher les étoiles, utilise \`"⭐".repeat(difficulty)\`
    `,
    initialCode: `// Complète ce composant pour qu'il affiche :
// - un nom dans un <h3>
// - une description dans un <p>
// - un niveau de difficulté avec des étoiles (1 à 5)

interface TechCardProps {
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

function TechCard({ name, description, difficulty }: TechCardProps) {
  return (
    <div>
      {/* Ton code ici */}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("function TechCard") &&
             code.includes("name") &&
             code.includes("description") &&
             code.includes("difficulty") &&
             (code.includes("⭐") || code.includes(".repeat("));
    },
    hint: "N'oublie pas :\n- D'utiliser <h3> pour le nom\n- D'utiliser <p> pour la description\n- D'utiliser .repeat() pour les étoiles\n- De typer correctement difficulty (1 | 2 | 3 | 4 | 5)",
    successMessage: "🎉 Félicitations !\nTu as créé ton premier composant réutilisable complet.\nTu as maintenant toutes les bases pour créer des interfaces React !",
    solution: `interface TechCardProps {
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

function TechCard({ name, description, difficulty }: TechCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="text-yellow-500">
        {"⭐".repeat(difficulty)}
      </div>
    </div>
  );
}`
  }
];

export default steps;