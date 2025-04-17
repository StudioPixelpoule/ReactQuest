import { QuestStep } from '@/types/quest';

export const taskTrackerQuest: QuestStep[] = [
  {
    title: "📝 Mini-Projet Final — TaskTracker",
    content: `
### L'Application de Suivi de Tâches

Pour ce projet final, tu vas créer une application complète qui combine tout ce que tu as appris :
- \`useState\` pour gérer les tâches
- \`useEffect\` pour la persistance
- \`useRef\` pour le focus automatique

L'application doit :
1. Permettre d'ajouter des tâches
2. Sauvegarder dans localStorage
3. Recharger au démarrage
4. Focus automatique sur l'input

> 💡 Conseil de React-Bot :  
> Utilise \`localStorage\` pour sauvegarder les tâches :
> \`\`\`ts
> localStorage.setItem('tasks', JSON.stringify(tasks));
> const saved = localStorage.getItem('tasks');
> \`\`\`
    `,
    initialCode: `import { useState, useEffect, useRef } from 'react';

interface Task {
  id: number;
  label: string;
}

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');
  // Ajoute la ref pour l'input

  // Charger les tâches depuis localStorage au montage

  // Sauvegarder les tâches à chaque changement

  // Focus automatique sur le champ

  const addTask = () => {
    // Ajouter la tâche et réinitialiser l'input
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Suivi de tâches</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Nouvelle tâche"
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Ajouter
        </button>
      </div>
      <ul className="list-disc pl-5">
        {/* Affiche les tâches ici */}
      </ul>
    </div>
  );
}`,
    validate: (code: string) => {
      return code.includes("useEffect") &&
             code.includes("localStorage") &&
             code.includes("useRef") &&
             code.includes("focus") &&
             code.includes("setTasks") &&
             code.includes("map");
    },
    hint: "N'oublie pas :\n- De créer une ref pour l'input\n- D'utiliser localStorage.getItem au montage\n- D'utiliser localStorage.setItem quand tasks change\n- De donner le focus après l'ajout d'une tâche",
    successMessage: "🎉 Félicitations ! Tu as créé une vraie application qui persiste les données !\nTu maîtrises maintenant les effets et les refs en React."
  }
];