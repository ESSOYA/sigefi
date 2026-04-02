import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Bell, Activity, Database, AlertTriangle } from "lucide-react";

export default function DashboardOps() {
  const alerts = [
    { id: 1, message: "Lot #125 en erreur d'envoi vers Budget", level: "critical" },
    { id: 2, message: "Reader OCR en file d'attente", level: "warning" },
    { id: 3, message: "Rotation clé HSM prévue demain", level: "info" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard Opérations</h1>
          <p className="text-sm text-muted-foreground">Vue globale des KPI et incidents critiques.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lots traités" value={523} icon={<Activity className="h-5 w-5 text-secondary" />} />
          <StatCard title="Erreurs" value={7} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="destructive" />
          <StatCard title="Sessions actives" value={128} icon={<Database className="h-5 w-5 text-info" />} variant="info" />
          <StatCard title="Alertes nouvelles" value={alerts.length} icon={<Bell className="h-5 w-5 text-warning" />} variant="warning" />
        </div>

        <Card>
          <h3 className="font-semibold mb-2">Alertes récentes</h3>
          <ul className="space-y-1 text-sm">
            {alerts.map(a => (
              <li key={a.id} className={
                a.level === "critical" ? "text-destructive" : a.level === "warning" ? "text-warning" : "text-muted-foreground"
              }>
                {a.message}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
