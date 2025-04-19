import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Créer un formulaire contrôlé",
    content: `
### Bienvenue à l'Académie des Formulaires !

Ici, tu vas apprendre à **créer des formulaires React** :
- Contrôlés avec useState
- Validés avec TypeScript
- Sécurisés et robustes

Tu commenceras par créer un simple champ contrôlé.

> 💡 Conseil de React-Bot :  
> Un champ contrôlé utilise \`value\` et \`onChange\` pour synchroniser son état avec React.
    `,
    initialCode: `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nom soumis :', name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nom
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Entre ton nom"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Envoyer
      </button>
    </form>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useState") &&
             code.includes("onChange") &&
             code.includes("handleSubmit") &&
             code.includes("form");
    },
    hint: "N'oublie pas :\n- D'utiliser useState pour le nom\n- D'ajouter onChange sur l'input\n- De créer handleSubmit\n- D'empêcher le comportement par défaut du form",
    successMessage: "Bravo ! Tu as créé ton premier formulaire contrôlé.\nC'est la base pour gérer les données utilisateur !",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔸 Étape 2 — Validation manuelle",
    content: `
### Valider les données

Un formulaire doit toujours vérifier ses données :
- Champs obligatoires
- Formats valides
- Messages d'erreur clairs

Tu vas ajouter une validation simple.

> 💡 Conseil de React-Bot :  
> Stocke les erreurs dans un état séparé :
> \`const [error, setError] = useState<string | null>(null);\`
    `,
    initialCode: `import { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("L'email est requis");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Format d'email invalide");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email valide :', email);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // Reset error on change
          }}
          className={\`w-full p-2 border rounded transition-colors \${
            error ? 'border-destructive' : ''
          }\`}
          placeholder="ton@email.com"
          disabled={isSubmitting}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("validateEmail") &&
             code.includes("setError") &&
             code.includes("trim()") &&
             code.includes("@");
    },
    hint: "Vérifie que tu as :\n- Créé la fonction validateEmail\n- Géré le cas du champ vide\n- Affiché les messages d'erreur\n- Réinitialisé l'erreur quand l'utilisateur tape",
    successMessage: "Super ! Tu sais maintenant valider les données d'un formulaire.",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔹 Étape 3 — Formulaire multi-champs",
    content: `
### Gérer plusieurs champs

Les formulaires ont souvent plusieurs champs :
- Nom, email, mot de passe...
- États multiples
- Validation globale

Tu vas créer un formulaire de connexion complet.

> 💡 Conseil de React-Bot :  
> Utilise une interface pour typer les données du formulaire :
> \`\`\`ts
> interface LoginForm {
>   email: string;
>   password: string;
> }
> \`\`\`
    `,
    initialCode: `import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginForm() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Reset error for this field
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.email) {
      newErrors.email = "L'email est requis";
    } else if (!form.email.includes('@')) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!form.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (form.password.length < 6) {
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Formulaire valide !', form);
      setForm({ email: '', password: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={\`w-full p-2 border rounded transition-colors \${
            errors.email ? 'border-destructive' : ''
          }\`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={\`w-full p-2 border rounded transition-colors \${
            errors.password ? 'border-destructive' : ''
          }\`}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("LoginForm") &&
             code.includes("handleChange") &&
             code.includes("validate") &&
             code.includes("errors");
    },
    hint: "Vérifie que tu as :\n- Créé les interfaces pour le form et les erreurs\n- Implémenté handleChange pour tous les champs\n- Validé tous les champs\n- Affiché les erreurs sous chaque champ",
    successMessage: "Excellent ! Tu maîtrises maintenant les formulaires multi-champs.",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;