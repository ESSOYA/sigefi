import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const exports = [
  { file: "postes_2026-03-01.csv", size: "120KB" },
  { file: "rapports_mars.csv", size: "80KB" },
];

export default function ImportExportCSV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Import/Export CSV</h1>
          <p className="text-sm text-muted-foreground">Importer des listes de postes ou exporter des rapports.</p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".csv"
            onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
          />
          <Button size="sm" disabled={!selectedFile}>
            Importer
          </Button>
        </div>

        <div className="space-y-2">
          {exports.map(ex => (
            <div key={ex.file} className="flex justify-between items-center">
              <span>{ex.file} ({ex.size})</span>
              <Button variant="ghost" size="sm">Télécharger</Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
