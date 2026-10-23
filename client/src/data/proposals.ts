export const proposals = [
  {
    id: 1,
    vendor: "TechNova Solutions",
    fileName: "TechNova_Proposal.pdf",
    receivedOn: "12 Oct 2026",
    status: "validated",
  },
  {
    id: 2,
    vendor: "Global IT Partners",
    fileName: "GITP_Proposal.pdf",
    receivedOn: "11 Oct 2026",
    status: "validated",
  },
  {
    id: 3,
    vendor: "NextGen Systems",
    fileName: "NGS_Response.pdf",
    receivedOn: "11 Oct 2026",
    status: "processing",
  },
  {
    id: 4,
    vendor: "SecureSoft",
    fileName: "SecureSoft_Bid.docx",
    receivedOn: "10 Oct 2026",
    status: "review",
  },
  {
    id: 5,
    vendor: "CloudMatrix",
    fileName: "CloudMatrix_Proposal.pdf",
    receivedOn: "10 Oct 2026",
    status: "validated",
  },
] as const;

// data/proposalTabs.ts

export const proposalTabs = [
  {
    id: "all",
    label: "All Proposals",
    count: 8,
  },
  {
    id: "processing",
    label: "Processing",
    count: 2,
  },
  {
    id: "review",
    label: "Needs Review",
    count: 1,
  },
  {
    id: "validated",
    label: "Validated",
    count: 5,
  },
];