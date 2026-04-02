import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  service: string;
  status: "Actif" | "Inactif";
  lastLogin: string;
}

const initialUsers: User[] = [
  { id: 1, nom: "NGUEMA Albert", email: "a.nguema@fp.gouv.ga", role: "Instructeur FP", service: "DRH", status: "Actif", lastLogin: "26/02/2026 09:12" },
  { id: 2, nom: "OBIANG Marie", email: "m.obiang@budget.gouv.ga", role: "Gestionnaire Budget", service: "DGB", status: "Actif", lastLogin: "26/02/2026 08:45" },
  { id: 3, nom: "NZOGHE Paul", email: "p.nzoghe@fp.gouv.ga", role: "Chef de Service", service: "DGFP", status: "Actif", lastLogin: "25/02/2026 16:30" },
  { id: 4, nom: "MINTSA Claire", email: "c.mintsa@fp.gouv.ga", role: "Directeur", service: "DGFP", status: "Actif", lastLogin: "25/02/2026 14:22" },
  { id: 5, nom: "BONGO François", email: "f.bongo@admin.gouv.ga", role: "SuperAdmin", service: "DSI", status: "Actif", lastLogin: "26/02/2026 10:01" },
  { id: 6, nom: "ELLA Sophie", email: "s.ella@budget.gouv.ga", role: "Approbateur Fin.", service: "DGB", status: "Inactif", lastLogin: "10/02/2026 11:00" },
];

const roleColor: Record<string, string> = {
  "Instructeur FP": "bg-info/10 text-info",
  "Gestionnaire Budget": "bg-accent/10 text-accent-foreground",
  "Chef de Service": "bg-secondary/10 text-secondary",
  "Directeur": "bg-secondary/20 text-secondary",
  "SuperAdmin": "bg-destructive/10 text-destructive",
  "Approbateur Fin.": "bg-warning/10 text-warning",
};

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNom, setNewNom] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const filtered = users.filter(u => u.nom.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.includes(searchTerm));

  const addUser = () => {
    if (!newNom || !newEmail) return;
    const newId = Math.max(...users.map(u => u.id)) + 1;
    setUsers([{ id: newId, nom: newNom, email: newEmail, role: "Instructeur FP", service: "DSI", status: "Actif", lastLogin: new Date().toLocaleString("fr-FR") }, ...users]);
    setNewNom("");
    setNewEmail("");
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Actif" ? "Inactif" : "Actif" } : u));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestion Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">Créez, modifiez et supprimez des utilisateurs du système.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Input
            placeholder="Nouveau nom"
            value={newNom}
            onChange={e => setNewNom(e.target.value)}
            className="max-w-xs"
          />
          <Input
            placeholder="Email"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={addUser} className="bg-primary text-primary-foreground hover:bg-primary/90">
            + Créer
          </Button>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Rechercher utilisateur..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernier accès</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => (
                <TableRow key={u.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{u.nom}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColor[u.role] || "bg-muted text-muted-foreground"}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell>{u.service}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium cursor-pointer ${
                      u.status === "Actif" ? "text-success" : "text-muted-foreground"
                    }`} onClick={() => toggleStatus(u.id)}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        u.status === "Actif" ? "bg-success" : "bg-muted-foreground"
                      }`} />
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{u.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteUser(u.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
