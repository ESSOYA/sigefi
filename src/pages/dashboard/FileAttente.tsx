import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dossiers = [
  { id: "DOS-2026-4521", nom: "MBOUMBA Sylvie", nni: "GA-29384756", diplome: "Master Droit", score: 94, status: "En attente", date: "26/02/2026", priorite: "Haute" },
  { id: "DOS-2026-4520", nom: "NDONG Pierre", nni: "GA-18273645", diplome: "Licence Éco", score: 87, status: "En attente", date: "25/02/2026", priorite: "Normale" },
  { id: "DOS-2026-4519", nom: "ONDO Marie", nni: "GA-56473829", diplome: "BTS Informatique", score: 72, status: "Complément", date: "25/02/2026", priorite: "Normale" },
  { id: "DOS-2026-4518", nom: "OBAME Jean", nni: "GA-93847562", diplome: "Doctorat Médecine", score: 98, status: "En attente", date: "24/02/2026", priorite: "Haute" },
  { id: "DOS-2026-4517", nom: "ELLA Françoise", nni: "GA-74839201", diplome: "Ingénieur Civil", score: 91, status: "En attente", date: "24/02/2026", priorite: "Normale" },
  { id: "DOS-2026-4516", nom: "NZENG Arnaud", nni: "GA-12938475", diplome: "Master Finance", score: 85, status: "En attente", date: "23/02/2026", priorite: "Basse" },
  { id: "DOS-2026-4515", nom: "ALLOGHO Claire", nni: "GA-65748392", diplome: "Licence Admin", score: 68, status: "En attente", date: "23/02/2026", priorite: "Normale" },
  { id: "DOS-2026-4514", nom: "MOUSSAVOU Paul", nni: "GA-38291047", diplome: "Master Gestion", score: 89, status: "En attente", date: "22/02/2026", priorite: "Haute" },
];

const statusColor: Record<string, string> = {
  "En attente": "bg-warning/10 text-warning",
  "Complément": "bg-info/10 text-info",
};

const prioriteColor: Record<string, string> = {
  "Haute": "bg-destructive/10 text-destructive",
  "Normale": "bg-muted text-muted-foreground",
  "Basse": "bg-success/10 text-success",
};

export default function FileAttente() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = dossiers.filter(d => d.nom.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">File d'attente</h1>
            <p className="text-sm text-muted-foreground">{dossiers.length} dossiers en attente de traitement</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-10 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Filtres</Button>
          </div>
        </div>

        {/* Quota gauge */}
        <div className="rounded-xl border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Jauge Lot en cours</span>
            <span className="text-sm font-heading font-bold text-accent">87 / 100</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-accent-gradient rounded-full transition-all" style={{ width: "87%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">13 dossiers restants pour compléter le lot</p>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Référence</th>
                  <th className="text-left px-4 py-3 font-medium">Candidat</th>
                  <th className="text-left px-4 py-3 font-medium">NNI</th>
                  <th className="text-left px-4 py-3 font-medium">Diplôme</th>
                  <th className="text-left px-4 py-3 font-medium">Score IA</th>
                  <th className="text-left px-4 py-3 font-medium">Priorité</th>
                  <th className="text-left px-4 py-3 font-medium">Statut</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{d.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{d.nom}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{d.nni}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.diplome}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-secondary" style={{ width: `${d.score}%` }} />
                        </div>
                        <span className="text-xs font-medium">{d.score}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${prioriteColor[d.priorite]}`}>{d.priorite}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[d.status]}`}>{d.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/fp/dossier/${d.id}`)}><Eye className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-xs text-muted-foreground">Page 1 sur 1</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" disabled><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
