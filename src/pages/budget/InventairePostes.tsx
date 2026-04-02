import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const postes = [
  { id: "PB-001", intitule: "Enseignant secondaire", grade: "A2", disponible: 12 },
  { id: "PB-002", intitule: "Médecin généraliste", grade: "B1", disponible: 5 },
  { id: "PB-003", intitule: "Agent administratif", grade: "C3", disponible: 20 },
];

export default function InventairePostes() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Inventaire postes budgétaires</h1>
          <p className="text-sm text-muted-foreground">Liste des postes (code PB-xxx) et disponibilités</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground">
                <th className="text-left px-4 py-2">Code</th>
                <th className="text-left px-4 py-2">Intitulé</th>
                <th className="text-left px-4 py-2">Grade</th>
                <th className="text-left px-4 py-2">Disponibles</th>
              </tr>
            </thead>
            <tbody>
              {postes.map(p => (
                <tr key={p.id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-2 font-mono text-xs">{p.id}</td>
                  <td className="px-4 py-2">{p.intitule}</td>
                  <td className="px-4 py-2">{p.grade}</td>
                  <td className="px-4 py-2">{p.disponible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2">
          <Link to="/budget/lots-recus"><Button variant="outline">Retour Lots reçus</Button></Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
