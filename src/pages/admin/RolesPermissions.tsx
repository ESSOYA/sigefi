import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

interface Role {
  id: string;
  name: string;
  description: string;
}

const initialRoles: Role[] = [
  { id: "r-1", name: "Instructeur FP", description: "Peut traiter les dossiers FP" },
  { id: "r-2", name: "Gestionnaire Budget", description: "Accès aux fonctions budgétaires" },
  { id: "r-3", name: "SuperAdmin", description: "Tous droits" },
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addRole = () => {
    if (!newName) return;
    const id = `r-${(Math.random() * 900 + 100).toFixed(0)}`;
    setRoles([{ id, name: newName, description: newDesc }, ...roles]);
    setNewName("");
    setNewDesc("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des rôles & permissions</h1>
          <p className="text-sm text-muted-foreground">Créer, modifier ou supprimer des rôles; attribuer des permissions.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Input
            placeholder="Nom du rôle"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="max-w-xs"
          />
          <Input
            placeholder="Description"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={addRole} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ajouter rôle
          </Button>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(r => (
                <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Modifier</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Supprimer</Button>
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
