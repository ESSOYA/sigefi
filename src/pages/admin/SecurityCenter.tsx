import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const incidents = [
  { id: 1, type: "failed login", user: "unknown", ip: "10.0.0.5", time: "02/03/2026 07:55" },
  { id: 2, type: "policy change", user: "f.bongo", ip: "192.168.1.10", time: "01/03/2026 18:22" },
];

export default function SecurityCenter() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Security Center</h1>
          <p className="text-sm text-muted-foreground">Surveillance des incidents de sécurité.</p>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Utilisateur/IP</TableHead>
                <TableHead>Horodatage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map(i => (
                <TableRow key={i.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.type}</TableCell>
                  <TableCell>{`${i.user} / ${i.ip}`}</TableCell>
                  <TableCell>{i.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
