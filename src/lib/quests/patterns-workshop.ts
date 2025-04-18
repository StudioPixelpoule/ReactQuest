import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🏗️ Introduction — Étape 1",
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
- \`UserCard\` : composant de présentation qui affiche les données
- \`UserCardContainer\` : composant conteneur qui gère les données
    `,
    initialCode: `// Complète ces deux composants :
// UserCard : reçoit name et job en props
// UserCardContainer : contient les valeurs

interface UserCardProps {
  name: string;
  job: string;
}

function UserCard({ name, job }: UserCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{/* name ici */}</h2>
      <p className="text-muted-foreground">{/* job ici */}</p>
    </div>
  );
}

function UserCardContainer() {
  // Données ici
  return (
    <div>
      {/* Affiche UserCard avec les bonnes props */}
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("UserCard") &&
             code.includes("name") &&
             code.includes("job") &&
             code.includes("Développeur");
    },
    hint: "Vérifie que tu as :\n- Affiché name et job dans UserCard\n- Créé des données dans UserCardContainer\n- Passé les props correctement",
    successMessage: "Bravo ! Tu as créé ton premier duo conteneur/présentation.\nC'est une base solide pour organiser ton code !",
    solution: `interface UserCardProps {
  name: string;
  job: string;
}

function UserCard({ name, job }: UserCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-muted-foreground">{job}</p>
    </div>
  );
}

function UserCardContainer() {
  const data = {
    name: "Alice",
    job: "Développeur React"
  };
  
  return (
    <div>
      <UserCard name={data.name} job={data.job} />
    </div>
  );
}`
  }
];

export default steps;