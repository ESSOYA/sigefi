import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Users, TrendingUp, AlertTriangle, CheckCircle2, MapPin, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { useState } from "react";

const salaryData = [
  { year: "2024", masse: 3.8 }, { year: "2025", masse: 4.0 },
  { year: "2026", masse: 4.2 }, { year: "2027", masse: 5.1 },
  { year: "2028", masse: 5.8 }, { year: "2029", masse: 6.3 }, { year: "2030", masse: 7.0 },
];

const simulationData = [
  { year: 2026, optimiste: 4.2, pessimiste: 4.1, base: 4.2 },
  { year: 2027, optimiste: 4.6, pessimiste: 4.4, base: 4.5 },
  { year: 2028, optimiste: 5.2, pessimiste: 4.8, base: 5.0 },
  { year: 2029, optimiste: 5.9, pessimiste: 5.2, base: 5.5 },
  { year: 2030, optimiste: 6.7, pessimiste: 5.7, base: 6.0 },
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

export default function DashboardMinistre() {
  const [activeTab, setActiveTab] = useState("projection");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Exécutive Header - Custom Layout */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-heading font-bold mb-2">Tableau de bord exécutif</h1>
          <p className="text-blue-100">Vue synthétique et décisionnelle pour le Ministre — horizon 2026–2030</p>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard variant="primary" title="Agents intégrés (2026)" value="1,847" icon={<Users className="h-5 w-5" />} trend={{ value: 23, label: "vs 2025" }} />
          <StatCard title="Masse salariale" value="4.2 Mrd" icon={<TrendingUp className="h-5 w-5 text-accent" />} subtitle="FCFA — exercice 2026" />
          <StatCard title="Taux d'intégration" value="94.2%" icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" />
          <StatCard title="Alertes critiques" value={1} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="danger" />
        </div>

        {/* Tab Navigation */}
        <div className="border-b flex gap-6">
          <button
            onClick={() => setActiveTab("projection")}
            className={`pb-3 px-2 font-medium text-sm transition ${
              activeTab === "projection"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Projection masse salariale
          </button>
          <button
            onClick={() => setActiveTab("simulation")}
            className={`pb-3 px-2 font-medium text-sm transition ${
              activeTab === "simulation"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Simulation 5 ans
          </button>
          <button
            onClick={() => setActiveTab("regional")}
            className={`pb-3 px-2 font-medium text-sm transition ${
              activeTab === "regional"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Répartition régionale
          </button>
        </div>

        {/* Projection Masse Salariale Tab */}
        {activeTab === "projection" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Historique & Projection 2024–2030</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={salaryData}>
                  <defs>
                    <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(150, 80%, 28%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(150, 80%, 28%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" label={{ value: "Mrd FCFA", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(val) => `${val} Mrd FCFA`} />
                  <Area type="monotone" dataKey="masse" stroke="hsl(150, 80%, 28%)" fill="url(#salaryGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <h4 className="font-semibold mb-3">Composantes principales</h4>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Rémunérations :</span> 68% de la masse</li>
                  <li><span className="font-medium">Cotisations :</span> 18% — légales & conventions</li>
                  <li><span className="font-medium">Indemnités :</span> 8% — transport, logement</li>
                  <li><span className="font-medium">Autres :</span> 6% — primes, avantages</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <h4 className="font-semibold mb-3">Hypothèses retenues</h4>
                <ul className="space-y-2 text-sm">
                  <li>✓ Augmentation moyenne : +5% annuelle</li>
                  <li>✓ Entrées nettes : +0.8% par an</li>
                  <li>✓ Cotisations sociales stables</li>
                  <li>✓ Inflation indexée UEMOA ≈ 3%</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Simulation 5 ans Tab */}
        {activeTab === "simulation" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Scénarios de simulation 2026–2030</h3>
              <p className="text-sm text-muted-foreground mb-4">Trois scénarios de masse salariale selon conditions économiques</p>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: "Mrd FCFA", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(val) => `${val} Mrd FCFA`} />
                  <Bar dataKey="pessimiste" fill="hsl(0, 80%, 60%)" name="Scénario pessimiste" />
                  <Bar dataKey="base" fill="hsl(210, 80%, 56%)" name="Scénario base" />
                  <Bar dataKey="optimiste" fill="hsl(150, 80%, 28%)" name="Scénario optimiste" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-red-200 bg-red-50/30 p-4 shadow-card">
                <h4 className="font-semibold text-red-900 mb-2">Pessimiste</h4>
                <p className="text-xs text-red-800 mb-3">Hypothèses : inflation haute, faible croissance</p>
                <ul className="text-xs text-red-900 space-y-1">
                  <li>• Augmentation : 3.5% annuelle</li>
                  <li>• Inflation : 7–8%</li>
                  <li>• 2030 : 5.7 Mrd FCFA</li>
                </ul>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 shadow-card">
                <h4 className="font-semibold text-blue-900 mb-2">Base</h4>
                <p className="text-xs text-blue-800 mb-3">Hypothèses : croissance modérée, stabilité</p>
                <ul className="text-xs text-blue-900 space-y-1">
                  <li>• Augmentation : 5% annuelle</li>
                  <li>• Inflation : 3–4%</li>
                  <li>• 2030 : 6.0 Mrd FCFA</li>
                </ul>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50/30 p-4 shadow-card">
                <h4 className="font-semibold text-green-900 mb-2">Optimiste</h4>
                <p className="text-xs text-green-800 mb-3">Hypothèses : forte croissance, contrôle inflation</p>
                <ul className="text-xs text-green-900 space-y-1">
                  <li>• Augmentation : 6.5% annuelle</li>
                  <li>• Inflation : 2%</li>
                  <li>• 2030 : 6.7 Mrd FCFA</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Répartition Régionale Tab */}
        {activeTab === "regional" && (
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              <MapPin className="inline h-5 w-5 mr-2" /> Répartition par province (2026)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.map((r) => (
                <div key={r.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{r.name}</span>
                    <span className="text-xs font-bold text-blue-700">{r.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${r.pct}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{r.agents.toLocaleString()} agents</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alertes & Signaux */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Alertes & Signaux critiques</h3>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className={`rounded-lg border-l-4 p-4 ${alertColor[a.type]}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{a.msg}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-foreground/10">{a.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
