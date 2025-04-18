import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useRef") &&
             code.includes("HTMLInputElement") &&
             code.includes("current") &&
             code.includes("focus");
    },
    hint: "Vérifie que tu as :\n- Typé la ref avec HTMLInputElement\n- Attaché la ref à l'input avec ref={inputRef}\n- Utilisé .current?.focus() dans l'effet",
    successMessage: "Bravo ! Tu sais maintenant créer et typer une ref.\nC'est la base pour manipuler le DOM en React !",
    solution: `import { useRef, useEffect } from "react";

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("getBoundingClientRect") &&
             code.includes("console.log") &&
             code.includes("current");
    },
    hint: "N'oublie pas :\n- D'utiliser getBoundingClientRect()\n- De vérifier que current existe\n- D'afficher la width dans la console",
    successMessage: "Super ! Tu sais maintenant mesurer des éléments DOM.\nC'est très utile pour créer des interfaces dynamiques !",
    solution: `function MeasureBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      const { width } = boxRef.current.getBoundingClientRect();
      console.log("Largeur de la boîte :", width);
    }
  }, []);

  return (
    <div ref={boxRef} style={{ width: "80%", border: "1px solid black" }}>
      Je suis une boîte
    </div>
  );
}`
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("classList") &&
             code.includes("add") &&
             code.includes("current") &&
             code.includes("onClick");
    },
    hint: "Vérifie que tu as :\n- Utilisé classList.add('bounce')\n- Vérifié que current existe\n- Retiré la classe après l'animation",
    successMessage: "Excellent ! Tu maîtrises maintenant les animations avec refs.",
    solution: `function AnimatedBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (boxRef.current) {
      boxRef.current.classList.add("bounce");
      setTimeout(() => {
        boxRef.current?.classList.remove("bounce");
      }, 1000);
    }
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
}`
  },
  {
    title: "🎓 Mini-Projet Final — Formulaire Magique",
    content: `
### Le Formulaire Magique

Pour ce projet final, tu vas créer un formulaire interactif qui utilise les refs pour :
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
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useRef") &&
             code.includes("focus") &&
             code.includes("onClick") &&
             code.includes("useState") &&
             code.includes("error");
    },
    hint: "N'oublie pas :\n- Un état pour la valeur et l'erreur\n- Une ref pour l'input\n- La validation au submit\n- Le focus automatique si erreur",
    successMessage: "🎉 Félicitations ! Tu as créé un formulaire interactif complet !\nTu maîtrises maintenant les refs en React.",
    solution: `import { useState, useRef } from "react";

function MagicForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Le champ est requis");
      inputRef.current?.focus();
      return;
    }
    setError("");
    console.log("Valeur soumise :", value);
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={\`border rounded p-2 \${error ? 'border-destructive' : ''}\`}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Valider
      </button>
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
}`
  }
];

export default steps;