import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Package, CheckCircle2, Clock, Send, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const lots = [
  { id: "LOT-2026-042", dossiers: 87, status: "En constitution", date: "26/02/2026", signe: false },
  { id: "LOT-2026-041", dossiers: 100, status: "Scellé", date: "20/02/2026", signe: true },
  { id: "LOT-2026-040", dossiers: 100, status: "Envoyé au Budget", date: "15/02/2026", signe: true },
  { id: "LOT-2026-039", dossiers: 100, status: "Confirmé", date: "10/02/2026", signe: true },
  { id: "LOT-2026-038", dossiers: 100, status: "Confirmé", date: "05/02/2026", signe: true },
];

const statusColor: Record<string, string> = {
  "En constitution": "bg-warning/10 text-warning",
  "Scellé": "bg-info/10 text-info",
  "Envoyé au Budget": "bg-accent/10 text-accent-foreground",
  "Confirmé": "bg-success/10 text-success",
};

export default function GestionLots() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des lots</h1>
          <p className="text-sm text-muted-foreground">Constitution, scellement et transmission des lots de 100 dossiers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lot en cours" value="87/100" icon={<Clock className="h-5 w-5 text-warning" />} variant="warning" subtitle="LOT-2026-042" />
          <StatCard title="Lots scellés" value={1} icon={<Lock className="h-5 w-5 text-info" />} variant="info" />
          <StatCard title="Envoyés ce mois" value={2} icon={<Send className="h-5 w-5 text-accent" />} variant="default" />
          <StatCard title="Confirmés" value={12} icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground">Liste des lots</h3>
            <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Package className="h-4 w-4 mr-1" /> Nouveau lot
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Lot ID</th>
                  <th className="text-left px-5 py-3 font-medium">Dossiers</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Signé</th>
                  <th className="text-left px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lots.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs">{l.id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-secondary" style={{ width: `${l.dossiers}%` }} />
                        </div>
                        <span className="text-xs">{l.dossiers}/100</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                    <td className="px-5 py-3">
                      {l.signe ? <CheckCircle2 className="h-4 w-4 text-success" /> : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/fp/lot/${l.id}`)}><Eye className="h-4 w-4" /></Button>
                        {l.status === "Scellé" && (
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs">
                            <Send className="h-3 w-3 mr-1" /> Envoyer
                          </Button>
                        )}
                        {l.status === "En constitution" && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" /> Verrouiller
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
