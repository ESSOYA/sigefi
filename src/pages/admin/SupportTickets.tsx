import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const tickets = [
  { id: "T-001", sujet: "Problème de login", statut: "ouvert" },
  { id: "T-002", sujet: "Erreur envoi lot", statut: "en cours" },
  { id: "T-003", sujet: "Demande fonction", statut: "résolu" },
];

export default function SupportTickets() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Support & Tickets</h1>
          <p className="text-sm text-muted-foreground">Liste des tickets utilisateurs et actions de réponse.</p>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(t => (
                <TableRow key={t.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.sujet}</TableCell>
                  <TableCell>{t.statut}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Voir</Button>
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
