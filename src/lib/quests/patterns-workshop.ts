import { QuestStep } from '@/types/quest';

export const patternsQuest: QuestStep[] = [
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
    validate: (code: string) =>
      code.includes("UserCard") &&
      code.includes("name") &&
      code.includes("job") &&
      code.includes("Développeur"),
    hint: "Vérifie que tu as :\n- Affiché name et job dans UserCard\n- Créé des données dans UserCardContainer\n- Passé les props correctement",
    successMessage: "Bravo ! Tu as créé ton premier duo conteneur/présentation.\nC'est une base solide pour organiser ton code !"
  },
  {
    title: "🔸 Étape 2 — Composition avec children",
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
    initialCode: `interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-card">
      {/* Contenu ici */}
    </div>
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
    validate: (code: string) =>
      code.includes("children") &&
      code.includes("React.ReactNode") &&
      code.includes("Card"),
    hint: "N'oublie pas :\n- De typer children avec React.ReactNode\n- D'afficher children dans le JSX\n- D'ajouter les styles à la div",
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
- Un composant \`NameInput\` qui gère la saisie
- Un composant parent qui affiche la valeur saisie

C'est le pattern "lifting state up" :
- L'état est dans le parent
- L'enfant notifie les changements via une prop
    `,
    initialCode: `interface NameInputProps {
  onNameChange: (value: string) => void;
}

function NameInput({ onNameChange }: NameInputProps) {
  return (
    <input
      type="text"
      className="border p-2 rounded"
      onChange={(e) => onNameChange(e.target.value)}
      placeholder="Entre ton nom"
    />
  );
}

function FormContainer() {
  const [name, setName] = useState("");

  return (
    <div className="space-y-4">
      <NameInput onNameChange={setName} />
      <p>Bonjour {name}</p>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("onNameChange") &&
      code.includes("setName") &&
      code.includes("NameInput") &&
      code.includes("Bonjour"),
    hint: "Vérifie que tu as :\n- Typé la prop onNameChange\n- Utilisé useState dans le parent\n- Passé setName comme callback\n- Affiché la valeur de name",
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
    initialCode: `interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-card">
      {children}
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  role: string;
}

function ProfileCard({ name, role }: ProfileCardProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-muted-foreground">{role}</p>
    </div>
  );
}

function ProfileDashboard() {
  // État et logique ici

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Ton nom"
      />
      <Card>
        <ProfileCard name="Alex" role="Designer UX" />
      </Card>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("ProfileCard") &&
      code.includes("Card") &&
      code.includes("useState") &&
      code.includes("onChange"),
    hint: "N'oublie pas :\n- D'ajouter un état pour le nom\n- De lier l'input à l'état\n- De passer le nom dynamique à ProfileCard\n- D'utiliser Card pour le layout",
    successMessage: "🎉 Félicitations ! Tu as créé une application bien structurée\nqui utilise les meilleurs patterns React !"
  }
];