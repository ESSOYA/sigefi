

import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, FileText, CheckCircle2, XCircle, MessageSquare, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ministeres = ["Santé", "Éducation", "Administration", "Justice", "Finances"];
const services = { "Santé": ["Urgences", "Pharmacie", "Maternité"], "Éducation": ["Secondaire", "Primaire", "Supérieur"] };
const categories = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function ComparateurIA() {
  const [selectedMinistere, setSelectedMinistere] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLieu, setSelectedLieu] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [validationAction, setValidationAction] = useState<string | null>(null);
  const [motifRefus, setMotifRefus] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header + navigation */}
        
      <div>
      <h1 className="text-2xl font-bold mb-4">Affectation administrative</h1>
      <Card className="p-6">
        <p>Page d'affectation administrative (ministère, service, lieu, catégorie). Elle sera utilisée pour diriger les dossiers vers le bon organisme.</p>
      </Card>
    </div>
       
      </div>
    </DashboardLayout>
  );
}
