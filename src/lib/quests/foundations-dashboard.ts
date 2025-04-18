import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
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
    validate: (code: string | undefined) => {
      if (!code) return false;
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
    successMessage: "🎉 Bravo ! Tu as créé un tableau de bord complet avec des widgets dynamiques.\nTu maîtrises maintenant les fondamentaux de React !",
    solution: `// 1. CounterWidget
interface CounterWidgetProps {}

function CounterWidget() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Compteur</h3>
      <div className="text-center">
        <p className="text-2xl mb-2">{count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Incrémenter
        </button>
      </div>
    </div>
  );
}

// 2. ClockWidget
interface ClockWidgetProps {}

function ClockWidget() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Horloge</h3>
      <p className="text-2xl text-center">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

// 3. WeatherWidget
interface WeatherWidgetProps {
  city: string;
  temperature: number;
}

function WeatherWidget({ city, temperature }: WeatherWidgetProps) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold mb-2">Météo</h3>
      <div className="text-center">
        <p className="text-lg mb-1">{city}</p>
        <p className="text-3xl">{temperature}°C</p>
      </div>
    </div>
  );
}

// 4. Dashboard
function Dashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <CounterWidget />
      <ClockWidget />
      <WeatherWidget city="Paris" temperature={22} />
    </div>
  );
}`
  }
];

export default steps;