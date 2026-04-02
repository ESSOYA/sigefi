import { Link } from "react-router-dom";
import gabonEmblem from "@/assets/gabon-emblem.png";
import { Button } from "@/components/ui/button";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      <div className="gabon-stripe" />
      <nav className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={gabonEmblem} alt="Gabon" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-heading font-bold text-sm text-foreground">SIGEFI-INTÉGRA</p>
              <p className="text-[10px] text-muted-foreground">République Gabonaise</p>
            </div>
          </Link>
          <Link to="/"><Button variant="ghost" size="sm">Retour à l'accueil</Button></Link>
        </div>
      </nav>

      <div className="container py-12 max-w-3xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-3xl font-heading font-bold text-foreground">Mentions légales</h1>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">Éditeur du site</h2>
          <p className="text-sm text-muted-foreground">
            SIGEFI-INTÉGRA est un service numérique édité par la Direction Générale de la Fonction Publique (DGFP) de la République Gabonaise, en collaboration avec le Ministère du Budget et des Comptes Publics.
          </p>
          <p className="text-sm text-muted-foreground">Adresse : Boulevard Triomphal, B.P. 178, Libreville, Gabon</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">Protection des données (RGPD)</h2>
          <p className="text-sm text-muted-foreground">
            Conformément au Règlement Général sur la Protection des Données et à la législation gabonaise en vigueur, les données personnelles collectées sur cette plateforme sont strictement utilisées dans le cadre des procédures d'intégration à la Fonction Publique. Elles sont chiffrées (AES-256) et conservées selon les règles d'archivage WORM.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">Conditions d'utilisation</h2>
          <p className="text-sm text-muted-foreground">
            L'accès à SIGEFI-INTÉGRA est réservé aux candidats à l'intégration disposant d'un NNI valide et aux agents habilités des ministères. Toute utilisation frauduleuse est passible de poursuites conformément au Code Pénal gabonais.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold text-foreground">Cookies</h2>
          <p className="text-sm text-muted-foreground">
            Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement de la plateforme. Aucun cookie publicitaire ou de suivi n'est utilisé.
          </p>
        </section>
      </div>
    </div>
  );
}
