import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("ProfileCard") &&
             code.includes("name") &&
             code.includes("job") &&
             code.includes("Développeuse React") &&
             code.includes("ProfileContainer") &&
             code.includes("ProfileCardProps");
    },
    hint: "Vérifie que :\n- ProfileCard accepte name et job en props\n- ProfileContainer définit les données\n- ProfileContainer utilise ProfileCard avec les bonnes props",
    successMessage: "Bravo ! Tu as créé ton premier duo conteneur/présentation.\nC'est une base solide pour organiser ton code !",
    solution: `interface ProfileCardProps {
  name: string;
  job: string;
}

function ProfileCard({ name, job }: ProfileCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-muted-foreground">{job}</p>
    </div>
  );
}

function ProfileContainer() {
  const data = {
    name: "Alice",
    job: "Développeuse React"
  };
  
  return (
    <div>
      <ProfileCard name={data.name} job={data.job} />
    </div>
  );
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("children: React.ReactNode") &&
             code.includes("function Card") &&
             code.includes("className") &&
             code.includes("{children}");
    },
    hint: "N'oublie pas :\n- De typer children avec React.ReactNode\n- D'ajouter des styles à la div conteneur\n- D'afficher children à l'intérieur",
    successMessage: "Excellent ! Tu maîtrises maintenant la composition en React.\nC'est plus flexible que l'héritage !",
    solution: `interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Dashboard</h2>
      <p>Bienvenue !</p>
    </Card>
  );
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("onChange") &&
             code.includes("setValue") &&
             code.includes("value") &&
             code.includes("InputField") &&
             code.includes("useState<string>");
    },
    hint: "Vérifie que :\n- FormContainer a l'état et la fonction setValue\n- InputField reçoit onChange en prop\n- InputField appelle onChange avec la nouvelle valeur",
    successMessage: "Super ! Tu sais maintenant faire communiquer tes composants efficacement.",
    solution: `interface InputFieldProps {
  onChange: (value: string) => void;
}

function InputField({ onChange }: InputFieldProps) {
  return (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    />
  );
}

function FormContainer() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-4">
      <InputField onChange={setValue} />
      <p>Valeur saisie : {value}</p>
    </div>
  );
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("Card") &&
             code.includes("ProfileCard") &&
             code.includes("ProfileDashboard") &&
             code.includes("useState") &&
             code.includes("onChange") &&
             code.includes("children");
    },
    hint: "N'oublie pas :\n- Card doit être générique avec children\n- ProfileCard ne doit avoir que des props\n- ProfileDashboard doit gérer l'état\n- L'input doit mettre à jour le nom",
    successMessage: "🎉 Félicitations ! Tu as créé une application bien structurée\nqui utilise les meilleurs patterns React !",
    solution: `interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      {children}
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  job: string;
}

function ProfileCard({ name, job }: ProfileCardProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-muted-foreground">{job}</p>
    </div>
  );
}

function ProfileDashboard() {
  const [name, setName] = useState("Alice");
  const job = "Développeuse React";

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <ProfileCard name={name} job={job} />
      </Card>

      <Card>
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Modifier le nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </Card>
    </div>
  );
}`
  }
];

export default steps;