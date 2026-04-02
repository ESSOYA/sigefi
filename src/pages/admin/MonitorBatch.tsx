import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const jobs = [
  { id: 101, lot: "124", status: "succès", date: "02/03/2026 08:12" },
  { id: 102, lot: "125", status: "erreur", date: "02/03/2026 09:01" },
  { id: 103, lot: "126", status: "en cours", date: "02/03/2026 09:45" },
];

export default function MonitorBatch() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Monitor Batch</h1>
          <p className="text-sm text-muted-foreground">Suivi des transmissions FP→Budget.</p>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Lot</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(j => (
                <TableRow key={j.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{j.id}</TableCell>
                  <TableCell>{j.lot}</TableCell>
                  <TableCell>{j.status}</TableCell>
                  <TableCell>{j.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Détails</Button>
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
