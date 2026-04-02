import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const files = [
  { name: "dossier_001.zip", size: "2MB", date: "01/03/2026" },
  { name: "dossier_002.zip", size: "3.5MB", date: "28/02/2026" },
];

export default function ArchiveWORM() {
  const [query, setQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Archivage WORM</h1>
          <p className="text-sm text-muted-foreground">Rechercher et télécharger des archives immuables.</p>
        </div>

        <div className="flex gap-2 max-w-md">
          <Input placeholder="Rechercher fichier" value={query} onChange={e => setQuery(e.target.value)} />
          <Button size="sm">Chercher</Button>
        </div>

        <div className="space-y-2">
          {files.map(f => (
            <div key={f.name} className="flex justify-between p-2 border rounded">
              <span>{f.name}</span>
              <span>{f.size}</span>
              <span>{f.date}</span>
              <Button variant="ghost" size="sm">Télécharger</Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
