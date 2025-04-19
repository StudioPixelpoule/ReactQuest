import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Créer un formulaire avec React Hook Form",
    content: `
### Bienvenue au Centre de Validation !

Ici, tu vas apprendre à utiliser React Hook Form pour :
- Créer des formulaires sans useState
- Valider automatiquement les données
- Gérer les erreurs efficacement
- Typer proprement les champs

Tu commenceras par un formulaire simple avec React Hook Form.

> 💡 Conseil de React-Bot :  
> \`useForm\` gère tout l'état du formulaire pour toi !
    `,
    initialCode: `import { useForm } from "react-hook-form";

interface FormData {
  email: string;
}

function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email soumis :', data.email);
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^\\S+@\\S+$/i,
              message: "Format d'email invalide",
            },
          })}
          className={\`w-full p-2 border rounded transition-colors \${
            errors.email ? 'border-destructive' : ''
          }\`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
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
      return code.includes("useForm") &&
             code.includes("register") &&
             code.includes("errors.email") &&
             code.includes("pattern");
    },
    hint: "Vérifie que tu as :\n- Utilisé useForm avec le bon type\n- Configuré register avec les règles\n- Affiché les erreurs\n- Implémenté onSubmit",
    successMessage: "Bravo ! Tu sais maintenant utiliser React Hook Form.\nC'est beaucoup plus simple que useState, non ?",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🔸 Étape 2 — Validation avec Zod",
    content: `
### Validation déclarative avec Zod

Zod permet de :
- Définir des schémas de validation
- Typer automatiquement les données
- Valider de manière déclarative

C'est parfait avec React Hook Form !

> 💡 Conseil de React-Bot :  
> \`zodResolver\` fait le pont entre Zod et React Hook Form :
> \`\`\`ts
> useForm({
>   resolver: zodResolver(schema)
> });
> \`\`\`
    `,
    initialCode: `import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  age: z.number()
    .min(18, "Vous devez avoir au moins 18 ans")
    .max(120, "Âge invalide"),
});

type Schema = z.infer<typeof schema>;

function ZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Données valides :', data);
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={\`w-full p-2 border rounded transition-colors \${
            errors.email ? 'border-destructive' : ''
          }\`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium mb-1">
          Âge
        </label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className={\`w-full p-2 border rounded transition-colors \${
            errors.age ? 'border-destructive' : ''
          }\`}
          disabled={isSubmitting}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-destructive">
            {errors.age.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Validation...' : 'Valider'}
      </button>
    </form>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("z.object") &&
             code.includes("zodResolver") &&
             code.includes("z.infer") &&
             code.includes("valueAsNumber");
    },
    hint: "Vérifie que tu as :\n- Créé le schéma Zod\n- Utilisé zodResolver\n- Typé le formulaire avec z.infer\n- Configuré register pour les nombres",
    successMessage: "Excellent ! Tu sais maintenant utiliser Zod pour une validation déclarative.",
    solution: `// Solution complète dans le code initial`
  },
  {
    title: "🎓 Mini-Projet Final — Formulaire de contact",
    content: `
### Le Formulaire de Contact

Pour ce projet final, tu vas créer un formulaire de contact qui utilise :
- React Hook Form pour la gestion d'état
- Zod pour la validation
- TypeScript pour le typage
- Une belle UI avec retour visuel

Le formulaire doit avoir :
1. Nom (min 2 caractères)
2. Email (format valide)
3. Message (min 10 caractères)
4. Type de demande (select)

> 💡 Conseil de React-Bot :  
> Utilise \`reset()\` pour vider le formulaire après une soumission réussie !
    `,
    initialCode: `import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string()
    .min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  type: z.enum(["support", "business", "other"], {
    required_error: "Sélectionnez un type de demande",
  }),
  message: z.string()
    .min(10, "Le message doit faire au moins 10 caractères"),
});

type ContactForm = z.infer<typeof schema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Message envoyé :', data);
      reset();
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Contact</h2>

      {isSubmitSuccessful && (
        <div className="p-4 bg-primary/10 text-primary rounded">
          Message envoyé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <input
            id="name"
            {...register("name")}
            className={\`w-full p-2 border rounded transition-colors \${
              errors.name ? 'border-destructive' : ''
            }\`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={\`w-full p-2 border rounded transition-colors \${
              errors.email ? 'border-destructive' : ''
            }\`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Type de demande
          </label>
          <select
            id="type"
            {...register("type")}
            className={\`w-full p-2 border rounded transition-colors \${
              errors.type ? 'border-destructive' : ''
            }\`}
            disabled={isSubmitting}
          >
            <option value="">Sélectionnez un type</option>
            <option value="support">Support technique</option>
            <option value="business">Business</option>
            <option value="other">Autre</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-destructive">
              {errors.type.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            className={\`w-full p-2 border rounded transition-colors \${
              errors.message ? 'border-destructive' : ''
            }\`}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("useForm") &&
             code.includes("zodResolver") &&
             code.includes("reset") &&
             code.includes("isSubmitSuccessful");
    },
    hint: "Vérifie que tu as :\n- Créé le schéma Zod complet\n- Utilisé reset après soumission\n- Géré tous les états du formulaire\n- Affiché le message de succès",
    successMessage: "🎉 Félicitations ! Tu sais maintenant créer des formulaires complexes avec React Hook Form et Zod.\nTes formulaires sont maintenant robustes et bien typés !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;