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
  // Add other steps for this quest...
];

export default steps;