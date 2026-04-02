import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, RefreshCcw, FileText } from "lucide-react";
import { useState } from "react";

interface HsmKey {
  id: string;
  label: string;
  created: string;
  status: "active" | "rotating" | "expired";
}

const initialKeys: HsmKey[] = [
  { id: "k-001", label: "Master-Key", created: "01/01/2025", status: "active" },
  { id: "k-002", label: "Signing-Key-1", created: "15/06/2025", status: "rotating" },
  { id: "k-003", label: "Backup-Key", created: "10/02/2026", status: "expired" },
];

export default function HSMKeys() {
  const [keys, setKeys] = useState<HsmKey[]>(initialKeys);
  const [newLabel, setNewLabel] = useState("");

  const addKey = () => {
    if (!newLabel) return;
    const id = `k-${(Math.random() * 900 + 100).toFixed(0)}`;
    setKeys([{ id, label: newLabel, created: new Date().toLocaleDateString("fr-FR"), status: "active" }, ...keys]);
    setNewLabel("");
  };

  const rotateKey = (id: string) => {
    setKeys(keys.map(k => k.id === id ? { ...k, status: "rotating" } : k));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestion des clés HSM</h1>
          <p className="text-sm text-muted-foreground">Créez, faites tourner et consultez l'historique des clés HSM utilisées pour la signature/mTLS.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            placeholder="Nouvelle clé label"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            className="max-w-xs"
          />
          <Button size="sm" onClick={addKey} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Key className="mr-2 h-4 w-4" /> Générer
          </Button>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Libellé</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((k) => (
                <TableRow key={k.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{k.id}</TableCell>
                  <TableCell>{k.label}</TableCell>
                  <TableCell>{k.created}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      k.status === "active" ? "text-success" : k.status === "rotating" ? "text-warning" : "text-destructive"
                    }`}>{k.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => rotateKey(k.id)}>
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
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
