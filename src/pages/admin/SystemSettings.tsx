import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SystemSettings() {
  const [lotSize, setLotSize] = useState(100);
  const [quota, setQuota] = useState(5000);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Paramètres système</h1>
          <p className="text-sm text-muted-foreground">Configurer seuils de lot, quotas et règles globales.</p>
        </div>

        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Taille lot</label>
            <Input type="number" value={lotSize} onChange={e => setLotSize(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quota maximal</label>
            <Input type="number" value={quota} onChange={e => setQuota(Number(e.target.value))} />
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Enregistrer</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
