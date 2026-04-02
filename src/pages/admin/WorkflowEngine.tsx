import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";

const workflows = [
  { name: "LotProcessing", status: "running", active: 12 },
  { name: "OCRExtraction", status: "idle", active: 0 },
  { name: "NotificationSender", status: "running", active: 5 },
];

export default function WorkflowEngine() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Workflow Engine</h1>
          <p className="text-sm text-muted-foreground">Contrôle des workflows gérés par Temporal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.map(w => (
            <Card key={w.name} className="p-4">
              <h3 className="font-semibold">{w.name}</h3>
              <p>Statut: {w.status}</p>
              <p>Actifs: {w.active}</p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
