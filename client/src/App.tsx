import { ActivityList, type ActivityItem } from "./components/ActivityList";
import { LifecycleChart, type ChartItem } from "./components/LifecycleChart";
import { MetricCard, type Metric } from "./components/MetricCard";
import { RequirementReviewCard } from "./components/RequirementReviewCard";
import { Sidebar, type SidebarItem } from "./components/Sidebar";
import { StepProgress, type StepItem } from "./components/StepProgress";
import { Topbar } from "./components/Topbar";
import { VendorPage } from "./components/VendorPage";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const navItems: SidebarItem[] = [
  { label: "Home", icon: "⌂", path: "/" },
  { label: "RFPs", icon: "▣", path: "/rfps" },
  { label: "Vendors", icon: "◫", path: "/vendors" },
  { label: "Proposals", icon: "◧" },
  { label: "Analytics", icon: "▤" },
  { label: "Agent Console", icon: "◌" },
  { label: "Administration", icon: "⚙" },
];

const metrics: Metric[] = [
  { label: "Active RFPs", value: "12", change: "20% vs last month", direction: "up", tone: "green" },
  { label: "Proposals Received", value: "28", change: "40%", direction: "up", tone: "blue" },
  { label: "Avg. Cycle Time", value: "18 days", change: "30%", direction: "down", tone: "red" },
  { label: "Cost Savings (Est.)", value: "$1.2M", change: "25%", direction: "up", tone: "purple" },
];

const lifecycleData: ChartItem[] = [
  { label: "Draft", value: 8, color: "blue" },
  { label: "In Review", value: 5, color: "teal" },
  { label: "Published", value: 12, color: "green" },
  { label: "Proposals", value: 28, color: "cyan" },
  { label: "Evaluation", value: 10, color: "purple" },
  { label: "Awarded", value: 3, color: "gold" },
];

const activities: ActivityItem[] = [
  { icon: "◉", tone: "blue", title: "New proposal received from TechNova", time: "2 minutes ago" },
  { icon: "◌", tone: "gray", title: "RFP “Cloud Infrastructure” approved", time: "1 hour ago" },
  { icon: "◍", tone: "teal", title: "Vendor shortlist generated for RFP-2025-18", time: "3 hours ago" },
  { icon: "◔", tone: "purple", title: "Agent run completed: Proposal Extraction", time: "5 hours ago" },
];

const wizardSteps: StepItem[] = [
  { label: "Describe", status: "current" },
  { label: "Review & Edit", status: "upcoming" },
  { label: "Configure", status: "upcoming" },
  { label: "Generate", status: "upcoming" },
];

const draftText = `We need a managed IT services partner to support our global infrastructure for the next 3 years. Focus on 24/7 support, cybersecurity, and cloud modernization. Budget is around 5 million USD.`;

const suggestionChips = [
  "Managed application support services",
  "Cloud infrastructure and migration",
  "Cybersecurity monitoring and incident response",
];

const aiHighlights = [
  { label: "Scope", value: "Global infrastructure support" },
  { label: "Coverage", value: "24/7 support, cloud modernization" },
  { label: "Budget", value: "USD 5M over 3 years" },
];

const criticalRequirements = [
  "Dedicated service desk and escalation model",
  "Security compliance and vulnerability monitoring",
  "Cloud migration roadmap with milestones",
  "Quarterly performance reporting and optimization review",
];

function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#edf3f8] text-slate-800">
      <Sidebar items={navItems} />

      <main className="flex-1 bg-[#f3f6fb] p-3">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="mt-4 rounded-[18px] bg-white/10 px-5 py-4">
          <section className="flex items-center justify-between gap-6 px-2 pb-5 pt-2">
            <div>
              <h1 className="text-[clamp(2.1rem,2.8vw,3rem)] font-bold tracking-[-0.06em] text-slate-800">
                Good morning, Priya <span className="text-[0.8em]">👋</span>
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-600">
                Turn requirements into the right partnerships with AI agents.
              </p>
            </div>

            <Link
              to="/rfps"
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1d6fe8] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(29,111,232,0.25)] transition hover:bg-[#175fce]"
            >
              <span className="text-base">＋</span> Create New RFP
            </Link>
          </section>

          <section className="mt-2 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="RFP summary metrics">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
            <article className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-800">RFP Lifecycle Overview</h2>
              </div>

              <LifecycleChart items={lifecycleData} />
            </article>

            <aside className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-800">Recent Activity</h2>
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View all
                </button>
              </div>

              <ActivityList items={activities} />
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

function RfpPage() {
  return (
    <div className="flex min-h-screen bg-[#edf3f8] text-slate-800">
      <Sidebar items={navItems} />

      <main className="flex-1 bg-[#f3f6fb] p-3">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="mx-2 mt-4 rounded-[18px] bg-white/10 px-4 py-5">
          <header className="px-2 pb-4">
            <h1 className="text-[clamp(2.1rem,2.7vw,3rem)] font-bold tracking-[-0.06em] text-slate-800">
              Create RFP with AI
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Describe your procurement need in simple terms. Our AI agents will create a structured RFP for you.
            </p>
          </header>

          <StepProgress steps={wizardSteps} />

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-5">
              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">AI Generated Draft</span>
                </div>

                <RequirementReviewCard title="Review & edit requirement draft" value={draftText} maxLength={2000} />

                <div className="mt-5 flex flex-wrap gap-3" aria-label="Example prompts">
                  {suggestionChips.map((chip) => (
                    <button key={chip} type="button" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/rfps/ai-extracted"
                  className="inline-flex items-center justify-center rounded-xl bg-[#1d6fe8] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(29,111,232,0.25)] transition hover:bg-[#175fce]"
                >
                  Analyze Requirement →
                </Link>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
                <h3 className="mb-4 text-lg font-bold text-slate-800">AI Summary</h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  {aiHighlights.map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                      <span className="font-medium text-slate-500">{item.label}</span>
                      <strong className="text-right text-sm font-semibold text-slate-700">{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
                <h3 className="mb-4 text-lg font-bold text-slate-800">Critical Requirements</h3>
                <div className="space-y-3">
                  {criticalRequirements.map((item) => (
                    <label key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 accent-blue-600" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

function AiExtractedRequirementsPage() {
  const extractedRequirements = [
    { label: "Category", value: "Business Objective", action: "Edit" },
    { label: "Scope", value: "24/7 infrastructure support, cybersecurity, cloud migration", action: "Edit" },
    { label: "Duration", value: "3 years", action: "Edit" },
    { label: "Estimated Budget", value: "USD 5 million", action: "Edit" },
    { label: "Key Requirements", value: "24/7 support, cybersecurity capabilities, cloud modernization experience, global delivery capability", action: "Edit" },
    { label: "Evaluation Criteria", value: "Technical capability, cost, delivery model, security compliance, innovation, sustainability", action: "Edit" },
  ];

  return (
    <div className="flex min-h-screen bg-[#edf3f8] text-slate-800">
      <Sidebar items={navItems} />

      <main className="flex-1 bg-[#f3f6fb] p-3">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="mx-2 mt-4 rounded-[18px] bg-white/10 px-4 py-5">
          <header className="px-2 pb-4">
            <h1 className="text-[clamp(2.1rem,2.7vw,3rem)] font-bold tracking-[-0.06em] text-slate-800">
              AI-Extracted Requirements
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Review and refine the extracted requirements. Add missing details if needed.
            </p>
          </header>

          <div className="px-2">
            <StepProgress steps={[
              { label: "Describe", status: "complete" },
              { label: "Review & Edit", status: "current" },
              { label: "Configure", status: "upcoming" },
              { label: "Generate", status: "upcoming" },
            ]} />
          </div>

          <div className="mt-6 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_10px_18px_rgba(15,23,42,0.03)]">
            <div className="grid grid-cols-[1.2fr_2.2fr_0.6fr] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              <span>Field</span>
              <span>Value</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-slate-200">
              {extractedRequirements.map((row) => (
                <div key={row.label} className="grid grid-cols-[1.2fr_2.2fr_0.6fr] items-center gap-4 px-4 py-4 text-sm">
                  <div className="font-semibold text-slate-700">{row.label}</div>
                  <div className="text-slate-600">{row.value}</div>
                  <button type="button" className="justify-self-end rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
                    {row.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between px-2">
            <Link to="/rfps" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              ← Back
            </Link>
            <Link to="/rfps" className="inline-flex items-center justify-center rounded-xl bg-[#1d6fe8] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(29,111,232,0.25)] transition hover:bg-[#175fce]">
              Next: Configure →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rfps" element={<RfpPage />} />
      <Route path="/rfps/ai-extracted" element={<AiExtractedRequirementsPage />} />
      <Route path="/vendors" element={<VendorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;