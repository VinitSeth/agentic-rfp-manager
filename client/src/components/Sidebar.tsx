import { NavLink } from "react-router-dom";

export type SidebarItem = {
  label: string;
  icon: string;
  path?: string;
  active?: boolean;
};

type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar({ items }: SidebarProps) {
  return (
<<<<<<< HEAD
    <aside className="sidebar">
      <div className="brand-wrap">
        <div className="brand">Capgemini</div>
        <span className="brand-mark">◌</span>
      </div>

      <nav className="nav" aria-label="Main navigation">
=======
    <aside className="flex w-[255px] flex-col bg-gradient-to-b from-[#0a2d4d] to-[#0d3c68] p-4 text-[#eff7ff] shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]">
      <div className="mb-3 flex items-center gap-2 px-2 pb-4 pt-2">
        <div className="text-[2.05rem] font-bold tracking-[-0.06em] leading-none">Capgemini</div>
        <span className="-translate-y-1.5 text-xs text-[#eaf4ff] opacity-90">◌</span>
      </div>

      <nav className="mt-2 flex flex-col gap-2" aria-label="Main navigation">
>>>>>>> main
        {items.map((item) => {
          if (item.path) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
<<<<<<< HEAD
                className={({ isActive }) => `nav-item ${isActive || item.active ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
=======
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[1.05rem] font-medium transition ${
                    isActive || item.active
                      ? "bg-gradient-to-r from-[#1b74e6] to-[#1a6cd2] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_10px_18px_rgba(27,116,230,0.28)]"
                      : "bg-transparent text-[rgba(234,244,255,0.82)] hover:bg-white/5"
                  }`
                }
              >
                <span className="inline-flex w-5 justify-center text-lg opacity-95">{item.icon}</span>
>>>>>>> main
                <span>{item.label}</span>
              </NavLink>
            );
          }

          return (
<<<<<<< HEAD
            <button key={item.label} className={`nav-item ${item.active ? "active" : ""}`} type="button">
              <span className="nav-icon">{item.icon}</span>
=======
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[1.05rem] font-medium transition ${
                item.active
                  ? "bg-gradient-to-r from-[#1b74e6] to-[#1a6cd2] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_10px_18px_rgba(27,116,230,0.28)]"
                  : "bg-transparent text-[rgba(234,244,255,0.82)] hover:bg-white/5"
              }`}
            >
              <span className="inline-flex w-5 justify-center text-lg opacity-95">{item.icon}</span>
>>>>>>> main
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

<<<<<<< HEAD
      <div className="sidebar-footer">
        <p>
=======
      <div className="mt-auto px-2 pb-1 pt-8 text-[rgba(218,234,249,0.88)]">
        <p className="m-0 text-[0.9rem] font-semibold leading-[1.45] tracking-[-0.03em]">
>>>>>>> main
          Smarter
          <br />
          Procurement.
          <br />
          Greater Possibilities.
        </p>
      </div>
    </aside>
  );
}
