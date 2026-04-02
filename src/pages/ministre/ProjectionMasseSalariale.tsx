import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const projectionData = [
  { year: 2026, masse: 4.2 },
  { year: 2027, masse: 4.6 },
  { year: 2028, masse: 5.0 },
  { year: 2029, masse: 5.5 },
  { year: 2030, masse: 6.0 },
];

const breakdown = [
  { poste: "Rémunérations", pct: 68 },
  { poste: "Cotisations sociales", pct: 18 },
  { poste: "Indemnités", pct: 8 },
  { poste: "Autres", pct: 6 },
];

export default function ProjectionMasseSalariale() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Projection masse salariale (5 ans)</h1>
          <p className="text-sm text-muted-foreground">Simulation et ventilation annuelle — horizon 2026–2030</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Projection consolidée</h3>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="masse" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Ventilation</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Poste</TableHead>
                  <TableHead>Pourcentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breakdown.map((b) => (
                  <TableRow key={b.poste}>
                    <TableCell>{b.poste}</TableCell>
                    <TableCell>{b.pct}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold mb-3">Hypothèses de la simulation</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Augmentation moyenne salariale annuelle: 5%</li>
            <li>Entrées nettes d'agents: +0.8% par an</li>
            <li>Stable des cotisations légales</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}