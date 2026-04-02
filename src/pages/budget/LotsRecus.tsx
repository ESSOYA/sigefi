import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Wallet, CheckCircle2, XCircle, ArrowRightLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const lots = [
  { id: "LOT-2026-042", dossiers: 100, source: "DGFP", montant: "450M FCFA", status: "Nouveau", date: "25/02/2026" },
  { id: "LOT-2026-041", dossiers: 100, source: "DGFP", montant: "430M FCFA", status: "En assignation", date: "20/02/2026" },
  { id: "LOT-2026-040", dossiers: 100, source: "DGFP", montant: "440M FCFA", status: "Validé", date: "15/02/2026" },
  { id: "LOT-2026-039", dossiers: 100, source: "DGFP", montant: "425M FCFA", status: "Validé", date: "10/02/2026" },
];

const statusColor: Record<string, string> = {
  "Nouveau": "bg-warning/10 text-warning",
  "En assignation": "bg-info/10 text-info",
  "Validé": "bg-success/10 text-success",
};

export default function LotsRecus() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Lots reçus</h1>
          <p className="text-sm text-muted-foreground">Lots transmis par la Fonction Publique pour assignation budgétaire</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lots à traiter" value={1} icon={<Wallet className="h-5 w-5 text-warning" />} variant="warning" />
          <StatCard title="En assignation" value={1} icon={<ArrowRightLeft className="h-5 w-5 text-info" />} variant="info" />
          <StatCard title="Validés" value={8} icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" />
          <StatCard title="Rejetés" value={0} icon={<XCircle className="h-5 w-5 text-muted-foreground" />} variant="default" />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Lot ID</th>
                  <th className="text-left px-5 py-3 font-medium">Dossiers</th>
                  <th className="text-left px-5 py-3 font-medium">Source</th>
                  <th className="text-left px-5 py-3 font-medium">Montant</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {lots.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs">{l.id}</td>
                    <td className="px-5 py-3">{l.dossiers}</td>
                    <td className="px-5 py-3 text-muted-foreground">{l.source}</td>
                    <td className="px-5 py-3 font-medium">{l.montant}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <Link to={`/budget/simulation`}><Button variant="ghost" size="sm">Simuler</Button></Link>
                        <Link to={`/budget/validation-financiere`}><Button variant="ghost" size="sm">Vérifier crédit</Button></Link>
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
