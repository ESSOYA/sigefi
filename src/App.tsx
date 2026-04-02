import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerificationQR from "./pages/VerificationQR";
import MentionsLegales from "./pages/MentionsLegales";
import ResetPassword from "./pages/ResetPassword";
import DashboardFP from "./pages/dashboard/DashboardFP";
import FileAttente from "./pages/dashboard/FileAttente";
import GestionLots from "./pages/dashboard/GestionLots";
import DossierDetail from "./pages/dashboard/DossierDetail";
import WorkflowMultiNiveaux from "./pages/dashboard/WorkflowMultiNiveaux";
import LotDetail from "./pages/dashboard/LotDetail";
import ComparateurIA from "./pages/dashboard/ComparateurIA";
import AffectationAdmin from "./pages/dashboard/AffectationAdmin";
import DashboardBudget from "./pages/dashboard/DashboardBudget";
import LotsRecus from "./pages/budget/LotsRecus";
import SimulationBudget from "./pages/budget/SimulationBudget";
import InventairePostes from "./pages/budget/InventairePostes";
import AutoAssignation from "./pages/budget/AutoAssignation";
import ValidationManuelle from "./pages/budget/ValidationManuelle";
import ValidationFinanciere from "./pages/budget/ValidationFinanciere";
import EnvoiReponseFP from "./pages/budget/EnvoiReponseFP";
import DashboardMinistre from "./pages/dashboard/DashboardMinistre";
import DashboardPredictif from "./pages/ministre/DashboardPredictif";
import ProjectionMasseSalariale from "./pages/ministre/ProjectionMasseSalariale";
import AlertesApprovals from "./pages/ministre/AlertesApprovals";
import ConsoleIAM from "./pages/admin/ConsoleIAM";
import Users from "./pages/admin/Users";
import RolesPermissions from "./pages/admin/RolesPermissions";
import HSMKeys from "./pages/admin/HSMKeys";
import DashboardOps from "./pages/admin/DashboardOps";
import MonitorBatch from "./pages/admin/MonitorBatch";
import QueueManager from "./pages/admin/QueueManager";
import OCRMonitor from "./pages/admin/OCRMonitor";
import WorkflowEngine from "./pages/admin/WorkflowEngine";
import Observability from "./pages/admin/Observability";
import LogsAudit from "./pages/admin/LogsAudit";
import SecurityCenter from "./pages/admin/SecurityCenter";
import SystemSettings from "./pages/admin/SystemSettings";
import Webhooks from "./pages/admin/Webhooks";
import TemplatesNotifications from "./pages/admin/TemplatesNotifications";
import SandboxUAT from "./pages/admin/SandboxUAT";
import ArchiveWORM from "./pages/admin/ArchiveWORM";
import ImportExportCSV from "./pages/admin/ImportExportCSV";
import SupportTickets from "./pages/admin/SupportTickets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification-qr" element={<VerificationQR />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />

          {/* Fonction Publique */}
          <Route path="/fp/dashboard" element={<DashboardFP />} />
          <Route path="/fp/file-attente" element={<FileAttente />} />
          <Route path="/fp/lots" element={<GestionLots />} />
          <Route path="/fp/dossier/:id" element={<DossierDetail />} />
          <Route path="/fp/workflow" element={<WorkflowMultiNiveaux />} />
          <Route path="/fp/comparateur-ia" element={<ComparateurIA />} />
          <Route path="/fp/affectation" element={<AffectationAdmin />} />
          <Route path="/fp/lot/:id" element={<LotDetail />} />
          <Route path="/fp/quotas" element={<DashboardFP />} />

          {/* Budget */}
          <Route path="/budget/dashboard" element={<DashboardBudget />} />
          <Route path="/budget/lots-recus" element={<LotsRecus />} />
          <Route path="/budget/simulation" element={<SimulationBudget />} />
          <Route path="/budget/postes" element={<InventairePostes />} />
          <Route path="/budget/auto-assign" element={<AutoAssignation />} />
          <Route path="/budget/validation-manuelle" element={<ValidationManuelle />} />
          <Route path="/budget/validation-financiere" element={<ValidationFinanciere />} />
          <Route path="/budget/envoi-reponse" element={<EnvoiReponseFP />} />

          {/* Ministre */}
          <Route path="/ministre/dashboard" element={<DashboardMinistre />} />
          <Route path="/ministre/predictif" element={<DashboardPredictif />} />
          <Route path="/ministre/projection" element={<ProjectionMasseSalariale />} />
          <Route path="/ministre/alertes" element={<AlertesApprovals />} />

          {/* Admin */}
          <Route path="/admin/iam" element={<ConsoleIAM />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/roles" element={<RolesPermissions />} />
          <Route path="/admin/keys" element={<HSMKeys />} />
          <Route path="/admin/ops" element={<DashboardOps />} />
          <Route path="/admin/batch" element={<MonitorBatch />} />
          <Route path="/admin/queues" element={<QueueManager />} />
          <Route path="/admin/ocr" element={<OCRMonitor />} />
          <Route path="/admin/workflow" element={<WorkflowEngine />} />
          <Route path="/admin/observability" element={<Observability />} />
          <Route path="/admin/logs" element={<LogsAudit />} />
          <Route path="/admin/security" element={<SecurityCenter />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/webhooks" element={<Webhooks />} />
          <Route path="/admin/templates" element={<TemplatesNotifications />} />
          <Route path="/admin/sandbox" element={<SandboxUAT />} />
          <Route path="/admin/archive" element={<ArchiveWORM />} />
          <Route path="/admin/csv" element={<ImportExportCSV />} />
          <Route path="/admin/support" element={<SupportTickets />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
