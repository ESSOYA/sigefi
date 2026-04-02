import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield, Users, FileCheck, BarChart3, ChevronRight, ArrowRight,
  CheckCircle2, Building2, Globe, Lock, Mail, Phone, HelpCircle
} from "lucide-react";
import gabonEmblem from "@/assets/gabon-emblem.png";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Dématérialisation complète",
    desc: "Soumission et traitement numérique des dossiers d'intégration, de bout en bout."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Sécurité renforcée",
    desc: "Chiffrement AES-256, signature HSM, mTLS inter-ministériel et audit complet."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Workflow multi-niveaux",
    desc: "Validation Instructeur → Chef de Service → Directeur avec traçabilité totale."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Tableaux de bord temps réel",
    desc: "KPI, projections budgétaires, heatmaps et alertes pour les décideurs."
  },
];

const steps = [
  { num: "01", title: "Inscription", desc: "Créez votre compte avec votre NNI et vos données civiles." },
  { num: "02", title: "Soumission", desc: "Déposez votre dossier et vos pièces justificatives en ligne." },
  { num: "03", title: "Traitement", desc: "Votre dossier est vérifié par la Fonction Publique (IA + humain)." },
  { num: "04", title: "Intégration", desc: "Recevez votre affectation et votre Carte Unique d'Identifiant." },
];

const faqs = [
  { q: "Qui peut s'inscrire sur SIGEFI-INTÉGRA ?", a: "Tout candidat à l'intégration dans la Fonction Publique gabonaise disposant d'un NNI valide." },
  { q: "Comment vérifier l'authenticité d'un CUI ?", a: "Utilisez le scanner QR public disponible sur la page d'accueil sans avoir besoin de créer un compte." },
  { q: "Combien de temps dure le traitement ?", a: "Le traitement varie selon le volume, mais le suivi en temps réel vous informe à chaque étape." },
  { q: "Mes données sont-elles protégées ?", a: "Oui, conformément au RGPD et aux normes de sécurité de l'État, avec chiffrement de bout en bout." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gabon stripe */}
      <div className="gabon-stripe" />

      {/* Nav */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={gabonEmblem} alt="Gabon" className="h-10 w-10 rounded-full" />
            <div>
              <p className="font-heading font-bold text-sm text-foreground">SIGEFI-INTÉGRA</p>
              <p className="text-[10px] text-muted-foreground">République Gabonaise</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#fonctionnement" className="hover:text-foreground transition-colors">Fonctionnement</a>
            <a href="#fonctionnalites" className="hover:text-foreground transition-colors">Fonctionnalités</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              <Globe className="h-4 w-4" />
              Plateforme officielle du Gouvernement Gabonais
            </div>
            <h1 className="text-4xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight">
              Système Intégré de Gestion de la{" "}
              <span className="text-gradient-hero">Fonction Publique</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">
              Plateforme sécurisée de dématérialisation des procédures d'intégration des agents de l'État gabonais.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/signup">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-elevated">
                  Déposer mon dossier <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/verification-qr">
                <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-primary-foreground/5">
                  Vérifier un CUI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="bg-card border-b">
        <div className="container py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "12,847", label: "Dossiers traités" },
            { val: "98.5%", label: "Taux de conformité" },
            { val: "24h", label: "Délai moyen" },
            { val: "100%", label: "Traçabilité" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl lg:text-3xl font-heading font-bold text-foreground">{s.val}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works / Fonctionnement */}
      <section id="fonctionnement" className="container py-16">
        <h2 className="text-3xl font-bold mb-6">Fonctionnement</h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          La plateforme accompagne le candidat depuis l'inscription jusqu'à l'intégration en gérant
          numériquement le dépôt, la vérification par l'IA et les agents, ainsi que la validation
          budgétaire. Tout est tracé et sécurisé.
        </p>
      </section>

      {/* Features section */}
      <section id="fonctionnalites" className="container py-16 bg-muted/20">
        <h2 className="text-3xl font-bold mb-6">Fonctionnalités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="text-primary">{f.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-16">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((q, idx) => (
            <details key={idx} className="border rounded-md p-4">
              <summary className="font-medium cursor-pointer">{q.q}</summary>
              <p className="mt-2 text-muted-foreground">{q.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-16 bg-muted/20">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="text-lg text-muted-foreground">
          Pour toute question ou assistance, envoyez un email à <a href="mailto:support@sigefi.gouv.ga" className="text-primary underline">support@sigefi.gouv.ga</a> ou appelez le +241 01 23 45 67.
        </p>
      </section>
    </div>
  );
}
