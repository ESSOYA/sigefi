import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Users, TrendingUp, AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const salaryData = [
  { year: "2024", masse: 3.8 }, { year: "2025", masse: 4.0 },
  { year: "2026", masse: 4.2 }, { year: "2027", masse: 5.1 },
  { year: "2028", masse: 5.8 }, { year: "2029", masse: 6.3 }, { year: "2030", masse: 7.0 },
];

const regions = [
  { name: "Estuaire", agents: 4521, pct: 35 },
  { name: "Haut-Ogooué", agents: 2103, pct: 16 },
  { name: "Ogooué-Maritime", agents: 1890, pct: 15 },
  { name: "Woleu-Ntem", agents: 1245, pct: 10 },
  { name: "Moyen-Ogooué", agents: 987, pct: 8 },
  { name: "Ngounié", agents: 876, pct: 7 },
  { name: "Nyanga", agents: 654, pct: 5 },
  { name: "Ogooué-Ivindo", agents: 524, pct: 4 },
];

const alerts = [
  { type: "urgent", msg: "Quota lot LOT-2026-042 atteint à 95% — action requise", time: "Il y a 2h" },
  { type: "warning", msg: "3 dossiers en attente depuis plus de 15 jours", time: "Il y a 5h" },
  { type: "info", msg: "Nouveau lot prêt pour validation financière (LOT-2026-041)", time: "Hier" },
];

const alertColor: Record<string, string> = {
  urgent: "border-l-destructive bg-destructive/5",
  warning: "border-l-warning bg-warning/5",
  info: "border-l-info bg-info/5",
};

export default function DashboardPredictif() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Tableau prédictif</h1>
          <p className="text-sm text-muted-foreground">Heatmap, KPI et projections</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard variant="primary" title="Agents intégrés (2026)" value="1,847" icon={<Users className="h-5 w-5" />} trend={{ value: 23, label: "vs 2025" }} />
          <StatCard title="Masse salariale" value="4.2 Mrd" icon={<TrendingUp className="h-5 w-5 text-accent" />} subtitle="FCFA — exercice 2026" />
          <StatCard title="Taux d'intégration" value="94.2%" icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" />
          <StatCard title="Alertes critiques" value={1} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="danger" />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Projection masse salariale 2024–2030 (Mrd FCFA)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salaryData}>
                <defs>
                  <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(150, 80%, 28%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(150, 80%, 28%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip />
                <Area type="monotone" dataKey="masse" stroke="hsl(150, 80%, 28%)" fill="url(#salaryGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Alertes & Signaux</h3>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`rounded-lg border-l-4 p-3 ${alertColor[a.type]}`}>
                  <p className="text-sm text-foreground">{a.msg}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional distribution */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            <MapPin className="inline h-4 w-4 mr-1" /> Répartition par province
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((r) => (
              <div key={r.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{r.name}</span>
                  <span className="text-muted-foreground text-xs">{r.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-secondary" style={{ width: `${r.pct}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{r.agents.toLocaleString()} agents</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
