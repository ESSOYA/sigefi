import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Eye } from "lucide-react";

const lots = [
  { id: "LOT-2026-041", date: "20/02/2026", status: "Reçu", dossiers: 100 },
  { id: "LOT-2026-040", date: "18/02/2026", status: "En cours", dossiers: 95 },
];

export default function LotsRecus() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Lots reçus</h1>
          <p className="text-sm text-muted-foreground">Liste des lots transmis par la Fonction Publique</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="px-4 py-3">Réf</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Dossiers</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {lots.map((l) => (
                <tr key={l.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono">{l.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                  <td className="px-4 py-3"><Badge className="bg-success/10 text-success">{l.status}</Badge></td>
                  <td className="px-4 py-3">{l.dossiers}</td>
                  <td className="px-4 py-3"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
