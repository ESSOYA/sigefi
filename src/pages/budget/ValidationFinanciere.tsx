import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const checks = [
  { lot: 'LOT-2026-042', creditOk: true, note: 'Solde suffisant' },
  { lot: 'LOT-2026-041', creditOk: false, note: 'Solde insuffisant' },
];

export default function ValidationFinanciere() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Validation financière</h1>
          <p className="text-sm text-muted-foreground">Vérification crédits et messages associés</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground">
                <th className="text-left px-4 py-2">Lot</th>
                <th className="text-left px-4 py-2">Crédit OK</th>
                <th className="text-left px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {checks.map(c => (
                <tr key={c.lot} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-2 font-mono text-xs">{c.lot}</td>
                  <td className="px-4 py-2">{c.creditOk ? 'Oui' : 'Non'}</td>
                  <td className="px-4 py-2">{c.note}</td>
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
