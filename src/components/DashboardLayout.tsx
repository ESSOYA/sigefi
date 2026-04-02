import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Users, Package, BarChart3, Settings, Shield,
  ChevronDown, LogOut, Bell, Search, Menu, X, Building2, Wallet,
  TrendingUp, FolderOpen, CheckCircle2, AlertTriangle, Activity, ArrowRightLeft,
  Home, LogIn, UserPlus, Lock, QrCode, Info,
  Key, Wifi, Mail, Wrench, Archive, Upload, HelpCircle,
  LineChart, MapPin
} from "lucide-react";
import { useState } from "react";
import gabonEmblem from "@/assets/gabon-emblem.png";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  children?: { label: string; path: string }[];
}

const publicNav: NavItem[] = [
  { label: "Accueil", path: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Connexion", path: "/login", icon: <LogIn className="h-4 w-4" /> },
  { label: "Inscription", path: "/signup", icon: <UserPlus className="h-4 w-4" /> },
  { label: "Mot de passe", path: "/reset-password", icon: <Lock className="h-4 w-4" /> },
  { label: "Vérification QR", path: "/verification-qr", icon: <QrCode className="h-4 w-4" /> },
  { label: "Mentions", path: "/mentions-legales", icon: <Info className="h-4 w-4" /> },
];

const fpNav: NavItem[] = [
  { label: "Dashboard", path: "/fp/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "File d'attente", path: "/fp/file-attente", icon: <FileText className="h-4 w-4" /> },
  { label: "Gestion des lots", path: "/fp/lots", icon: <Package className="h-4 w-4" /> },
  { label: "Workflow", path: "/fp/workflow", icon: <Users className="h-4 w-4" /> },
  { label: "Comparateur IA", path: "/fp/comparateur-ia", icon: <Activity className="h-4 w-4" /> },
  { label: "Affectation", path: "/fp/affectation", icon: <Building2 className="h-4 w-4" /> },
  { label: "Quotas", path: "/fp/quotas", icon: <TrendingUp className="h-4 w-4" /> },
];

const budgetNav: NavItem[] = [
  { label: "Dashboard", path: "/budget/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Lots reçus", path: "/budget/lots-recus", icon: <FolderOpen className="h-4 w-4" /> },
  { label: "Postes budgétaires", path: "/budget/postes", icon: <Wallet className="h-4 w-4" /> },
  { label: "Simulation", path: "/budget/simulation", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Validation fin.", path: "/budget/validation-financiere", icon: <CheckCircle2 className="h-4 w-4" /> },
  { label: "Envoi réponse", path: "/budget/envoi-reponse", icon: <ArrowRightLeft className="h-4 w-4" /> },
];

const ministreNav: NavItem[] = [
  { label: "Tableau de bord", path: "/ministre/dashboard", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Prédictif", path: "/ministre/predictif", icon: <MapPin className="h-4 w-4" /> },
  { label: "Projection", path: "/ministre/projection", icon: <LineChart className="h-4 w-4" /> },
  { label: "Alertes", path: "/ministre/alertes", icon: <Bell className="h-4 w-4" /> },
];

const adminNav: NavItem[] = [
  { label: "Console IAM", path: "/admin/iam", icon: <Shield className="h-4 w-4" /> },
  { label: "Users", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { label: "Roles", path: "/admin/roles", icon: <Settings className="h-4 w-4" /> },
];

// sections for professional admin sidebar
const adminSections = [
  {
    title: "IAM & Sécurité",
    items: [
      { label: "Console IAM", path: "/admin/iam", icon: <Shield className="h-4 w-4" /> },
      { label: "Utilisateurs", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
      { label: "Rôles & Perms", path: "/admin/roles", icon: <Settings className="h-4 w-4" /> },
      { label: "Clés HSM", path: "/admin/keys", icon: <Key className="h-4 w-4" /> },
    ],
  },
  {
    title: "Opérations & Monitoring",
    items: [
      { label: "Dashboard Ops", path: "/admin/ops", icon: <BarChart3 className="h-4 w-4" /> },
      { label: "Batch Monitor", path: "/admin/batch", icon: <Activity className="h-4 w-4" /> },
      { label: "Queue Manager", path: "/admin/queues", icon: <Package className="h-4 w-4" /> },
      { label: "OCR Monitor", path: "/admin/ocr", icon: <FileText className="h-4 w-4" /> },
      { label: "Workflow Engine", path: "/admin/workflow", icon: <Users className="h-4 w-4" /> },
      { label: "Observabilité", path: "/admin/observability", icon: <Activity className="h-4 w-4" /> },
      { label: "Logs & Audit", path: "/admin/logs", icon: <CheckCircle2 className="h-4 w-4" /> },
      { label: "Security Center", path: "/admin/security", icon: <Shield className="h-4 w-4" /> },
    ],
  },
  {
    title: "Config & Intégrations",
    items: [
      { label: "Paramètres système", path: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
      { label: "Webhooks", path: "/admin/webhooks", icon: <Wifi className="h-4 w-4" /> },
      { label: "Templates notif.", path: "/admin/templates", icon: <Mail className="h-4 w-4" /> },
      { label: "Sandbox / UAT", path: "/admin/sandbox", icon: <Wrench className="h-4 w-4" /> },
      { label: "Archivage WORM", path: "/admin/archive", icon: <Archive className="h-4 w-4" /> },
      { label: "Import/Export CSV", path: "/admin/csv", icon: <Upload className="h-4 w-4" /> },
      { label: "Support / Tickets", path: "/admin/support", icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
];

const navSections = [
  { title: "Public", items: [] },
  { title: "Fonction Publique", items: fpNav },
  { title: "Budget", items: budgetNav },
  { title: "Ministre", items: ministreNav },
  { title: "Administration", items: adminNav },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // sidebar always icon rail, no collapse state
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // generate active items based on path prefix (used in header nav)
  const getActiveItems = (): NavItem[] => {
    const p = location.pathname;
    if (p === "/" || p.startsWith("/login") || p.startsWith("/signup") || p.startsWith("/reset-password") || p.startsWith("/verification-qr") || p.startsWith("/mentions-legales")) {
      return publicNav;
    }
    if (p.startsWith("/fp")) return fpNav;
    if (p.startsWith("/budget")) return budgetNav;
    if (p.startsWith("/ministre")) return ministreNav;
    if (p.startsWith("/admin")) return adminNav;
    return [...fpNav, ...budgetNav, ...ministreNav, ...adminNav];
  };
  const activeItems = getActiveItems();

  // admin path gets a unique sidebar layout
  if (location.pathname.startsWith("/admin")) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <aside className="w-64 bg-card border-r overflow-y-auto">
          <div className="p-4 font-bold">Administration</div>
          {adminSections.map((sec) => (
            <div key={sec.title} className="mt-4">
              <p className="px-4 text-xs uppercase text-muted-foreground">{sec.title}</p>
              <nav className="mt-1 space-y-1">
                {sec.items.map((it) => (
                  <Link
                    key={it.path}
                    to={it.path}
                    className={cn(
                      "flex items-center px-4 py-2 rounded text-sm",
                      location.pathname === it.path
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-primary hover:text-white"
                    )}
                  >
                    {it.icon && <span className="mr-2">{it.icon}</span>}
                    {it.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-4 py-2 border-b bg-card">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Panel</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Rechercher..." className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" />
              </div>
              <button className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                AD
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex flex-col bg-card px-4 lg:px-6">
          <div className="flex items-center justify-center h-10">
            {/* centered magic nav bar */}
            <div className="flex-1 flex justify-center">
              <nav className="flex space-x-6">
                {activeItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110",
                        isActive
                          ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg"
                          : "bg-card text-sidebar-foreground hover:bg-primary hover:text-white"
                      )}
                    >
                      {item.icon}
                      <span className="absolute bottom-full mb-1 w-max whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 transition-opacity hover:opacity-100">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="w-5" /> {/* placeholder for right area */}
          </div>
          {/* second row with search and notifications */}
          <div className="flex items-center justify-between h-14 border-t border-muted/20">
            <div className="hidden md:flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 w-full max-w-xl">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Rechercher..." className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
