import { Sidebar, type SidebarItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import { VendorTable, type Vendor } from "./VendorTable";

const navItems: SidebarItem[] = [
  { label: "Home", icon: "⌂", path: "/" },
  { label: "RFPs", icon: "▣", path: "/rfps" },
  { label: "Vendors", icon: "◫", path: "/vendors", active: true },
  { label: "Proposals", icon: "◧" },
  { label: "Analytics", icon: "▤" },
  { label: "Agent Console", icon: "◌" },
  { label: "Administration", icon: "⚙" },
];

const vendors: Vendor[] = [
  {
    name: "TechNova Solutions",
    matchScore: 92,
    strengths: ["Cloud", "Cybersecurity", "Global Delivery"],
    location: "USA",
  },
  {
    name: "Global IT Partners",
    matchScore: 88,
    strengths: ["Managed Services", "Cost Efficiency"],
    location: "UK",
  },
  {
    name: "NextGen Systems",
    matchScore: 85,
    strengths: ["Infrastructure", "Automation"],
    location: "India",
  },
  {
    name: "SecureSoft",
    matchScore: 82,
    strengths: ["Security", "Compliance"],
    location: "Germany",
  },
  {
    name: "CloudMatrix",
    matchScore: 78,
    strengths: ["Cloud Migration", "DevOps"],
    location: "Canada",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2.2]">
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16L21 21" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[2.2]">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  );
}

export function VendorPage() {
  return (
    <div className="flex min-h-screen bg-[#edf3f8] text-slate-800">
      <Sidebar items={navItems} />

      <main className="flex-1 bg-[#f3f6fb] p-3">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="mt-3 rounded-[18px] bg-[#f7fafc]/80 px-6 py-5">
          <div className="mb-5">
            <h1 className="text-[2.2rem] font-bold tracking-[-0.06em] text-slate-800">Recommended Vendors</h1>
            <p className="mt-2 text-[1.08rem] text-slate-600">
              AI has identified the following vendors based on your requirements.
            </p>
          </div>

          <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-[#f2f5f8] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex flex-1 items-center gap-3 px-2">
              <span className="text-slate-500">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search vendors..."
                className="w-full border-0 bg-transparent text-[1rem] text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <FilterIcon />
              Filter
            </button>
          </div>

          <VendorTable vendors={vendors} />

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg text-slate-500">
                ‹
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold ${
                      page === 1
                        ? "bg-[#1d6fe8] text-white shadow-[0_4px_10px_rgba(29,111,232,0.2)]"
                        : "border border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600">
                  ...
                </button>
              </div>

              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg text-slate-500">
                ›
              </button>
            </div>

            <div className="text-sm font-medium text-slate-500">Showing 1–5 of 14 vendors</div>
          </div>
        </div>
      </main>
    </div>
  );
}
