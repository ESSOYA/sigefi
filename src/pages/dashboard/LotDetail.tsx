import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Send, Download, Eye, QrCode } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Mock data pour un lot
const lotData = {
  id: "LOT-2026-042",
  createdDate: "22/02/2026",
  status: "En constitution",
  dossiersCount: 87,
  dossiersTotal: 100,
  signature: {
    statut: "En attente",
    date: "",
    signe: false,
    hsm: false,
    mfa: false,
  },
  dossiers: [
    { id: "DOS-2026-4521", nom: "MBOUMBA Sylvie", nni: "GA-29384756", affectation: "Santé - Urgences", status: "Validé" },
    { id: "DOS-2026-4520", nom: "NDONG Pierre", nni: "GA-18273645", affectation: "Éducation - Secondaire", status: "Validé" },
    { id: "DOS-2026-4519", nom: "ONDO Marie", nni: "GA-56473829", affectation: "Justice - Tribunal", status: "Validé" },
    { id: "DOS-2026-4518", nom: "OBAME Jean", nni: "GA-93847562", affectation: "Santé - Maternité", status: "Validé" },
    { id: "DOS-2026-4517", nom: "ELLA Françoise", nni: "GA-74839201", affectation: "Admin - Central", status: "Validé" },
    // ... 82 autres dossiers omis pour brevité
  ],
  qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
};

const approvalUsersData = [
  { role: "Instructeur Principal", name: "Jean Dupont", status: "approuvé", date: "26/02/2026" },
  { role: "Chef de Service", name: "Marie Leblanc", status: "en-attente", date: "" },
  { role: "Directeur", name: "Pierre Martin", status: "en-attente", date: "" },
];

export default function LotDetail() {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);

  const progressPercent = (lotData.dossiersCount / lotData.dossiersTotal) * 100;
  const isComplete = lotData.dossiersCount === lotData.dossiersTotal;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header + navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>Retour</Button>
            <Link to="/fp/lots" className="text-sm text-muted-foreground hover:text-foreground">Liste des lots</Link>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-warning/10 text-warning">{lotData.status}</Badge>
            {isComplete && <Badge className="bg-success/10 text-success">Complet ✓</Badge>}
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-semibold text-foreground">Constitution du lot</h3>
            <span className="text-sm font-heading font-bold text-accent">{lotData.dossiersCount} / {lotData.dossiersTotal}</span>
          </div>
          <div className="h-4 rounded-full bg-muted overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isComplete ? 'bg-success' : 'bg-accent'}`} 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
          {!isComplete && (
            <p className="text-xs text-muted-foreground mt-2">
              {lotData.dossiersTotal - lotData.dossiersCount} dossiers restants pour compléter le lot
            </p>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dossiers" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dossiers">Dossiers ({lotData.dossiersCount})</TabsTrigger>
            <TabsTrigger value="approbations">Approbations</TabsTrigger>
            <TabsTrigger value="signature">Signature & Scellement</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          {/* Tab: Dossiers */}
          <TabsContent value="dossiers" className="space-y-4">
            <div className="rounded-xl border bg-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-muted-foreground border-b">
                      <th className="text-left px-4 py-3 font-medium">Référence</th>
                      <th className="text-left px-4 py-3 font-medium">Candidat</th>
                      <th className="text-left px-4 py-3 font-medium">NNI</th>
                      <th className="text-left px-4 py-3 font-medium">Affectation</th>
                      <th className="text-left px-4 py-3 font-medium">Statut</th>
                      <th className="text-left px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotData.dossiers.map((d) => (
                      <tr key={d.id} className="border-t hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">{d.id}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{d.nom}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{d.nni}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{d.affectation}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-success/10 text-success">{d.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Approbations */}
          <TabsContent value="approbations" className="space-y-4">
            <div className="space-y-3">
              {approvalUsersData.map((approval, idx) => (
                <div key={idx} className="rounded-xl border bg-card p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{approval.role}</p>
                      <p className="text-sm text-muted-foreground">{approval.name}</p>
                    </div>
                    <div className="text-right">
                      {approval.status === "approuvé" ? (
                        <div>
                          <Badge className="bg-success/10 text-success">Approuvé ✓</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{approval.date}</p>
                        </div>
                      ) : (
                        <Badge className="bg-warning/10 text-warning">En attente</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Signature & Scellement */}
          <TabsContent value="signature" className="space-y-4">
            {!signatureConfirmed ? (
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Signature Électronique & Scellement HSM
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-info/10 rounded-lg">
                    <p className="text-sm text-info font-medium">ℹ️ Résumé du lot (Hash SHA-256)</p>
                    <p className="text-xs font-mono mt-2 text-muted-foreground">a3cfe2d8b4f9e5a1c7e3d9f2b8c4e6a1d3f5b7c2a9d8e4c6a2f0b3e5d7a1c4</p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Étapes de signature</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Payload lot vérifié</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>Hash calculé</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded border border-warning" />
                        <span className="text-warning">HSM activation (prochaine étape)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded border border-muted" />
                        <span className="text-muted-foreground">MFA validation</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => setShowSignatureModal(true)}
                    disabled={!isComplete}
                  >
                    <Lock className="h-4 w-4 mr-2" /> Commencer la signature
                  </Button>
                </div>

                {/* Signature Modal */}
                {showSignatureModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-xl p-6 max-w-md w-full mx-4">
                      <h3 className="font-heading font-bold text-foreground mb-4">Signature HSM + MFA</h3>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-success/10 rounded">
                          <p className="text-sm text-success">✓ Clé HSM trouvée (RSA-2048)</p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-foreground">Code MFA (6 chiffres)</label>
                          <input 
                            type="text" 
                            maxLength={6} 
                            placeholder="000000"
                            className="w-full mt-2 px-3 py-2 border rounded text-center font-mono text-2xl tracking-widest"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          />
                          <p className="text-xs text-muted-foreground mt-1">Entrez le code de votre application authenticateur</p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-success/10 text-success hover:bg-success/20"
                            disabled={mfaCode.length !== 6}
                            onClick={() => {
                              setSignatureConfirmed(true);
                              setShowSignatureModal(false);
                              setMfaCode("");
                            }}
                          >
                            Confirmer signature
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setShowSignatureModal(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <h3 className="font-heading font-bold text-success">Lot scellé et signé ✓</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="text-muted-foreground">Date signature:</span>
                    <span className="font-medium">26/02/2026 15:30</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="text-muted-foreground">Signataire:</span>
                    <span className="font-medium">Admin FP System</span>
                  </div>
                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                    <span className="text-muted-foreground">Certificat:</span>
                    <span className="font-mono text-xs">...e5d7a1c4</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Send className="h-4 w-4 mr-2" /> Envoyer au Budget
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Tab: QR Code */}
          <TabsContent value="qr" className="space-y-4">
            <div className="rounded-xl border bg-card p-8 shadow-card flex flex-col items-center">
              <h3 className="font-heading font-semibold text-foreground mb-4">QR Code Lot</h3>
              <div className="p-4 bg-white rounded-lg border">
                <img src={lotData.qrCode} alt="Lot QR Code" className="w-48 h-48" />
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">Scannez pour vérifier l'intégrité du lot</p>
              <Button variant="outline" className="mt-4">
                <Download className="h-4 w-4 mr-2" /> Télécharger QR
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
