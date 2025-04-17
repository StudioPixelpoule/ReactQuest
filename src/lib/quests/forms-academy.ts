import { QuestStep } from '@/types/quest';

export const formsAcademyQuest: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Créer un formulaire contrôlé",
    content: `
### Bienvenue à l'Académie des Formulaires !

Ici, tu vas apprendre à créer des formulaires React :
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
    validate: (code: string) =>
      code.includes("useState") &&
      code.includes("onChange") &&
      code.includes("handleSubmit") &&
      code.includes("form"),
    hint: "N'oublie pas :\n- D'utiliser useState pour le nom\n- D'ajouter onChange sur l'input\n- De créer handleSubmit\n- D'empêcher le comportement par défaut du form",
    successMessage: "Bravo ! Tu as créé ton premier formulaire contrôlé.\nC'est la base pour gérer les données utilisateur !"
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

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    console.log('Email valide :', email);
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
          className={`w-full p-2 border rounded ${
            error ? 'border-destructive' : ''
          }`}
          placeholder="ton@email.com"
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">
            {error}
          </p>
        )}
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
    validate: (code: string) =>
      code.includes("validateEmail") &&
      code.includes("setError") &&
      code.includes("trim()") &&
      code.includes("@"),
    hint: "Vérifie que tu as :\n- Créé la fonction validateEmail\n- Géré le cas du champ vide\n- Affiché les messages d'erreur\n- Réinitialisé l'erreur quand l'utilisateur tape",
    successMessage: "Super ! Tu sais maintenant valider les données d'un formulaire."
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Formulaire valide !', form);
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
          className={`w-full p-2 border rounded ${
            errors.email ? 'border-destructive' : ''
          }`}
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
          className={`w-full p-2 border rounded ${
            errors.password ? 'border-destructive' : ''
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Se connecter
      </button>
    </form>
  );
}`,
    validate: (code: string) =>
      code.includes("LoginForm") &&
      code.includes("handleChange") &&
      code.includes("validate") &&
      code.includes("errors"),
    hint: "N'oublie pas :\n- De créer les interfaces pour le form et les erreurs\n- D'implémenter handleChange pour tous les champs\n- De valider tous les champs\n- D'afficher les erreurs sous chaque champ",
    successMessage: "Excellent ! Tu maîtrises maintenant les formulaires multi-champs."
  },
  {
    title: "🎓 Mini-Projet Final — Formulaire d'inscription",
    content: `
### Le Formulaire d'Inscription

Pour ce projet final, tu vas créer un formulaire d'inscription complet avec :
- Plusieurs champs typés
- Validation en temps réel
- Messages d'erreur personnalisés
- Retour visuel à la soumission

Le formulaire doit avoir :
1. Nom complet (obligatoire)
2. Email (valide)
3. Mot de passe (min 6 caractères)
4. Confirmation du mot de passe

> 💡 Conseil de React-Bot :  
> Valide les champs au changement ET à la soumission !
    `,
    initialCode: `import { useState } from 'react';

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterForm() {
  const [form, setForm] = useState<RegisterForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: keyof RegisterForm, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return "Le nom est requis";
        if (value.length < 2) return "Le nom est trop court";
        return undefined;
      
      case 'email':
        if (!value) return "L'email est requis";
        if (!value.includes('@') || !value.includes('.')) 
          return "Format d'email invalide";
        return undefined;
      
      case 'password':
        if (!value) return "Le mot de passe est requis";
        if (value.length < 6)
          return "Le mot de passe doit faire au moins 6 caractères";
        return undefined;
      
      case 'confirmPassword':
        if (!value) return "La confirmation est requise";
        if (value !== form.password)
          return "Les mots de passe ne correspondent pas";
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Validation en temps réel
    const error = validateField(name as keyof RegisterForm, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(form) as Array<keyof RegisterForm>).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    
    if (validate()) {
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSuccess(true);
        // Reset form
        setForm({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Inscription</h2>
      
      {isSuccess && (
        <div className="p-4 bg-primary/10 text-primary rounded">
          Inscription réussie ! Bienvenue {form.fullName} !
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Nom complet
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.fullName ? 'border-destructive' : ''
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-destructive">
              {errors.fullName}
            </p>
          )}
        </div>

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
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-destructive' : ''
            }`}
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
            className={`w-full p-2 border rounded ${
              errors.password ? 'border-destructive' : ''
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirmer le mot de passe
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? 'border-destructive' : ''
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-destructive">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}`,
    validate: (code: string) =>
      code.includes("RegisterForm") &&
      code.includes("validateField") &&
      code.includes("handleChange") &&
      code.includes("isSubmitting"),
    hint: "Vérifie que tu as :\n- Créé les interfaces pour le form et les erreurs\n- Implémenté la validation en temps réel\n- Géré l'état de soumission\n- Affiché le message de succès",
    successMessage: "🎉 Félicitations ! Tu as créé un formulaire d'inscription complet et robuste.\nTu maîtrises maintenant les formulaires en React !"
  }
];