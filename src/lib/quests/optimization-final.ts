import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "💥 Mini-Projet Final — Optimisation Complète",
    content: `
### L'Application Optimisée

Pour ce projet final, tu vas optimiser une application React complète en utilisant :
- useMemo pour les calculs lourds
- useCallback pour les fonctions
- React.memo pour les composants
- lazy et Suspense pour le code splitting
- TypeScript pour la sécurité

L'application doit être :
1. Rapide et fluide
2. Bien typée
3. Chargée intelligemment
4. Facilement maintenable

> 💡 Conseil de React-Bot :  
> Commence par identifier les parties qui peuvent bénéficier d'optimisations !
    `,
    initialCode: `import { useState, useMemo, useCallback, lazy, Suspense } from "react";

// Types
interface DataPoint {
  id: number;
  value: number;
  label: string;
}

interface ChartProps {
  data: DataPoint[];
  onPointClick: (id: number) => void;
}

// Composants lazy-loadés
const DataTable = lazy(() => import("./DataTable"));
const DataChart = lazy(() => import("./DataChart"));

// Composant de titre mémorisé
const Title = memo(function Title({ text }: { text: string }) {
  console.log("Rendu du titre");
  return (
    <h2 className="text-2xl font-bold mb-4">{text}</h2>
  );
});

// Composant de statistiques avec calculs lourds
function Stats({ data }: { data: DataPoint[] }) {
  const stats = useMemo(() => {
    console.log("Calcul des statistiques...");
    return {
      total: data.reduce((sum, point) => sum + point.value, 0),
      average: data.reduce((sum, point) => sum + point.value, 0) / data.length,
      max: Math.max(...data.map(point => point.value)),
      min: Math.min(...data.map(point => point.value))
    };
  }, [data]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 border rounded">
        <h3 className="font-medium">Total</h3>
        <p className="text-2xl">{stats.total}</p>
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-medium">Moyenne</h3>
        <p className="text-2xl">{stats.average.toFixed(2)}</p>
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-medium">Maximum</h3>
        <p className="text-2xl">{stats.max}</p>
      </div>
      <div className="p-4 border rounded">
        <h3 className="font-medium">Minimum</h3>
        <p className="text-2xl">{stats.min}</p>
      </div>
    </div>
  );
}

// Composant de filtres mémorisé
const Filters = memo(function Filters({
  onFilterChange
}: {
  onFilterChange: (min: number, max: number) => void;
}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleApply = useCallback(() => {
    onFilterChange(min, max);
  }, [min, max, onFilterChange]);

  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">
          Min
        </label>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="w-24 p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Max
        </label>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className="w-24 p-2 border rounded"
        />
      </div>
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Appliquer
      </button>
    </div>
  );
});

// Application principale
function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([
    { id: 1, value: 42, label: "A" },
    { id: 2, value: 73, label: "B" },
    { id: 3, value: 28, label: "C" },
    // ... plus de données
  ]);

  const [activeView, setActiveView] = useState<"table" | "chart">("table");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Fonction de filtre mémorisée
  const handleFilter = useCallback((min: number, max: number) => {
    setData(prevData => 
      prevData.map(point => ({
        ...point,
        value: Math.max(min, Math.min(max, point.value))
      }))
    );
  }, []);

  // Fonction de clic mémorisée
  const handlePointClick = useCallback((id: number) => {
    setSelectedPoint(id);
    console.log(\`Point \${id} sélectionné\`);
  }, []);

  // Données filtrées mémorisées
  const filteredData = useMemo(() => {
    if (!selectedPoint) return data;
    return data.filter(point => point.id === selectedPoint);
  }, [data, selectedPoint]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Title text="Dashboard de Données" />

      <div className="flex justify-between items-center">
        <Filters onFilterChange={handleFilter} />
        
        <div className="space-x-2">
          <button
            onClick={() => setActiveView("table")}
            className={\`px-4 py-2 rounded \${
              activeView === "table"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }\`}
          >
            Tableau
          </button>
          <button
            onClick={() => setActiveView("chart")}
            className={\`px-4 py-2 rounded \${
              activeView === "chart"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }\`}
          >
            Graphique
          </button>
        </div>
      </div>

      <Stats data={filteredData} />

      <Suspense
        fallback={
          <div className="p-8 border rounded animate-pulse">
            Chargement...
          </div>
        }
      >
        {activeView === "table" ? (
          <DataTable
            data={filteredData}
            onRowClick={handlePointClick}
          />
        ) : (
          <DataChart
            data={filteredData}
            onPointClick={handlePointClick}
          />
        )}
      </Suspense>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useMemo") &&
             code.includes("useCallback") &&
             code.includes("React.memo") &&
             code.includes("lazy") &&
             code.includes("Suspense") &&
             code.includes("TypeScript");
    },
    hint: "Vérifie que tu as :\n- Mémorisé les calculs lourds\n- Stabilisé les fonctions de callback\n- Utilisé React.memo pour les composants purs\n- Implémenté le lazy loading\n- Typé correctement les props",
    successMessage: "🎉 Félicitations ! Tu as créé une application React optimisée et performante.\nTu maîtrises maintenant toutes les techniques d'optimisation !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;