import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const forecast = [
  { year: 2026, impact: 1.2 }, { year: 2027, impact: 1.4 }, { year: 2028, impact: 1.6 }, { year: 2029, impact: 1.8 }, { year: 2030, impact: 2.0 }
];

export default function SimulationBudget() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Simulation budgétaire</h1>
          <p className="text-sm text-muted-foreground">Projection sur 5 ans et impact des lots reçus — scénario optimiste / pessimiste</p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-4">Projection (5 ans)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={forecast}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impact" fill="hsl(210,80%,56%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3">
              <h4 className="font-medium">Scénarios</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li><strong>Optimiste:</strong> augmentation 6% annuelle, réduction des coûts administratifs</li>
                <li><strong>Pessimiste:</strong> inflation 8% couplée à 1.5% d'entrées nettes</li>
              </ul>
              <div className="mt-3">
                <p className="text-sm">Hypothèses modifiables: taux d'augmentation, rythme d'intégration.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link to="/budget/lots-recus"><Button variant="outline">Retour Lots reçus</Button></Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
