import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Wallet, Package, CheckCircle2, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projectionData = [
  { year: "2026", cout: 4.2 }, { year: "2027", cout: 5.1 },
  { year: "2028", cout: 5.8 }, { year: "2029", cout: 6.3 }, { year: "2030", cout: 7.0 },
];

const postesData = [
  { cat: "Cat A", total: 120, disponible: 34 },
  { cat: "Cat B", total: 280, disponible: 87 },
  { cat: "Cat C", total: 450, disponible: 156 },
];

const lotsRecus = [
  { id: "LOT-2026-042", dossiers: 100, status: "En traitement", date: "25/02/2026", montant: "450M FCFA" },
  { id: "LOT-2026-041", dossiers: 100, status: "Assigné", date: "20/02/2026", montant: "430M FCFA" },
  { id: "LOT-2026-040", dossiers: 100, status: "Validé", date: "15/02/2026", montant: "440M FCFA" },
];

const statusColor: Record<string, string> = {
  "En traitement": "bg-warning/10 text-warning",
  "Assigné": "bg-info/10 text-info",
  "Validé": "bg-success/10 text-success",
};

export default function DashboardBudget() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard Budget</h1>
          <p className="text-sm text-muted-foreground">Gestion budgétaire et assignation des postes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lots en attente" value={3} icon={<Package className="h-5 w-5 text-warning" />} variant="warning" />
          <StatCard title="Postes disponibles" value={277} icon={<Wallet className="h-5 w-5 text-info" />} variant="info" subtitle="Sur 850 postes budgétaires" />
          <StatCard title="Assignés ce mois" value={186} icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" trend={{ value: 15, label: "vs mois" }} />
          <StatCard title="Budget consommé" value="68%" icon={<AlertTriangle className="h-5 w-5 text-accent" />} variant="default" subtitle="12.4 Mrd / 18.2 Mrd FCFA" />
        </div>

        <div className="flex items-center gap-2">
          <Link to="/budget/lots-recus"><Button variant="ghost">Lots reçus</Button></Link>
          <Link to="/budget/simulation"><Button variant="ghost">Simulation</Button></Link>
          <Link to="/budget/postes"><Button variant="ghost">Inventaire postes</Button></Link>
          <Link to="/budget/validation-financiere"><Button variant="ghost">Validation financière</Button></Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Projection masse salariale (Mrd FCFA)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip />
                <Line type="monotone" dataKey="cout" stroke="hsl(45, 95%, 55%)" strokeWidth={3} dot={{ fill: "hsl(45, 95%, 55%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Postes budgétaires par catégorie</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={postesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="cat" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip />
                <Bar dataKey="total" fill="hsl(215, 60%, 16%)" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="disponible" fill="hsl(150, 80%, 28%)" radius={[4, 4, 0, 0]} name="Disponible" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-heading font-semibold text-foreground">Lots reçus de la Fonction Publique</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Lot ID</th>
                  <th className="text-left px-5 py-3 font-medium">Dossiers</th>
                  <th className="text-left px-5 py-3 font-medium">Montant estimé</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {lotsRecus.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-5 py-3 font-mono text-xs">{l.id}</td>
                    <td className="px-5 py-3">{l.dossiers}</td>
                    <td className="px-5 py-3 font-medium">{l.montant}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{l.date}</td>
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
