import { QuestStep } from '@/types/quest';

export const hooksQuest: QuestStep[] = [
  {
    title: "🧪 Introduction — Étape 1",
    content: `
### Bienvenue au Centre de Contrôle des Hooks !

Ici, tu vas apprendre à créer tes propres hooks pour :
- Factoriser du code
- Réutiliser de la logique
- Clarifier tes composants

Tu commenceras par créer un hook \`useCounter\` qui encapsule la logique d'un compteur.

> 💡 Conseil de React-Bot :  
> Un hook personnalisé est une fonction qui :
> - Commence par "use"
> - Utilise d'autres hooks React
> - Retourne des valeurs/fonctions utiles
    `,
    initialCode: `// Crée ici un hook useCounter
// Il doit retourner le count et une fonction pour incrémenter

import { useState } from 'react';

export function useCounter() {
  // État du compteur
  
  // Fonction d'incrémentation
  
  return {
    count: 0,
    increment: () => {}
  };
}

// Exemple d'utilisation :
function Counter() {
  const { count, increment } = useCounter();
  
  return (
    <div className="space-y-2">
      <p>Valeur : {count}</p>
      <button 
        onClick={increment}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        +1
      </button>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useState") &&
      code.includes("useCounter") &&
      code.includes("return") &&
      code.includes("increment"),
    hint: "Vérifie que tu as :\n- Un état count avec useState\n- Une fonction increment qui utilise setCount\n- Un retour avec count et increment",
    successMessage: "Bravo ! Tu viens de créer ton premier hook personnalisé.\nIl encapsule parfaitement la logique du compteur !"
  },
  {
    title: "🔸 Étape 2 — Hook avec effet",
    content: `
### Hook avec effet intégré

Un hook peut aussi contenir des effets !
C'est très utile pour :
- Synchroniser des données
- Gérer des timers
- Écouter des événements

Tu vas créer un hook \`useClock\` qui :
- Maintient l'heure à jour
- Met à jour l'affichage chaque seconde
- Nettoie proprement l'intervalle
    `,
    initialCode: `import { useState, useEffect } from 'react';

export function useClock() {
  // État pour l'heure
  
  // Effet pour mettre à jour l'heure
  
  return "00:00:00"; // Remplace par l'heure réelle
}

// Exemple d'utilisation :
function Clock() {
  const time = useClock();
  
  return (
    <div className="text-2xl font-mono">
      {time}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useEffect") &&
      code.includes("setInterval") &&
      code.includes("useClock") &&
      code.includes("toLocaleTimeString"),
    hint: "N'oublie pas :\n- Un état pour stocker l'heure\n- Un setInterval dans useEffect\n- Le nettoyage avec clearInterval\n- Le format de l'heure avec toLocaleTimeString",
    successMessage: "Super ! Tu sais maintenant créer des hooks avec des effets.\nTon hook gère parfaitement le cycle de vie !"
  },
  {
    title: "🔹 Étape 3 — Hook paramétrable",
    content: `
### Hook avec paramètres

Les hooks peuvent accepter des paramètres pour être plus flexibles.
C'est comme des props, mais pour les hooks !

Tu vas créer un hook \`useToggle\` qui :
- Accepte une valeur initiale
- Retourne la valeur et une fonction pour l'inverser
- Est typé correctement avec TypeScript
    `,
    initialCode: `import { useState } from 'react';

export function useToggle(initialValue: boolean): [boolean, () => void] {
  // État et fonction toggle
  
  return [false, () => {}]; // À remplacer
}

// Exemple d'utilisation :
function ToggleBox() {
  const [visible, toggle] = useToggle(true);
  
  return (
    <div className="space-y-2">
      <button 
        onClick={toggle}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {visible ? 'Cacher' : 'Afficher'}
      </button>
      
      {visible && (
        <div className="p-4 border rounded">
          Contenu visible
        </div>
      )}
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useState") &&
      code.includes("useToggle") &&
      code.includes("return") &&
      code.includes("toggle"),
    hint: "Vérifie que tu as :\n- Un état initialisé avec initialValue\n- Une fonction toggle qui inverse l'état\n- Le bon typage du retour [boolean, () => void]",
    successMessage: "Excellent ! Tu sais maintenant créer des hooks paramétrables et bien typés."
  },
  {
    title: "🎓 Mini-Projet Final — TaskTracker Refactor",
    content: `
### Refactoriser le TaskTracker

Pour ce projet final, tu vas reprendre l'application de suivi de tâches et la rendre plus élégante en :
- Extrayant toute la logique dans un hook personnalisé
- Rendant le composant principal plus simple
- Ajoutant du typage strict

Le hook \`useTasks\` doit gérer :
- L'état des tâches
- La persistance dans localStorage
- Les fonctions d'ajout/suppression

> 💡 Conseil de React-Bot :  
> Sépare bien les responsabilités :
> - Le hook gère la logique et les données
> - Le composant gère l'affichage et les interactions
    `,
    initialCode: `import { useState, useEffect } from 'react';

interface Task {
  id: number;
  label: string;
}

// 1. Crée le hook useTasks
export function useTasks() {
  // État des tâches
  const [tasks, setTasks] = useState<Task[]>([]);

  // Charge les tâches au montage
  useEffect(() => {
    // À compléter
  }, []);

  // Sauvegarde les tâches
  useEffect(() => {
    // À compléter
  }, [tasks]);

  // Fonctions d'ajout et suppression
  const addTask = (label: string) => {
    // À compléter
  };

  const removeTask = (id: number) => {
    // À compléter
  };

  return { tasks, addTask, removeTask };
}

// 2. Utilise le hook dans le composant
function RefactoredTaskTracker() {
  const { tasks, addTask, removeTask } = useTasks();
  const [input, setInput] = useState('');

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Mes tâches</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => {
            if (input.trim() !== '') {
              addTask(input);
              setInput('');
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Ajouter
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border rounded">
            <span>{task.label}</span>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("useTasks") &&
      code.includes("localStorage") &&
      code.includes("useEffect") &&
      code.includes("addTask") &&
      code.includes("removeTask") &&
      code.includes("Task[]"),
    hint: "N'oublie pas :\n- De charger les tâches depuis localStorage au montage\n- De sauvegarder les tâches quand elles changent\n- D'implémenter addTask avec un nouvel id unique\n- D'implémenter removeTask avec filter",
    successMessage: "🎉 Félicitations ! Tu as créé un hook réutilisable et bien organisé.\nTon code est maintenant plus maintenable et plus professionnel !"
  }
];