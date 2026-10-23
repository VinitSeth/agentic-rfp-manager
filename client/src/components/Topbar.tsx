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
<<<<<<< HEAD
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
=======
    <header className="flex min-h-[80px] items-center justify-between gap-5 px-2 py-4">
      <div
        aria-label="Tenant selector"
        className="flex min-w-[320px] items-center gap-2 rounded-xl border border-[rgba(150,173,198,0.4)] bg-white/60 px-4 py-3 text-[0.98rem] font-medium text-[#254a6d] shadow-[0_1px_0_rgba(17,26,44,0.04)]"
      >
        <span>{tenantLabel}</span>
        <span className="ml-auto text-[1.15rem] text-[#496b8b]">⌄</span>
      </div>

      <div className="ml-auto flex items-center gap-3.5">
        <button type="button" className="grid h-9 w-9 place-items-center rounded-xl border border-[rgba(143,164,184,0.35)] bg-white/60 text-[1.2rem] text-[#375d82]" aria-label="Search">
          ⌕
        </button>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-xl border border-[rgba(143,164,184,0.35)] bg-white/60 text-[1.2rem] text-[#375d82]" aria-label="Notifications">
          🔔
        </button>

        <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-gradient-to-b from-[#3d81ff] to-[#152a8b] text-sm font-bold text-[#f2f7ff] shadow-[0_10px_18px_rgba(53,82,168,0.22)]" aria-label={`${user.name} avatar`}>
          {user.initials}
        </div>

        <div className="flex min-w-[150px] flex-col items-start justify-center">
          <span className="text-[1.02rem] font-bold text-[#122e4e]">{user.name}</span>
          <span className="text-[0.82rem] text-[#5d7185]">{user.role}</span>
>>>>>>> main
        </div>
      </div>
    </header>
  );
}
