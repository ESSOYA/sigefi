import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const tasks = [
  { id: 201, dossier: "A-123", status: "success" },
  { id: 202, dossier: "B-456", status: "error" },
  { id: 203, dossier: "C-789", status: "retry" },
];

export default function OCRMonitor() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">OCR Monitor</h1>
          <p className="text-sm text-muted-foreground">Suivi des tâches d'extraction OCR.</p>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Dossier</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(t => (
                <TableRow key={t.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.dossier}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === "success" ? "success" : t.status === "error" ? "destructive" : "warning"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
