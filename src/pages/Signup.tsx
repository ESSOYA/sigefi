import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Phone, CreditCard, ArrowRight, Shield } from "lucide-react";
import gabonEmblem from "@/assets/gabon-emblem.png";

export default function Signup() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient flex-col justify-between p-12 text-primary-foreground">
        <div className="flex items-center gap-3">
          <img src={gabonEmblem} alt="Gabon" className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-heading font-bold">SIGEFI-INTÉGRA</p>
            <p className="text-xs text-primary-foreground/60">République Gabonaise</p>
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-heading font-bold">Créez votre compte candidat</h2>
          <p className="text-primary-foreground/70">Inscrivez-vous pour soumettre votre dossier d'intégration à la Fonction Publique gabonaise.</p>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <p className="flex items-center gap-2"><Shield className="h-4 w-4" /> Vos données sont protégées (RGPD)</p>
            <p className="flex items-center gap-2"><Lock className="h-4 w-4" /> Authentification multi-facteurs</p>
          </div>
        </div>
        <p className="text-xs text-primary-foreground/40">© 2026 République Gabonaise</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={gabonEmblem} alt="Gabon" className="h-10 w-10 rounded-full" />
            <p className="font-heading font-bold text-foreground">SIGEFI-INTÉGRA</p>
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Inscription</h1>
            <p className="text-sm text-muted-foreground mt-1">Remplissez le formulaire pour créer votre compte candidat.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="nom" placeholder="MOUSSAVOU" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" placeholder="Jean-Pierre" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nni">Numéro National d'Identité (NNI)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="nni" placeholder="GA-XXXXXXXX" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="signup-email" type="email" placeholder="agent@email.com" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="telephone" type="tel" placeholder="+241 XX XX XX XX" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="signup-password" type="password" placeholder="Minimum 8 caractères" className="pl-10" />
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" id="terms" className="mt-1 accent-secondary" />
              <label htmlFor="terms">J'accepte les <Link to="/mentions-legales" className="text-secondary underline">conditions d'utilisation</Link> et la politique de confidentialité.</label>
            </div>

            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Créer mon compte <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Déjà inscrit ?{" "}
            <Link to="/login" className="text-secondary font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
