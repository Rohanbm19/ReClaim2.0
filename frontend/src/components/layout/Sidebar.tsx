import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Search,
  FileCheck2,
  PlusSquare,
  Package,
  Bell,
  User,
  HelpCircle,
  ShieldCheck,
  Copy,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const navItems = [
  { to: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { to: ROUTES.browse, label: "Browse Items", icon: Search },
  { to: ROUTES.myClaims, label: "My Claims", icon: FileCheck2 },
  { to: ROUTES.report, label: "Report Item", icon: PlusSquare },
  { to: ROUTES.myItems, label: "My Items", icon: Package },


  { to: ROUTES.help, label: "Help & Support", icon: HelpCircle },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-sidebar text-sidebar-foreground min-h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-8">
        <div className="h-10 w-10 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-[var(--shadow-elevated)]">
          <ShieldCheck className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <div className="font-semibold leading-tight text-sidebar-primary-foreground">
            Campus Lost &amp; Found
          </div>
          <div className="text-xs text-sidebar-foreground/60">Blockchain Based System</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = path === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-elevated)]"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Wallet */}
      <div className="m-3 p-4 rounded-xl border border-sidebar-border bg-sidebar-accent/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium">Wallet Connected</span>
        </div>
        <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
          <span className="font-mono">0x7a3...9f2e</span>
          <button aria-label="Copy address" className="hover:text-sidebar-foreground">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        <a
          href="#"
          className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View on Explorer <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="p-3 pt-0">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
