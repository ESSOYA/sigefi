import DashboardLayout from "@/components/DashboardLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TemplatesNotifications() {
  const [template, setTemplate] = useState("Bonjour {{user}}, votre dossier a été traité.");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Templates Notifications</h1>
          <p className="text-sm text-muted-foreground">Éditez les templates pour email, SMS et push.</p>
        </div>

        <div className="space-y-2 max-w-2xl">
          <label className="block text-sm font-medium">Template général</label>
          <Textarea value={template} onChange={e => setTemplate(e.target.value)} rows={6} />
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Sauvegarder</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
