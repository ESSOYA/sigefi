import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SandboxUAT() {
  const [nom, setNom] = useState("");
  const [nni, setNni] = useState("");

  const creer = () => {
    // simulate creation
    alert(`Dossier fictif créé pour ${nom} (${nni})`);
    setNom("");
    setNni("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Sandbox / UAT</h1>
          <p className="text-sm text-muted-foreground">Créer des dossiers fictifs pour tester les workflows.</p>
        </div>

        <div className="max-w-md space-y-3">
          <Input placeholder="Nom du candidat" value={nom} onChange={e => setNom(e.target.value)} />
          <Input placeholder="NNI" value={nni} onChange={e => setNni(e.target.value)} />
          <Button size="sm" onClick={creer} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Créer dossier test
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
