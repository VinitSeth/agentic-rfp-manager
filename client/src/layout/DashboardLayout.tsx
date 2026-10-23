import type { ReactNode } from "react";
import { Sidebar, type SidebarItem } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
  navItems: SidebarItem[];
};

export function DashboardLayout({
  children,
  navItems,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-shell">
      <Sidebar items={navItems} />

      <main className="main-panel">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{
            initials: "P",
            name: "Priya Sharma",
            role: "Procurement Lead",
          }}
        />

        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}