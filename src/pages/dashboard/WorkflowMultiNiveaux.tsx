import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Send, MessageSquare, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Mock données de workflow
const workflowDossiers = [
  {
    id: "DOS-2026-4521",
    nom: "MBOUMBA Sylvie",
    stage: "Instructeur",
    status: "En cours",
    instructeur: "Jean Dupont",
    chefService: "Marie Leblanc",
    directeur: "Pierre Martin",
    timeline: [
      { role: "Instructeur", date: "26/02/2026 08:00", action: "Débutée", statut: "en-cours" },
      { role: "Chef de Service", date: "—", action: "En attente", statut: "attente" },
      { role: "Directeur", date: "—", action: "Pas encore", statut: "attente" },
    ],
    motif: ""
  },
  {
    id: "DOS-2026-4520",
    nom: "NDONG Pierre",
    stage: "Chef de Service",
    status: "En attente",
    instructeur: "Jean Dupont",
    chefService: "Marie Leblanc",
    directeur: "Pierre Martin",
    timeline: [
      { role: "Instructeur", date: "25/02/2026 14:30", action: "Validée", statut: "complete" },
      { role: "Chef de Service", date: "25/02/2026 15:00", action: "En cours", statut: "en-cours" },
      { role: "Directeur", date: "—", action: "Pas encore", statut: "attente" },
    ],
    motif: ""
  },
  {
    id: "DOS-2026-4519",
    nom: "ONDO Marie",
    stage: "Directeur",
    status: "Approuvée",
    instructeur: "Jean Dupont",
    chefService: "Marie Leblanc",
    directeur: "Pierre Martin",
    timeline: [
      { role: "Instructeur", date: "24/02/2026 10:00", action: "Validée", statut: "complete" },
      { role: "Chef de Service", date: "24/02/2026 16:00", action: "Approuvée", statut: "complete" },
      { role: "Directeur", date: "25/02/2026 09:30", action: "En course", statut: "en-cours" },
    ],
    motif: ""
  },
  {
    id: "DOS-2026-4518",
    nom: "OBAME Jean",
    stage: "Terminé",
    status: "Approuvée",
    instructeur: "Jean Dupont",
    chefService: "Marie Leblanc",
    directeur: "Pierre Martin",
    timeline: [
      { role: "Instructeur", date: "23/02/2026 11:00", action: "Validée", statut: "complete" },
      { role: "Chef de Service", date: "23/02/2026 17:00", action: "Approuvée", statut: "complete" },
      { role: "Directeur", date: "24/02/2026 10:00", action: "Approuvée", statut: "complete" },
    ],
    motif: "Prêt pour quota"
  },
];

const stageColor: Record<string, string> = {
  "Instructeur": "bg-warning/10 text-warning",
  "Chef de Service": "bg-info/10 text-info",
  "Directeur": "bg-accent/10 text-accent-foreground",
  "Terminé": "bg-success/10 text-success",
};

const statusColor: Record<string, string> = {
  "En cours": "bg-info/10 text-info",
  "En attente": "bg-warning/10 text-warning",
  "Approuvée": "bg-success/10 text-success",
  "Rejetée": "bg-destructive/10 text-destructive",
};

export default function WorkflowMultiNiveaux() {
  const myApprovals = workflowDossiers.filter(d => {
    const current = d.timeline.find(t => t.statut === "en-cours");
    return current?.role === "Chef de Service"; // Example: filter for current user
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Workflow Multi-niveaux</h1>
            <p className="text-sm text-muted-foreground">Suivi des approbations Instructeur → Chef de Service → Directeur</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>Retour</Button>
            <Link to="/fp/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard FP</Link>
          </div>
        </div>

        <Tabs defaultValue="tous" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tous">Tous ({workflowDossiers.length})</TabsTrigger>
            <TabsTrigger value="mes-approbations">Mes approbations ({myApprovals.length})</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="en-attente">En attente</TabsTrigger>
          </TabsList>

          {/* Tab: Tous les dossiers */}
          <TabsContent value="tous" className="space-y-4">
            <div className="space-y-4">
              {workflowDossiers.map((dossier) => (
                <div key={dossier.id} className="rounded-xl border bg-card p-4 shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-semibold text-foreground">{dossier.nom}</h3>
                        <Badge variant="outline" className="text-xs">{dossier.id}</Badge>
                      </div>
                      
                      {/* Pipeline visuel */}
                      <div className="flex items-center gap-2 mb-3 text-xs">
                        {dossier.timeline.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="flex flex-col items-center">
                              {step.statut === "complete" && <CheckCircle2 className="h-4 w-4 text-success" />}
                              {step.statut === "en-cours" && <Clock className="h-4 w-4 text-warning animate-spin" />}
                              {step.statut === "attente" && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                            </div>
                            <div>
                              <p className="font-medium">{step.role}</p>
                              <p className="text-muted-foreground text-xs">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {dossier.timeline.map((step, idx) => (
                          <div key={idx} className="p-2 bg-muted/50 rounded">
                            <p className="font-medium">{step.role}</p>
                            <p className="text-muted-foreground">{step.action}</p>
                            <p className="text-xs mt-1 font-mono">
                              {step.statut === "complete" && "✓ Validée"}
                              {step.statut === "en-cours" && "⏳ En cours"}
                              {step.statut === "attente" && "⌛ En attente"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Badge className={statusColor[dossier.status]}>
                        {dossier.status}
                      </Badge>
                      <Badge className={stageColor[dossier.stage]}>
                        {dossier.stage}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" /> Détail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Mes approbations */}
          <TabsContent value="mes-approbations" className="space-y-4">
            {myApprovals.length === 0 ? (
              <div className="rounded-xl border bg-card p-8 shadow-card text-center">
                <p className="text-muted-foreground">Aucun dossier en attente d'approbation</p>
              </div>
            ) : (
              myApprovals.map((dossier) => (
                <div key={dossier.id} className="rounded-xl border bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{dossier.nom}</h3>
                      <p className="text-xs text-muted-foreground">{dossier.id} • Attendant votre approbation</p>
                    </div>
                    <Badge className={statusColor[dossier.status]}>Attente</Badge>
                  </div>

                  <div className="space-y-3">
                    {/* Résumé */}
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-muted/50 rounded">
                        <p className="text-muted-foreground">Instructeur</p>
                        <p className="font-medium">{dossier.instructeur}</p>
                      </div>
                      <div className="p-2 bg-muted/50 rounded">
                        <p className="text-muted-foreground">Chef de Service (Vous)</p>
                        <p className="font-medium">{dossier.chefService}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t">
                      <Button className="flex-1 bg-success/10 text-success hover:bg-success/20">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Approuver
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <AlertCircle className="h-4 w-4 mr-2" /> Demander révision
                      </Button>
                      <Button variant="outline" className="px-3">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* Tab: Statistiques */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-4">Répartition par stage</h3>
                <div className="space-y-2">
                  {Object.entries(
                    workflowDossiers.reduce((acc: Record<string, number>, d) => {
                      acc[d.stage] = (acc[d.stage] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([stage, count]) => (
                    <div key={stage} className="flex items-center justify-between text-sm">
                      <span>{stage}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: `${(count / workflowDossiers.length) * 100}%` }} />
                        </div>
                        <span className="font-mono text-xs">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5 shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-4">Temps moyen par étape</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Instructeur</span>
                    <span className="font-mono">1.2 jours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Chef de Service</span>
                    <span className="font-mono">2.1 jours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Directeur</span>
                    <span className="font-mono">1.8 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: En attente */}
          <TabsContent value="en-attente" className="space-y-4">
            {workflowDossiers
              .filter(d => d.timeline.some(t => t.statut === "attente"))
              .map((dossier) => (
                <div key={dossier.id} className="rounded-xl border bg-card p-4 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-foreground">{dossier.nom}</h3>
                    <Badge className="bg-warning/10 text-warning">En attente</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{dossier.id}</p>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" /> Voir les détails
                  </Button>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
