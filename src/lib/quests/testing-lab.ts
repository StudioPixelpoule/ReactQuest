import { QuestStep } from '@/types/quest';

export const testingLabQuest: QuestStep[] = [
  {
    title: "🔹 Étape 1 — Tester un composant simple",
    content: `
### Bienvenue au Centre de Tests !

Ici, tu vas apprendre à tester tes composants React avec :
- Jest pour les tests unitaires
- Testing Library pour les tests d'intégration
- TypeScript pour le typage des tests

Tu commenceras par tester un composant simple.

> 💡 Conseil de React-Bot :  
> Testing Library encourage à tester comme un utilisateur utiliserait ton app !
    `,
    initialCode: `// Greeting.tsx
interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return <h1>Bonjour, {name} !</h1>;
}

// Greeting.test.tsx
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

test('affiche le nom correctement', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Bonjour, Alice !')).toBeInTheDocument();
});`,
    validate: (code: string) =>
      code.includes("render") &&
      code.includes("getByText") &&
      code.includes("expect") &&
      code.includes("Greeting"),
    hint: "Vérifie que tu as :\n- Importé render et screen\n- Utilisé getByText\n- Écrit une assertion avec expect\n- Testé le bon texte",
    successMessage: "Bravo ! Tu sais maintenant tester un composant simple.\nC'est la base pour des tests fiables !"
  },
  {
    title: "🔸 Étape 2 — Tester une interaction",
    content: `
### Tester les interactions utilisateur

Testing Library permet de simuler :
- Des clics
- Des saisies
- Des soumissions de formulaire
- Des changements d'état

Tu vas tester un formulaire simple.

> 💡 Conseil de React-Bot :  
> \`fireEvent\` simule des événements DOM :
> \`fireEvent.click(button)\`
    `,
    initialCode: `// SimpleForm.tsx
import { useState } from 'react';

export function SimpleForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form onSubmit={(e) => { 
      e.preventDefault(); 
      setSubmitted(true); 
    }}>
      <button type="submit">Envoyer</button>
      {submitted && <p>Merci !</p>}
    </form>
  );
}

// SimpleForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SimpleForm } from './SimpleForm';

test('affiche un message après soumission', () => {
  render(<SimpleForm />);
  fireEvent.click(screen.getByText('Envoyer'));
  expect(screen.getByText('Merci !')).toBeInTheDocument();
});`,
    validate: (code: string) =>
      code.includes("fireEvent") &&
      code.includes("getByText") &&
      code.includes("Merci") &&
      code.includes("SimpleForm"),
    hint: "N'oublie pas :\n- D'importer fireEvent\n- De simuler le clic\n- De vérifier le message\n- De tester le bon composant",
    successMessage: "Super ! Tu sais maintenant tester les interactions utilisateur."
  },
  {
    title: "🔹 Étape 3 — Tester avec typage strict",
    content: `
### Tests typés avec TypeScript

TypeScript améliore les tests en :
- Typant les éléments du DOM
- Évitant les erreurs de typo
- Assurant la cohérence
- Facilitant le refactoring

> 💡 Conseil de React-Bot :  
> Type les éléments avec les interfaces HTML :
> \`const input: HTMLInputElement = screen.getByRole('textbox');\`
    `,
    initialCode: `// TypedForm.tsx
import { useState } from 'react';

export function TypedForm() {
  const [email, setEmail] = useState('');

  return (
    <form>
      <label htmlFor="email">Email :</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  );
}

// TypedForm.test.tsx
import { render, screen } from '@testing-library/react';
import { TypedForm } from './TypedForm';

test('le champ email est typé correctement', () => {
  render(<TypedForm />);
  const input: HTMLInputElement = screen.getByLabelText('Email :');
  expect(input.type).toBe('email');
});`,
    validate: (code: string) =>
      code.includes("HTMLInputElement") &&
      code.includes("getByLabelText") &&
      code.includes("type") &&
      code.includes("expect"),
    hint: "Vérifie que tu as :\n- Typé l'input avec HTMLInputElement\n- Utilisé getByLabelText\n- Testé le type de l'input\n- Écrit une assertion correcte",
    successMessage: "Excellent ! Tu sais maintenant écrire des tests typés."
  },
  {
    title: "🎓 Mini-Projet Final — Test d'un formulaire React Hook Form",
    content: `
### Tester un formulaire complet

Pour ce projet final, tu vas tester un formulaire React Hook Form qui :
- Valide les champs
- Affiche des erreurs
- Gère la soumission
- Est entièrement typé

> 💡 Conseil de React-Bot :  
> Utilise \`waitFor\` pour les tests asynchrones :
> \`await waitFor(() => expect(...));\`
    `,
    initialCode: `// ContactForm.tsx
import { useForm } from 'react-hook-form';

interface ContactData {
  email: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactData>();

  const onSubmit = (data: ContactData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', { 
          required: 'Email requis',
          pattern: {
            value: /^\\S+@\\S+$/i,
            message: 'Format invalide'
          }
        })} 
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Envoyer</button>
      {isSubmitSuccessful && <p>Merci pour votre message</p>}
    </form>
  );
}

// ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  test('affiche une erreur si email est vide', async () => {
    render(<ContactForm />);
    
    fireEvent.click(screen.getByText('Envoyer'));
    
    expect(await screen.findByText('Email requis')).toBeInTheDocument();
  });

  test('affiche une erreur si email est invalide', async () => {
    render(<ContactForm />);
    
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Envoyer'));
    
    expect(await screen.findByText('Format invalide')).toBeInTheDocument();
  });

  test('soumet le formulaire avec un email valide', async () => {
    render(<ContactForm />);
    
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Envoyer'));
    
    await waitFor(() => {
      expect(screen.getByText('Merci pour votre message')).toBeInTheDocument();
    });
  });
});`,
    validate: (code: string) =>
      code.includes("useForm") &&
      code.includes("waitFor") &&
      code.includes("findByText") &&
      code.includes("toBeInTheDocument"),
    hint: "Vérifie que tu as :\n- Testé les erreurs de validation\n- Utilisé waitFor pour l'async\n- Typé les éléments du DOM\n- Testé le succès de soumission",
    successMessage: "🎉 Félicitations ! Tu sais maintenant tester des formulaires complexes.\nTes composants sont maintenant fiables et bien testés !"
  }
];