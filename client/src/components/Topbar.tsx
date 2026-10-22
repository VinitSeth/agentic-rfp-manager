export type TopbarUser = {
  initials: string;
  name: string;
  role: string;
};

type TopbarProps = {
  tenantLabel: string;
  user: TopbarUser;
};

export function Topbar({ tenantLabel, user }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="tenant-select" aria-label="Tenant selector">
        <span>{tenantLabel}</span>
        <span className="caret">⌄</span>
      </div>

      <div className="topbar-actions">
        <button type="button" className="icon-button" aria-label="Search">
          ⌕
        </button>
        <button type="button" className="icon-button" aria-label="Notifications">
          🔔
        </button>

        <div className="user-badge" aria-label={`${user.name} avatar`}>
          {user.initials}
        </div>

        <div className="user-meta">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
    </header>
  );
}
