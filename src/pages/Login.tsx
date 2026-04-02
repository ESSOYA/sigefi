import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight, Shield } from "lucide-react";
import gabonEmblem from "@/assets/gabon-emblem.png";

export default function Login() {
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
          <h2 className="text-3xl font-heading font-bold">Bienvenue sur votre espace sécurisé</h2>
          <p className="text-primary-foreground/70">
            Accédez à votre tableau de bord pour gérer les dossiers d'intégration de la Fonction Publique.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
            <Shield className="h-4 w-4" />
            Connexion sécurisée • Chiffrement AES-256
          </div>
        </div>
        <p className="text-xs text-primary-foreground/40">© 2026 République Gabonaise</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={gabonEmblem} alt="Gabon" className="h-10 w-10 rounded-full" />
            <p className="font-heading font-bold text-foreground">SIGEFI-INTÉGRA</p>
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Connexion</h1>
            <p className="text-sm text-muted-foreground mt-1">Entrez vos identifiants pour accéder à votre espace.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="agent@gouv.ga" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/reset-password" className="text-xs text-secondary hover:underline">Mot de passe oublié ?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <Link to="/fp/dashboard">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                Se connecter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-secondary font-medium hover:underline">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
