import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, CheckCircle2, XCircle, MessageSquare, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Mock data - Un dossier candidat détaillé
const dossierData = {
  id: "DOS-2026-4521",
  cui: "INT-2026-00542",
  nom: "MBOUMBA",
  prenoms: "Sylvie",
  nni: "GA-29384756",
  dateNaissance: "15/06/1992",
  lieuNaissance: "Libreville",
  email: "sylvie.mboumba@email.com",
  telephone: "+241-01-22-33-44",
  score: 94,
  documents: [
    { id: 1, nom: "Diplôme Master", type: "pdf", ocr: { statut: "OK", confiance: 98, donnees: "Master Droit Public - Université d'Abidjan" } },
    { id: 2, nom: "Casier Judiciaire", type: "pdf", ocr: { statut: "OK", confiance: 96, donnees: "Néant" } },
    { id: 3, nom: "Extrait Naissance", type: "pdf", ocr: { statut: "ALERTE", confiance: 72, donnees: "Date formatage incertain" } },
    { id: 4, nom: "Photo d'identité", type: "jpg", ocr: { statut: "OK", confiance: 99, donnees: "Conforme" } },
  ],
  documents_scan: [
    { id: 1, nom: "Diplôme Master.pdf", size: "2.3 MB", date: "25/02/2026" },
    { id: 2, nom: "Casier Judiciaire.pdf", size: "1.8 MB", date: "25/02/2026" },
    { id: 3, nom: "Extrait de Naissance.pdf", size: "0.9 MB", date: "25/02/2026" },
    { id: 4, nom: "Foto ID.jpg", size: "1.2 MB", date: "25/02/2026" },
  ],
};

const comparateurIA = {
  diplome: { score: 98, statut: "Conforme", details: "Master Droit reconnu, établissement accrédité" },
  experience: { score: 87, statut: "Valide", details: "5 ans d'expérience documentée" },
  identite: { score: 96, statut: "Conforme", details: "Documents d'identité authentiques" },
  flags: [
    { type: "info", message: "Date de naissance cohérente avec âge déclaré" },
    { type: "success", message: "Aucun antécédent détecté" },
    { type: "warning", message: "Établissement non trouvé dans base – vérification manuelle conseillée" },
  ],
};

const ministeres = ["Santé", "Éducation", "Administration", "Justice", "Finances"];
const services = { "Santé": ["Urgences", "Pharmacie", "Maternité"], "Éducation": ["Secondaire", "Primaire", "Supérieur"] };
const categories = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function DossierDetail() {
  const [selectedMinistere, setSelectedMinistere] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLieu, setSelectedLieu] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [validationAction, setValidationAction] = useState<string | null>(null);
  const [motifRefus, setMotifRefus] = useState("");

  const ocrAlerte = dossierData.documents.some(d => d.ocr.statut === "ALERTE");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header + navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>Retour</Button>
            <Link to="/fp/file-attente" className="text-sm text-muted-foreground hover:text-foreground">Voir la file d'attente</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">{dossierData.nom} {dossierData.prenoms}</h1>
            <p className="text-sm text-muted-foreground">Référence: <span className="font-mono">{dossierData.id}</span> • CUI: <span className="font-mono">{dossierData.cui}</span></p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm">{dossierData.score}% Confiance</Badge>
            {ocrAlerte && <Badge variant="destructive" className="text-sm">⚠️ Alertes OCR</Badge>}
          </div>
        </div>

        {/* Infos personnelles */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border bg-card p-4 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-3">Identité</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">NNI :</span><span className="font-mono">{dossierData.nni}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date naissance :</span><span>{dossierData.dateNaissance}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Lieu naissance :</span><span>{dossierData.lieuNaissance}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email :</span><span>{dossierData.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Téléphone :</span><span>{dossierData.telephone}</span></div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-3">Documents soumis</h3>
            <ul className="space-y-2">
              {dossierData.documents_scan.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.nom}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs pour Comparateur IA, Documents, Workflow */}
        <Tabs defaultValue="comparateur" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comparateur">Comparateur IA</TabsTrigger>
            <TabsTrigger value="documents">Documents OCR</TabsTrigger>
            <TabsTrigger value="affectation">Affectation</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
          </TabsList>

          {/* Tab: Comparateur IA */}
          <TabsContent value="comparateur" className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="font-heading font-semibold text-foreground mb-4">Analyse IA - Conformité</h3>
              
              <div className="space-y-4">
                {/* Scores */}
                {Object.entries(comparateurIA).map(([key, value]) => {
                  if (key === "flags") return null;
                  const v = value as any;
                  return (
                    <div key={key} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm capitalize">{key}</span>
                        <Badge className={v.statut === "Conforme" ? "bg-success/10 text-success" : "bg-info/10 text-info"}>
                          {v.score}% • {v.statut}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{v.details}</p>
                    </div>
                  );
                })}

                {/* Flags */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Signaux détectés</h4>
                  <div className="space-y-2">
                    {comparateurIA.flags.map((flag, idx) => (
                      <div key={idx} className="flex gap-2 text-sm">
                        {flag.type === "success" && <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />}
                        {flag.type === "warning" && <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />}
                        {flag.type === "info" && <AlertCircle className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />}
                        <span className="text-muted-foreground">{flag.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Documents OCR */}
          <TabsContent value="documents" className="space-y-4">
            {dossierData.documents.map((doc) => (
              <div key={doc.id} className="rounded-xl border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{doc.nom}</h4>
                    <p className="text-xs text-muted-foreground">Type: {doc.type.toUpperCase()}</p>
                  </div>
                  <Badge className={
                    doc.ocr.statut === "OK" ? "bg-success/10 text-success" :
                    doc.ocr.statut === "ALERTE" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }>
                    {doc.ocr.statut} ({doc.ocr.confiance}%)
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded text-sm">
                  <p className="text-muted-foreground">{doc.ocr.donnees}</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">Voir l'original</Button>
                  <Button size="sm" variant="outline">Corriger OCR</Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Tab: Affectation */}
          <TabsContent value="affectation" className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Affectation Administrative
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Ministère</label>
                  <Select value={selectedMinistere} onValueChange={setSelectedMinistere}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner ministère" /></SelectTrigger>
                    <SelectContent>
                      {ministeres.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService} disabled={!selectedMinistere}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner service" /></SelectTrigger>
                    <SelectContent>
                      {selectedMinistere && services[selectedMinistere as keyof typeof services]?.map(s => 
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Lieu géographique</label>
                  <Select value={selectedLieu} onValueChange={setSelectedLieu}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner lieu" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="libreville">Libreville</SelectItem>
                      <SelectItem value="port-gentil">Port-Gentil</SelectItem>
                      <SelectItem value="franceville">Franceville</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Catégorie (A/B/C)</label>
                  <Select value={selectedCategorie} onValueChange={setSelectedCategorie}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner catégorie" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedMinistere && selectedService && selectedLieu && selectedCategorie && (
                <div className="mt-4 p-3 bg-success/10 rounded-lg text-sm">
                  <p className="text-success font-medium">✓ Affectation complète: {selectedCategorie} • {selectedService} ({selectedMinistere}) • {selectedLieu}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Workflow */}
          <TabsContent value="workflow" className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="font-heading font-semibold text-foreground mb-4">Historique du Workflow</h3>
              
              <div className="space-y-3">
                <div className="flex gap-3 pb-3 border-b">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-success" /></div>
                    <div className="h-8 w-0.5 bg-muted/30"></div>
                  </div>
                  <div className="pb-3">
                    <p className="font-medium text-sm">Dépôt reçu</p>
                    <p className="text-xs text-muted-foreground">25/02/2026 14:30 • Système</p>
                  </div>
                </div>

                <div className="flex gap-3 pb-3 border-b">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center"><AlertCircle className="h-4 w-4 text-info" /></div>
                    <div className="h-8 w-0.5 bg-muted/30"></div>
                  </div>
                  <div className="pb-3">
                    <p className="font-medium text-sm">En attente instruction</p>
                    <p className="text-xs text-muted-foreground">26/02/2026 08:00 • Instructeur A</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center"><MessageSquare className="h-4 w-4 text-warning" /></div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">En attente de votre action</p>
                    <p className="text-xs text-muted-foreground">Maintenant</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions Validation */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-heading font-semibold text-foreground mb-4">Actions de Validation</h3>
          
          {validationAction === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                className="bg-success/10 text-success hover:bg-success/20" 
                onClick={() => setValidationAction("valider")}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" /> Valider
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setValidationAction("demander-complement")}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Demander complément
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setValidationAction("escalader")}
              >
                <ArrowRight className="h-4 w-4 mr-2" /> Escalader
              </Button>
              <Button 
                className="bg-destructive/10 text-destructive hover:bg-destructive/20" 
                onClick={() => setValidationAction("refuser")}
              >
                <XCircle className="h-4 w-4 mr-2" /> Refuser
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <p className="text-sm"><strong>Action sélectionnée:</strong> {validationAction}</p>
              
              {validationAction === "refuser" && (
                <div>
                  <label className="text-sm font-medium text-foreground">Motif du refus</label>
                  <textarea 
                    className="w-full mt-2 p-2 border rounded text-sm" 
                    placeholder="Expliquer le motif..."
                    rows={3}
                    value={motifRefus}
                    onChange={(e) => setMotifRefus(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button className="bg-success/10 text-success hover:bg-success/20">
                  Confirmer
                </Button>
                <Button variant="outline" onClick={() => setValidationAction(null)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
