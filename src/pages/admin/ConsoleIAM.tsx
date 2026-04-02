import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Shield, Users, Key, Activity, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const users = [
  { id: 1, nom: "NGUEMA Albert", email: "a.nguema@fp.gouv.ga", role: "Instructeur FP", service: "DRH", status: "Actif", lastLogin: "26/02/2026 09:12" },
  { id: 2, nom: "OBIANG Marie", email: "m.obiang@budget.gouv.ga", role: "Gestionnaire Budget", service: "DGB", status: "Actif", lastLogin: "26/02/2026 08:45" },
  { id: 3, nom: "NZOGHE Paul", email: "p.nzoghe@fp.gouv.ga", role: "Chef de Service", service: "DGFP", status: "Actif", lastLogin: "25/02/2026 16:30" },
  { id: 4, nom: "MINTSA Claire", email: "c.mintsa@fp.gouv.ga", role: "Directeur", service: "DGFP", status: "Actif", lastLogin: "25/02/2026 14:22" },
  { id: 5, nom: "BONGO François", email: "f.bongo@admin.gouv.ga", role: "SuperAdmin", service: "DSI", status: "Actif", lastLogin: "26/02/2026 10:01" },
  { id: 6, nom: "ELLA Sophie", email: "s.ella@budget.gouv.ga", role: "Approbateur Fin.", service: "DGB", status: "Inactif", lastLogin: "10/02/2026 11:00" },
];

const roleColor: Record<string, string> = {
  "Instructeur FP": "bg-info/10 text-info",
  "Gestionnaire Budget": "bg-accent/10 text-accent-foreground",
  "Chef de Service": "bg-secondary/10 text-secondary",
  "Directeur": "bg-secondary/20 text-secondary",
  "SuperAdmin": "bg-destructive/10 text-destructive",
  "Approbateur Fin.": "bg-warning/10 text-warning",
};

export default function ConsoleIAM() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Console IAM</h1>
          <p className="text-sm text-muted-foreground">Gestion des utilisateurs, rôles et permissions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Utilisateurs actifs" value={42} icon={<Users className="h-5 w-5 text-info" />} variant="info" />
          <StatCard title="Rôles définis" value={8} icon={<Shield className="h-5 w-5 text-secondary" />} variant="default" />
          <StatCard title="Clés HSM actives" value={3} icon={<Key className="h-5 w-5 text-accent" />} variant="default" />
          <StatCard title="Sessions actives" value={18} icon={<Activity className="h-5 w-5 text-success" />} variant="success" />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-heading font-semibold text-foreground">Utilisateurs</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-48" />
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">+ Créer</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="text-left px-5 py-3 font-medium">Nom</th>
                  <th className="text-left px-5 py-3 font-medium">Email</th>
                  <th className="text-left px-5 py-3 font-medium">Rôle</th>
                  <th className="text-left px-5 py-3 font-medium">Service</th>
                  <th className="text-left px-5 py-3 font-medium">Statut</th>
                  <th className="text-left px-5 py-3 font-medium">Dernier accès</th>
                  <th className="text-left px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{u.nom}</td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColor[u.role] || "bg-muted text-muted-foreground"}`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{u.service}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${u.status === "Actif" ? "text-success" : "text-muted-foreground"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${u.status === "Actif" ? "bg-success" : "bg-muted-foreground"}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">{u.lastLogin}</td>
                    <td className="px-5 py-3">
                      <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
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
