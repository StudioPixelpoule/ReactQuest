import { QuestStep } from '@/types/quest';

export const questContent: Record<string, QuestStep[]> = {
  'foundations-components': [
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
      validate: (code: string) => {
        return code.includes('function Welcome') &&
               code.includes('<div>') &&
               code.includes('Bonjour ReactQuest');
      },
      hint: "As-tu bien :\n- appelé ta fonction Welcome ?\n- utilisé une balise <div> ?\n- inséré exactement \"Bonjour ReactQuest\" (casse incluse) ?",
      successMessage: "Bravo, tu viens de créer ton tout premier composant React !\nC'est la première pierre de TechTopia que tu viens de poser."
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
      validate: (code: string) => {
        return code.includes("interface GreetingProps") &&
               code.includes("name: string") &&
               code.includes("function Greeting({ name }: GreetingProps)") &&
               code.includes("Bonjour") &&
               code.includes("{name}");
      },
      hint: "Vérifie bien :\n- Que tu as créé une interface GreetingProps\n- Que tu utilises { name } dans la fonction et dans le JSX\n- Que tu n'as pas oublié les accolades autour de name dans l'affichage",
      successMessage: "Bien joué !\nTu viens d'écrire ton premier composant typé. Il est maintenant plus flexible et plus sûr, comme un pro."
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
      validate: (code: string) => {
        return code.includes("title?: string") &&
               code.includes("{title ?") &&
               code.includes("Visiteur") &&
               code.includes("name");
      },
      hint: "Vérifie bien :\n- Que tu as bien écrit title?: string dans l'interface\n- Que tu affiches une alternative quand title est absent (\"Visiteur\")\n- Que name reste toujours affiché, avec ou sans title",
      successMessage: "🎉 Tu l'as fait !\nTon composant est maintenant intelligent, souple, et robuste. Il s'adapte à chaque utilisateur."
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
      validate: (code: string) => {
        return code.includes("function TechCard") &&
               code.includes("name") &&
               code.includes("description") &&
               code.includes("difficulty") &&
               (code.includes("⭐") || code.includes(".repeat("));
      },
      hint: "N'oublie pas :\n- D'utiliser <h3> pour le nom\n- D'utiliser <p> pour la description\n- D'utiliser .repeat() pour les étoiles\n- De typer correctement difficulty (1 | 2 | 3 | 4 | 5)",
      successMessage: "🎉 Félicitations !\nTu as créé ton premier composant réutilisable complet.\nTu as maintenant toutes les bases pour créer des interfaces React !"
    }
  ],
  'foundations-state': [
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
      validate: (code: string) => {
        return code.includes("useState<number>(0)") &&
               code.includes("setCount") &&
               code.includes("count") &&
               code.includes("onClick");
      },
      hint: "Vérifie que tu as :\n- Importé useState de 'react'\n- Créé un état avec useState<number>(0)\n- Utilisé setCount dans le onClick du bouton\n- Affiché count dans le paragraphe",
      successMessage: "Bravo ! Tu viens de créer ton premier composant avec état.\nIl se souvient de chaque clic !"
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
      validate: (code: string) => {
        return code.includes("useState<number>") &&
               code.includes("useState<string>") &&
               code.includes("pair") &&
               code.includes("impair") &&
               code.includes("setCount") &&
               code.includes("setMessage");
      },
      hint: "N'oublie pas :\n- De créer deux états (count et message)\n- De mettre à jour le message quand count change\n- D'utiliser % 2 === 0 pour vérifier si un nombre est pair",
      successMessage: "Super ! Tu sais maintenant gérer plusieurs états qui interagissent entre eux."
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
      validate: (code: string) => {
        return code.includes("value={name}") &&
               code.includes("onChange") &&
               code.includes("setName") &&
               code.includes("e.target.value");
      },
      hint: "Vérifie que tu as :\n- Lié value à l'état name\n- Utilisé onChange pour mettre à jour name\n- Affiché name dans le message de bienvenue",
      successMessage: "Parfait ! Tu maîtrises maintenant les composants contrôlés."
    },
    {
      title: "🎓 Mini-Projet Final — DashboardWidget",
      content: `
### Le Widget de Tableau de Bord

Pour ce projet final, tu vas créer un widget complet qui combine tout ce que tu as appris :
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
      validate: (code: string) => {
        return code.includes("useState<string>") &&
               code.includes("useState<number>") &&
               code.includes("alert") &&
               code.includes("onChange") &&
               code.includes("onClick") &&
               code.includes("Bonjour") &&
               code.includes("cliqué");
      },
      hint: "Vérifie que tu as :\n- Créé les deux états (name et count)\n- Un input contrôlé pour le nom\n- Un bouton pour incrémenter count\n- Un bouton qui déclenche l'alert avec le message formaté",
      successMessage: "🎉 Félicitations ! Tu as créé un widget interactif complet !\nTu maîtrises maintenant la gestion d'état en React."
    }
  ],
  'foundations-dashboard': [
    {
      title: "💥 Mini-Projet : Tableau de bord personnalisable",
      content: `
### Bienvenue au Mini-Projet Final !

Tu vas créer une interface qui regroupe plusieurs **widgets dynamiques**.
C'est l'occasion de mettre en pratique tout ce que tu as appris :
- Composants typés
- État local
- Props et composition

#### Objectif
Créer un tableau de bord avec 3 widgets interactifs :
- Un compteur cliquable
- Une horloge en temps réel
- Un widget météo avec props

> 💡 Conseil de React-Bot :  
> Commence par créer chaque widget séparément, puis assemble-les dans le Dashboard !
      `,
      initialCode: `// 1. CounterWidget : un compteur avec useState
interface CounterWidgetProps {}

function CounterWidget() {
  // État et logique du compteur ici
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Compteur</h3>
      {/* Ton code ici */}
    </div>
  );
}

// 2. ClockWidget : une horloge avec useEffect
interface ClockWidgetProps {}

function ClockWidget() {
  // État et logique de l'horloge ici
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Horloge</h3>
      {/* Ton code ici */}
    </div>
  );
}

// 3. WeatherWidget : un widget avec props
interface WeatherWidgetProps {
  city: string;
  temperature: number;
}

function WeatherWidget({ city, temperature }: WeatherWidgetProps) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Météo</h3>
      {/* Ton code ici */}
    </div>
  );
}

// 4. Dashboard : assemble les widgets
function Dashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {/* Place tes widgets ici */}
    </div>
  );
}`,
      validate: (code: string) => {
        return code.includes("CounterWidget") &&
               code.includes("ClockWidget") &&
               code.includes("WeatherWidget") &&
               code.includes("useState") &&
               code.includes("useEffect") &&
               code.includes("setInterval") &&
               code.includes("clearInterval") &&
               code.includes("temperature") &&
               code.includes("city");
      },
      hint: "Vérifie que tu as :\n- Un état count et un bouton dans CounterWidget\n- Un état time et un setInterval dans ClockWidget\n- Les props city et temperature dans WeatherWidget\n- Tous les widgets assemblés dans Dashboard",
      successMessage: "🎉 Bravo ! Tu as créé un tableau de bord complet avec des widgets dynamiques.\nTu maîtrises maintenant les fondamentaux de React !"
    }
  ],
  'effects-lifecycle': [
    {
      title: "🧪 Introduction — Étape 1",
      content: `
### Bienvenue au Laboratoire des Effets

Ici, tes composants apprennent à **réagir à leur environnement** :  
exécuter une action quand ils apparaissent, écouter des changements, ou se nettoyer avant de disparaître.

Tu vas maintenant apprendre à faire **quelque chose dès que le composant est monté**. Comme afficher un message, appeler une API, ou démarrer un chrono.

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
      validate: (code: string) => {
        return code.includes("useEffect") &&
               code.includes("console.log") &&
               code.includes("[]");
      },
      hint: "N'oublie pas :\n- D'utiliser useEffect\n- D'ajouter un console.log\n- De mettre un tableau de dépendances vide []",
      successMessage: "Bravo ! Tu viens d'exécuter ton premier effet.\nTon composant sait maintenant réagir à son cycle de vie !"
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
      validate: (code: string) => {
        return code.includes("useEffect") &&
               code.includes("count") &&
               code.includes("[count]") &&
               code.includes("console.log");
      },
      hint: "Vérifie que tu as :\n- Ajouté count dans les dépendances\n- Utilisé console.log dans l'effet\n- Affiché la valeur actuelle de count",
      successMessage: "Excellent ! Ton composant réagit maintenant aux changements d'état."
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
      validate: (code: string) => {
        return code.includes("clearInterval") &&
               code.includes("return () =>") &&
               code.includes("setInterval");
      },
      hint: "N'oublie pas :\n- De retourner une fonction de nettoyage\n- D'utiliser clearInterval\n- De passer l'ID de l'intervalle à clearInterval",
      successMessage: "Parfait ! Tu sais maintenant nettoyer tes effets.\nTes composants sont propres et efficaces !"
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
      validate: (code: string) => {
        return code.includes("useEffect") &&
               code.includes("setInterval") &&
               code.includes("clearInterval") &&
               code.includes("count") &&
               code.includes("return () =>");
      },
      hint: "Vérifie que tu as :\n- Un état count avec useState\n- Un setInterval dans useEffect\n- Un clearInterval dans la fonction de nettoyage\n- L'affichage du compteur dans le JSX",
      successMessage: "🎉 Félicitations ! Tu as créé un composant complet avec effet et nettoyage !\nTu maîtrises maintenant les effets de bord en React."
    }
  ],
  'effects-refs': [
    {
      title: "📚 Introduction — Étape 1",
      content: `
### Bienvenue dans la Bibliothèque des Refs

Ici, tes composants apprennent à **pointer** précisément vers des éléments HTML :  
un champ, un bouton, une vidéo…

Les refs sont comme des **marque-pages React** : elles permettent de manipuler un élément DOM de manière directe, sans le faire passer par un \`state\`.

> 💡 Conseil de React-Bot :  
> En TypeScript, tu peux typer une ref vers un input comme ceci :  
> \`useRef<HTMLInputElement | null>(null)\`
      `,
      initialCode: `import { useRef, useEffect } from "react";

function FocusInput() {
  const inputRef = useRef</* ... */>(null);

  useEffect(() => {
    // Donne le focus à l'input
  }, []);

  return <input ref={inputRef} type="text" />;
}`,
      validate: (code: string) => {
        return code.includes("useRef") &&
               code.includes("HTMLInputElement") &&
               code.includes("current") &&
               code.includes("focus");
      },
      hint: "Vérifie que tu as :\n- Typé la ref avec HTMLInputElement\n- Attaché la ref à l'input avec ref={inputRef}\n- Utilisé .current?.focus() dans l'effet",
      successMessage: "Bravo ! Tu sais maintenant créer et typer une ref.\nC'est la base pour manipuler le DOM en React !"
    },
    {
      title: "🔸 Étape 2 — Mesurer un élément",
      content: `
### Accéder au DOM pour mesurer

Les refs te permettent aussi de **mesurer** des éléments :
- Leur taille
- Leur position
- Leurs dimensions

C'est très utile pour :
- Créer des animations
- Positionner des tooltips
- Adapter l'interface

> 💡 Conseil de React-Bot :  
> La méthode \`getBoundingClientRect()\` donne toutes les mesures d'un élément :
> \`\`\`ts
> const { width, height, top, left } = element.getBoundingClientRect();
> \`\`\`
      `,
      initialCode: `function MeasureBox() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Affiche la largeur dans la console
  }, []);

  return (
    <div ref={boxRef} style={{ width: "80%", border: "1px solid black" }}>
      Je suis une boîte
    </div>
  );
}`,
      validate: (code: string) => {
        return code.includes("getBoundingClientRect") &&
               code.includes("console.log") &&
               code.includes("current");
      },
      hint: "N'oublie pas :\n- D'utiliser getBoundingClientRect()\n- De vérifier que current existe\n- D'afficher la width dans la console",
      successMessage: "Super ! Tu sais maintenant mesurer des éléments DOM.\nC'est très utile pour créer des interfaces dynamiques !"
    },
    {
      title: "🔹 Étape 3 — Animations avec Refs",
      content: `
### Refs et animations

Les refs sont parfaites pour gérer des **animations CSS** :
- Ajouter/retirer des classes
- Modifier des styles
- Déclencher des transitions

Tu vas créer une boîte qui :
- Rebondit quand on clique
- Utilise une classe CSS
- Gère l'animation via ref

> 💡 Conseil de React-Bot :  
> \`classList\` permet de manipuler les classes CSS :
> \`\`\`ts
> element.classList.add("bounce");
> setTimeout(() => element.classList.remove("bounce"), 1000);
> \`\`\`
      `,
      initialCode: `function AnimatedBox() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    // Ajoute une classe "bounce" à l'élément
  };

  return (
    <div>
      <div
        ref={boxRef}
        className="w-32 h-32 bg-blue-500 transition-all"
      ></div>
      <button onClick={handleClick}>Animer</button>
    </div>
  );
}`,
      validate: (code: string) => {
        return code.includes("classList") &&
               code.includes("add") &&
               code.includes("current") &&
               code.includes("onClick");
      },
      hint: "Vérifie que tu as :\n- Utilisé classList.add('bounce')\n- Vérifié que current existe\n- Retiré la classe après l'animation",
      successMessage: "Excellent ! Tu maîtrises maintenant les animations avec refs."
    },
    {
      title: "🎓 Mini-Projet Final — Formulaire Magique",
      content: `
### Le Formulaire Magique

Pour ce projet final, tu vas créer un formulaire inter

actif qui utilise les refs pour :
- Valider les champs
- Donner le focus automatiquement
- Afficher des messages d'erreur

Le formulaire doit :
1. Vérifier si le champ est vide
2. Passer en rouge si invalide
3. Donner le focus automatiquement
4. Afficher un message d'erreur

> 💡 Conseil de React-Bot :  
> Combine \`useState\` pour le message et \`useRef\` pour le focus :
> \`\`\`tsx
> const [error, setError] = useState("");
> const inputRef = useRef<HTMLInputElement>(null);
> \`\`\`
      `,
      initialCode: `function MagicForm() {
  // useState pour le champ et l'erreur
  // useRef pour l'input

  const handleSubmit = () => {
    // Vérifie si vide → focus + message
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="border rounded p-2"
      />
      <button
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Valider
      </button>
      {/* Affiche message si erreur */}
    </div>
  );
}`,
      validate: (code: string) => {
        return code.includes("useRef") &&
               code.includes("focus") &&
               code.includes("onClick") &&
               code.includes("useState") &&
               code.includes("error");
      },
      hint: "N'oublie pas :\n- Un état pour la valeur et l'erreur\n- Une ref pour l'input\n- La validation au submit\n- Le focus automatique si erreur",
      successMessage: "🎉 Félicitations ! Tu as créé un formulaire interactif complet !\nTu maîtrises maintenant les refs en React."
    }
  ],
  'patterns-workshop': [
    {
      title: "🔹 Étape 1 — Composants de présentation vs conteneurs",
      content: `
### Bienvenue à l'Atelier des Patterns !

Ici, les composants apprennent à **travailler ensemble intelligemment**.  
Certains **affichent**, d'autres **réfléchissent**.  
C'est le **duo Conteneur/Présentation** : une base solide pour organiser ton app.

> 💡 Conseil de React-Bot :  
> Le conteneur gère l'état et la logique.  
> Le composant de présentation **ne fait qu'afficher des props**.

#### Objectif
Créer deux composants qui travaillent ensemble :
- \`ProfileCard\` : composant de présentation qui affiche les données
- \`ProfileContainer\` : composant conteneur qui gère les données
      `,
      initialCode: `// Crée les deux composants :
// 1. ProfileCard (présentation)
// 2. ProfileContainer (conteneur)

interface ProfileCardProps {
  name: string;
  job: string;
}

// Composant de présentation
function ProfileCard() {
  // À compléter
}

// Composant conteneur
function ProfileContainer() {
  // À compléter
}`,
      validate: (code: string) => {
        return code.includes("ProfileCard") &&
               code.includes("name") &&
               code.includes("job") &&
               code.includes("Développeuse React") &&
               code.includes("ProfileContainer") &&
               code.includes("ProfileCardProps");
      },
      hint: "Vérifie que :\n- ProfileCard accepte name et job en props\n- ProfileContainer définit les données\n- ProfileContainer utilise ProfileCard avec les bonnes props",
      successMessage: "Bravo ! Tu as créé ton premier duo conteneur/présentation.\nC'est une base solide pour organiser ton code !"
    },
    {
      title: "🔸 Étape 2 — Composition vs héritage",
      content: `
### La Composition en React

React privilégie la **composition** à l'héritage.
Au lieu d'étendre des classes, on **compose** des composants ensemble.

Le pattern le plus courant utilise la prop \`children\` :
- Un composant parent définit la structure
- Les enfants apportent le contenu

#### Objectif
Créer un composant \`Card\` réutilisable qui :
- Accepte n'importe quel contenu via children
- Applique un style commun à ce contenu
      `,
      initialCode: `// Crée un composant Card qui accepte children
// et applique un style commun

function Card() {
  return (
    // Ajoute le conteneur avec le style
    // et affiche children
  );
}

// Exemple d'utilisation :
function App() {
  return (
    <Card>
      <h2>Dashboard</h2>
      <p>Bienvenue !</p>
    </Card>
  );
}`,
      validate: (code: string) => {
        return code.includes("children: React.ReactNode") &&
               code.includes("function Card") &&
               code.includes("className") &&
               code.includes("{children}");
      },
      hint: "N'oublie pas :\n- De typer children avec React.ReactNode\n- D'ajouter des styles à la div conteneur\n- D'afficher children à l'intérieur",
      successMessage: "Excellent ! Tu maîtrises maintenant la composition en React.\nC'est plus flexible que l'héritage !"
    },
    {
      title: "🔹 Étape 3 — Lifting State Up",
      content: `
### Remonter l'État

Parfois, plusieurs composants doivent partager un même état.
La solution ? **Remonter l'état** dans leur plus proche ancêtre commun.

#### Objectif
Créer un formulaire avec :
- Un composant \`InputField\` qui gère la saisie
- Un composant parent qui affiche la valeur saisie

C'est le pattern "lifting state up" :
- L'état est dans le parent
- L'enfant notifie les changements via une prop
      `,
      initialCode: `// Crée les composants InputField et FormContainer
// L'état doit être dans FormContainer

interface InputFieldProps {
  onChange: (value: string) => void;
}

function InputField() {
  // À compléter
}

function FormContainer() {
  // À compléter
}`,
      validate: (code: string) => {
        return code.includes("onChange") &&
               code.includes("setValue") &&
               code.includes("value") &&
               code.includes("InputField") &&
               code.includes("useState<string>");
      },
      hint: "Vérifie que :\n- FormContainer a l'état et la fonction setValue\n- InputField reçoit onChange en prop\n- InputField appelle onChange avec la nouvelle valeur",
      successMessage: "Super ! Tu sais maintenant faire communiquer tes composants efficacement."
    },
    {
      title: "🎓 Mini-Projet Final — ProfileDashboard",
      content: `
### Le Dashboard de Profil

Pour ce projet final, tu vas créer une mini-application qui combine tous les patterns vus :
- Séparation présentation/conteneur
- Composition avec children
- État remonté

#### Objectif
Créer un dashboard avec :
1. Un composant générique \`Card\`
2. Un composant de présentation \`ProfileCard\`
3. Un composant conteneur \`ProfileDashboard\`
4. Un champ pour modifier le nom en direct

Le tout doit former une interface cohérente où :
- Le nom se met à jour en temps réel
- Les composants sont bien organisés
- Le code est propre et maintenable
      `,
      initialCode: `// Crée les composants nécessaires pour le dashboard

// 1. Card (composant générique)
interface CardProps {
  children: React.ReactNode;
}

// 2. ProfileCard (présentation)
interface ProfileCardProps {
  name: string;
  job: string;
}

// 3. ProfileDashboard (conteneur)
function ProfileDashboard() {
  // Gère l'état et la logique ici
}`,
      validate: (code: string) => {
        return code.includes("Card") &&
               code.includes("ProfileCard") &&
               code.includes("ProfileDashboard") &&
               code.includes("useState") &&
               code.includes("onChange") &&
               code.includes("children");
      },
      hint: "N'oublie pas :\n- Card doit être générique avec children\n- ProfileCard ne doit avoir que des props\n- ProfileDashboard doit gérer l'état\n- L'input doit mettre à jour le nom",
      successMessage: "🎉 Félicitations ! Tu as créé une application bien structurée\nqui utilise les meilleurs patterns React !"
    }
  ]
};