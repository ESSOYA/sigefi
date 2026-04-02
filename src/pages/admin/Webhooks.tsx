import DashboardLayout from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Webhook {
  id: string;
  url: string;
  secret: string;
  active: boolean;
}

const initial: Webhook[] = [
  { id: "w1", url: "https://fp.example.com/hook", secret: "••••••", active: true },
  { id: "w2", url: "https://budget.example.com/hook", secret: "••••••", active: false },
];

export default function Webhooks() {
  const [hooks, setHooks] = useState(initial);
  const [url, setUrl] = useState("");

  const add = () => {
    if (!url) return;
    setHooks([{ id: `w${hooks.length+1}`, url, secret: "••••••", active: true }, ...hooks]);
    setUrl("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Gestion Webhooks</h1>
          <p className="text-sm text-muted-foreground">Configurer les endpoints, secrets et tester les envois.</p>
        </div>

        <div className="flex gap-2">
          <Input placeholder="Nouvel URL" value={url} onChange={e => setUrl(e.target.value)} />
          <Button size="sm" onClick={add} className="bg-primary text-primary-foreground hover:bg-primary/90">Ajouter</Button>
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Secret</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hooks.map(h => (
                <TableRow key={h.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{h.id}</TableCell>
                  <TableCell>{h.url}</TableCell>
                  <TableCell>{h.secret}</TableCell>
                  <TableCell>{h.active ? "oui" : "non"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Tester</Button>
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
