import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";

const alerts = [
  { id: 1, level: "Urgent", msg: "Quota LOT-2026-042 atteint à 95%", time: "2h" },
  { id: 2, level: "Avertissement", msg: "3 dossiers en attente >15 jours", time: "5h" },
  { id: 3, level: "Info", msg: "Nouveau lot prêt: LOT-2026-041", time: "Hier" },
];

export default function AlertesApprovals() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Alertes & Approvals</h1>
          <p className="text-sm text-muted-foreground">Signaux critiques et décisions requises</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-3">Liste des alertes</h3>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{a.level}</span>
                    <span className="text-sm text-muted-foreground">• {a.time}</span>
                  </div>
                  <p className="text-sm">{a.msg}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Voir</Button>
                  <Button size="sm" variant="ghost">Approuver</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}