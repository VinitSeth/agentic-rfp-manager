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
    <aside className="sidebar">
      <div className="brand-wrap">
        <div className="brand">Capgemini</div>
        <span className="brand-mark">◌</span>
      </div>

      <nav className="nav" aria-label="Main navigation">
        {items.map((item) => {
          if (item.path) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `nav-item ${isActive || item.active ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          }

          return (
            <button key={item.label} className={`nav-item ${item.active ? "active" : ""}`} type="button">
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>
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
