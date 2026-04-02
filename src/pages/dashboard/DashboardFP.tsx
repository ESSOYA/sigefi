import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Users, FileText, CheckCircle2, AlertTriangle, Clock, TrendingUp, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate, useLocation } from "react-router-dom";

const barData = [
  { name: "Jan", dossiers: 120 }, { name: "Fév", dossiers: 98 },
  { name: "Mar", dossiers: 145 }, { name: "Avr", dossiers: 167 },
  { name: "Mai", dossiers: 189 }, { name: "Jun", dossiers: 210 },
];

const pieData = [
  { name: "Validés", value: 654, color: "hsl(150, 60%, 40%)" },
  { name: "En attente", value: 234, color: "hsl(45, 95%, 55%)" },
  { name: "Refusés", value: 45, color: "hsl(0, 72%, 51%)" },
  { name: "Complément", value: 67, color: "hsl(210, 80%, 52%)" },
];

const recentDossiers = [
  { id: "DOS-2026-4521", nom: "MBOUMBA Sylvie", status: "En cours", date: "26/02/2026" },
  { id: "DOS-2026-4520", nom: "NDONG Pierre", status: "Validé", date: "25/02/2026" },
  { id: "DOS-2026-4519", nom: "ONDO Marie", status: "Complément", date: "25/02/2026" },
  { id: "DOS-2026-4518", nom: "OBAME Jean", status: "Refusé", date: "24/02/2026" },
  { id: "DOS-2026-4517", nom: "ELLA Françoise", status: "Validé", date: "24/02/2026" },
];

const statusColor: Record<string, string> = {
  "Validé": "bg-success/10 text-success",
  "En cours": "bg-info/10 text-info",
  "Complément": "bg-warning/10 text-warning",
  "Refusé": "bg-destructive/10 text-destructive",
};

export default function DashboardFP() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get("role");
  const role = roleParam || (localStorage.getItem("user_role") ?? "instructeur");
  const location = useLocation();
  const isBudget = location.pathname.startsWith("/budget");
  const isFP = ["instructeur", "chef", "directeur"].includes(role.toLowerCase()) || location.pathname.startsWith("/fp");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard Fonction Publique</h1>
          <p className="text-sm text-muted-foreground">Vue d'ensemble des dossiers d'intégration</p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Dossiers en attente" value={234} icon={<Clock className="h-5 w-5 text-warning" />} variant="warning" trend={{ value: -12, label: "vs semaine" }} />
          {isFP ? (
            <button onClick={() => navigate("/fp/lots")} className="cursor-pointer">
              <StatCard title="Quota actuel" value="87/100" icon={<Package className="h-5 w-5 text-info" />} variant="info" subtitle="Lot en cours de constitution" />
            </button>
          ) : (
            <StatCard title="Quota actuel" value="—" icon={<Package className="h-5 w-5 text-info" />} variant="muted" subtitle="—" />
          )}
          <StatCard title="Validés ce mois" value={654} icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" trend={{ value: 8, label: "vs mois dernier" }} />
          <StatCard title="Alertes" value={3} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="danger" subtitle="Dossiers à traiter en urgence" />
        </div>

        {/* Actions rapides */}
        <div className="grid sm:grid-cols-3 gap-3">
          <Button 
            className="bg-warning/10 text-warning hover:bg-warning/20 justify-between"
            onClick={() => navigate("/fp/file-attente")}
          >
            <span>Aller à la file d'attente</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            className="bg-info/10 text-info hover:bg-info/20 justify-between"
            onClick={() => navigate("/fp/lots")}
          >
            <span>Gérer les lots (87/100)</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            className="bg-accent/10 text-accent-foreground hover:bg-accent/20 justify-between"
            onClick={() => navigate("/fp/workflow")}
          >
            <span>Suivi multi-niveaux</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Dossiers traités par mois</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 45%)" />
                <Tooltip />
                <Bar dataKey="dossiers" fill="hsl(150, 80%, 28%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-4">Répartition des statuts</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI & actions variant selon côté */}
        {isFP ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button onClick={() => navigate("/fp/file-attente")} className="cursor-pointer">
                <StatCard title="Dossiers en attente" value={234} icon={<Clock className="h-5 w-5 text-warning" />} variant="warning" trend={{ value: -12, label: "vs semaine" }} />
              </button>
              <button onClick={() => navigate("/fp/lots")} className="cursor-pointer">
                <StatCard title="Quota actuel" value="87/100" icon={<Package className="h-5 w-5 text-info" />} variant="info" subtitle="Lot en cours de constitution" />
              </button>
              <button onClick={() => navigate("/fp/workflow")} className="cursor-pointer">
                <StatCard title="Validés ce mois" value={654} icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" trend={{ value: 8, label: "vs mois dernier" }} />
              </button>
              <StatCard title="Alertes" value={3} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="danger" subtitle="Dossiers à traiter en urgence" />
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <Button 
                className="bg-warning/10 text-warning hover:bg-warning/20 justify-between"
                onClick={() => navigate("/fp/file-attente")}
              >
                <span>Aller à la file d'attente</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="bg-info/10 text-info hover:bg-info/20 justify-between"
                onClick={() => navigate("/fp/lots")}
              >
                <span>Gérer les lots (87/100)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="bg-accent/10 text-accent-foreground hover:bg-accent/20 justify-between"
                onClick={() => navigate("/fp/workflow")}
              >
                <span>Suivi multi-niveaux</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : isBudget ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Lots reçus" value={12} icon={<Package className="h-5 w-5 text-info" />} variant="info" />
            <StatCard title="Postes vacants" value={432} icon={<Users className="h-5 w-5 text-accent" />} variant="default" />
            <StatCard title="Simulation récente" value="OK" icon={<TrendingUp className="h-5 w-5 text-success" />} variant="success" />
            <StatCard title="Alertes financières" value={1} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} variant="danger" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Vue générale" value="—" icon={<Users className="h-5 w-5 text-muted-foreground" />} variant="default" />
            <StatCard title="Statut système" value="OK" icon={<CheckCircle2 className="h-5 w-5 text-success" />} variant="success" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
