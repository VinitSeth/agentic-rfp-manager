import "./App.css";
import { ActivityList, type ActivityItem } from "./components/ActivityList";
import { LifecycleChart, type ChartItem } from "./components/LifecycleChart";
import { MetricCard, type Metric } from "./components/MetricCard";
import { RequirementReviewCard } from "./components/RequirementReviewCard";
import { Sidebar, type SidebarItem } from "./components/Sidebar";
import { StepProgress, type StepItem } from "./components/StepProgress";
import { Topbar } from "./components/Topbar";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const navItems: SidebarItem[] = [
  { label: "Home", icon: "⌂", path: "/" },
  { label: "RFPs", icon: "▣", path: "/rfps" },
  { label: "Vendors", icon: "◫" },
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
    <div className="dashboard-shell">
      <Sidebar items={navItems} />

      <main className="main-panel">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="content-area">
          <section className="hero-row">
            <div className="welcome-copy">
              <h1>
                Good morning, Priya <span className="wave">👋</span>
              </h1>
              <p>Turn requirements into the right partnerships with AI agents.</p>
            </div>

            <Link to="/rfps" type="button" className="primary-button">
              <span>＋</span> Create New RFP
            </Link>
          </section>

          <section className="metrics-grid" aria-label="RFP summary metrics">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="lower-grid">
            <article className="panel chart-panel">
              <div className="panel-header">
                <h2>RFP Lifecycle Overview</h2>
              </div>

              <LifecycleChart items={lifecycleData} />
            </article>

            <aside className="panel activity-panel">
              <div className="panel-header activity-header">
                <h2>Recent Activity</h2>
                <button type="button" className="link-button">
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
    <div className="dashboard-shell">
      <Sidebar items={navItems} />

      <main className="main-panel">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="wizard-content">
          <header className="wizard-header">
            <h1>Create RFP with AI</h1>
            <p>Describe your procurement need in simple terms. Our AI agents will create a structured RFP for you.</p>
          </header>

          <StepProgress steps={wizardSteps} />

          <section className="review-layout">
            <div className="review-main">
              <div className="review-panel">
                <div className="panel-topline">
                  <span className="panel-kicker">AI Generated Draft</span>
                </div>

                <RequirementReviewCard title="Review & edit requirement draft" value={draftText} maxLength={2000} />

                <div className="prompt-row" aria-label="Example prompts">
                  {suggestionChips.map((chip) => (
                    <button type="button" key={chip} className="prompt-chip">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wizard-actions single-action">
                <Link to="/rfps/ai-extracted" className="primary-button wizard-primary">
                  Analyze Requirement →
                </Link>
              </div>
            </div>

            <aside className="review-sidebar">
              <div className="summary-panel">
                <h3>AI Summary</h3>
                <ul>
                  {aiHighlights.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="summary-panel">
                <h3>Critical Requirements</h3>
                <div className="check-list">
                  {criticalRequirements.map((item) => (
                    <label key={item} className="check-item">
                      <input type="checkbox" defaultChecked />
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
    <div className="dashboard-shell">
      <Sidebar items={navItems} />

      <main className="main-panel extracted-shell">
        <Topbar
          tenantLabel="Acme Manufacturing (Tenant)"
          user={{ initials: "P", name: "Priya Sharma", role: "Procurement Lead" }}
        />

        <div className="wizard-content extracted-content">
          <header className="extracted-header">
            <h1>AI-Extracted Requirements</h1>
            <p>Review and refine the extracted requirements. Add missing details if needed.</p>
          </header>

          <div className="step-progress extracted-steps">
            <div className="step-group">
              <div className="step-node complete">✓</div>
              <span className="step-label complete">Describe</span>
            </div>
            <div className="step-group">
              <div className="step-node current">2</div>
              <span className="step-label current">Review &amp; Edit</span>
            </div>
            <div className="step-group">
              <div className="step-node">3</div>
              <span className="step-label">Configure</span>
            </div>
            <div className="step-group">
              <div className="step-node">4</div>
              <span className="step-label">Generate</span>
            </div>
          </div>

          <div className="extracted-panel">
            <div className="extracted-panel-header">
              <span>Structured Requirements</span>
              <span>Missing Information (3)</span>
              <span>Clarification Questions</span>
              <span>Edit as Text</span>
            </div>

            <div className="extracted-table">
              {extractedRequirements.map((row) => (
                <div key={row.label} className="extracted-row">
                  <div className="extracted-label">{row.label}</div>
                  <div className="extracted-value">{row.value}</div>
                  <button type="button" className="edit-link">
                    {row.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bottom-actions extracted-actions">
            <Link to="/rfps" className="secondary-button">
              ← Back
            </Link>
            <Link to="/rfps" className="primary-button wizard-primary">
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;