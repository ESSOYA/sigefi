import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EnvoiReponseFP() {
  const send = () => alert('Réponse FP envoyée (simulation)');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Envoi réponse FP</h1>
          <p className="text-sm text-muted-foreground">Envoyer la réponse d'assignation vers la Fonction Publique (JSON)</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="mb-4">Prévisualisation JSON de la réponse et bouton d'envoi.</p>
          <pre className="bg-muted/20 p-3 rounded text-xs font-mono mb-4">{JSON.stringify({ lot: "LOT-2026-042", assignments: [{ dossier: "DOS-...", poste: "PB-001" }] }, null, 2)}</pre>
          <div className="flex gap-2">
            <Button onClick={send}>Envoyer la réponse</Button>
            <Link to="/budget/lots-recus"><Button variant="outline">Annuler</Button></Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
