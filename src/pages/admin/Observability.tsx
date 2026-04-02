import DashboardLayout from "@/components/DashboardLayout";

export default function Observability() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Observabilité</h1>
          <p className="text-sm text-muted-foreground">Tableaux Grafana intégrés et création d'alertes.</p>
        </div>

        <div className="h-[500px] bg-muted flex items-center justify-center rounded-lg">
          <p className="text-muted-foreground">[IFrame Grafana placeholder]</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
