import { QuestStep } from '@/types/quest';

const steps: QuestStep[] = [
  {
    title: "💥 Mini-Projet Final — Formulaire de Contact Pro",
    content: `
### Le Formulaire de Contact Professionnel

Pour ce projet final, tu vas créer un formulaire de contact complet qui combine :
- React Hook Form pour la gestion d'état
- Zod pour la validation
- Une UI professionnelle
- Des retours visuels
- Une gestion des erreurs robuste

Le formulaire doit avoir :
1. Nom complet (min 2 caractères)
2. Email (format valide)
3. Type de demande (select)
4. Message (min 10 caractères)
5. Conditions d'utilisation (checkbox)

> 💡 Conseil de React-Bot :  
> Utilise les composants shadcn/ui pour une UI cohérente et accessible !
    `,
    initialCode: `import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({
  fullName: z.string()
    .min(2, "Le nom doit faire au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  email: z.string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  type: z.enum(["support", "business", "other"], {
    required_error: "Sélectionnez un type de demande",
  }),
  message: z.string()
    .min(10, "Le message doit faire au moins 10 caractères")
    .max(500, "Le message est trop long"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

type ContactForm = z.infer<typeof contactSchema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simuler un envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Message envoyé :', data);
      
      toast.success("Message envoyé avec succès !");
      reset();
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Contactez-nous</h1>
        <p className="text-muted-foreground">
          Une question ? Un projet ? Écrivez-nous !
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de demande</Label>
          <Select
            onValueChange={(value) => setValue("type", value as ContactForm["type"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="support">Support technique</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-destructive">
              {errors.type.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Votre message..."
            rows={5}
          />
          {errors.message && (
            <p className="text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => setValue("terms", checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            J'accepte les conditions d'utilisation
          </Label>
        </div>
        {errors.terms && (
          <p className="text-sm text-destructive">
            {errors.terms.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </div>
  );
}`,
    validate: (code: string | undefined) => {
      if (!code) return false;
      return code.includes("contactSchema") &&
             code.includes("zodResolver") &&
             code.includes("toast.success") &&
             code.includes("terms") &&
             code.includes("Select");
    },
    hint: "Vérifie que tu as :\n- Créé le schéma Zod complet\n- Utilisé les composants shadcn/ui\n- Géré tous les types de champs\n- Ajouté les retours utilisateur",
    successMessage: "🎉 Félicitations ! Tu as créé un formulaire de contact professionnel et complet.\nTu maîtrises maintenant les formulaires en React !",
    solution: `// Solution complète dans le code initial`
  }
];

export default steps;