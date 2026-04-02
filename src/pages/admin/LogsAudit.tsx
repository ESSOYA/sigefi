import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const entries = [
  { id: 1, user: "a.nguema", action: "login", time: "02/03/2026 08:12" },
  { id: 2, user: "m.obiang", action: "create key", time: "02/03/2026 09:20" },
  { id: 3, user: "p.nzoghe", action: "rotate key", time: "02/03/2026 10:05" },
];

export default function LogsAudit() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Logs & Audit</h1>
          <p className="text-sm text-muted-foreground">Recherche et export de l'historique des actions.</p>
        </div>

        <div className="max-w-md">
          <Input placeholder="Rechercher par utilisateur ou action" />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Horodatage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(e => (
                <TableRow key={e.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{e.id}</TableCell>
                  <TableCell>{e.user}</TableCell>
                  <TableCell>{e.action}</TableCell>
                  <TableCell>{e.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
