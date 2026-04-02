import { Link } from "react-router-dom";
import gabonEmblem from "@/assets/gabon-emblem.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QrCode, Search, Shield, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function VerificationQR() {
  const [cui, setCui] = useState("");
  const [searched, setSearched] = useState(false);

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

      <div className="container py-16 max-w-lg mx-auto text-center space-y-8 animate-fade-in">
        <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
          <QrCode className="h-8 w-8 text-secondary" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Vérification CUI</h1>
          <p className="text-sm text-muted-foreground mt-2">Entrez le code CUI ou scannez le QR code pour vérifier l'authenticité d'un agent.</p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="CUI-XXXX-XXXX-XXXX" className="pl-10" value={cui} onChange={(e) => setCui(e.target.value)} />
          </div>
          <Button onClick={() => setSearched(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Vérifier</Button>
        </div>

        {searched && (
          <div className="rounded-xl border bg-card p-6 shadow-card text-left animate-fade-in space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <span className="text-sm font-medium text-success">Identité vérifiée</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xl font-heading font-bold text-muted-foreground">JM</div>
              <div>
                <p className="font-heading font-bold text-foreground">MOUSSAVOU Jean-Pierre</p>
                <p className="text-sm text-muted-foreground">NNI: GA-29384756</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-muted-foreground">Statut</p><p className="font-medium text-success">Intégré</p></div>
              <div><p className="text-muted-foreground">Catégorie</p><p className="font-medium text-foreground">A</p></div>
              <div><p className="text-muted-foreground">Ministère</p><p className="font-medium text-foreground">Min. Économie</p></div>
              <div><p className="text-muted-foreground">Date intégration</p><p className="font-medium text-foreground">15/01/2026</p></div>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" /> Données vérifiées cryptographiquement
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
