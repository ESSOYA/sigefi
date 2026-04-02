import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ValidationManuelle() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Validation manuelle</h1>
          <p className="text-sm text-muted-foreground">Interface pour override et assignation manuelle (drag & drop placeholder)</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="mb-4">Zone de validation manuelle — drag & drop UI à implémenter (placeholder).</p>
          <div className="flex gap-2">
            <Link to="/budget/lots-recus"><Button variant="outline">Retour Lots reçus</Button></Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
