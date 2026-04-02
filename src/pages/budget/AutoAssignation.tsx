import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AutoAssignation() {
  const runAlgo = () => alert('Auto-assignation simulée — algorithme exécuté');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Auto-assignation</h1>
          <p className="text-sm text-muted-foreground">Algorithme d'assignation automatique des dossiers aux postes par catégorie</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="mb-4">Paramètres de l'algorithme et aperçu des résultats.</p>
          <div className="flex gap-2">
            <Button onClick={runAlgo}>Exécuter l'auto-assignation</Button>
            <Link to="/budget/postes"><Button variant="outline">Voir inventaire postes</Button></Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
