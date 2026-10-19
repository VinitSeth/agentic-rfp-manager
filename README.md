Summary
Describe the purpose of this change.

Changes
- Type of change
  * Feature
  * Bug fix
  * Refactoring
  * Documentation
  * Test
  * Configuration or dependency update

Testing
- Describe the tests performed and provide the commands used.
  * npm run build
  * npm run typecheck
  * npm test










Agentic RFP Manager
A multi-tenant application for managing RFP workflows and supporting AI-assisted proposal preparation.

This repository is restricted to authorized contributors. Do not commit customer data, confidential RFP documents, credentials, access tokens, or proprietary company information.

Project status
Proof of concept under active development.

Core capabilities
Multi-tenant RFP workspace
RFP document intake and management
Requirement extraction
Proposal drafting workflow
Review and approval tracking
Reusable response knowledge
Tenant-aware access control
Audit-friendly activity tracking
Technology stack
Client
React
TypeScript
Vite
React Router
Axios
Tailwind CSS
Server
Node.js
Express
TypeScript
CORS
dotenv
Project structure
agentic-rfp-manager/
├── client/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
├── .github/
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── .gitignore
└── README.md
Prerequisites
Node.js 20 or later
npm
Git
Access to the restricted repository
Check the installed versions:

node --version
npm --version
git --version
Local setup
Clone the repository:

git clone https://github.com/ORGANIZATION/agentic-rfp-manager.git
cd agentic-rfp-manager
Configure and run the client
cd client
npm install
cp .env.example .env
npm run dev
The client runs at:

http://localhost:5173
Configure and run the server
Open another terminal:

cd server
npm install
cp .env.example .env
npm run dev
The server runs at:

http://localhost:5000
Health endpoint:

GET http://localhost:5000/api/health
Environment variables
Client
VITE_API_BASE_URL=http://localhost:5000/api
Variables prefixed with VITE_ are bundled into the frontend and must not contain secrets.

Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
Copy .env.example to .env and provide values suitable for your local environment.

Never commit .env files.

Development workflow
Update local main.
Create a feature branch.
Implement and test one focused change.
Push the feature branch.
Open a pull request into main.
Obtain the required approval.
Resolve all review comments.
Ensure mandatory checks pass.
Squash and merge.
Delete the merged branch.
Example:

git switch main
git pull origin main
git switch -c feature/rfp-upload
After making changes:

git add .
git commit -m "feat: add RFP upload endpoint"
git push -u origin feature/rfp-upload
Direct pushes to main are not permitted.

Branch naming
feature/<short-description>
fix/<short-description>
refactor/<short-description>
docs/<short-description>
test/<short-description>
chore/<short-description>
Quality checks
Run the relevant checks before opening a pull request.

Client
cd client
npm run lint
npm run build
Server
cd server
npm run typecheck
npm run build
Security requirements
Do not commit secrets, credentials, tokens, certificates, or private keys.
Do not commit customer or confidential RFP documents.
Do not place secrets in VITE_ environment variables.
Validate uploaded file type and size.
Enforce tenant isolation on the server.
Perform authorization checks on every protected API operation.
Avoid logging proposal content or sensitive document text.
Use only organization-approved AI services and models.
Report exposed credentials immediately and rotate them.
Repository governance
main is protected.
Changes must use feature branches.
Pull requests require approval.
Required checks must pass before merging.
Force pushes and deletion of main are blocked.
Code-owner approval may be required for sensitive paths.
License and ownership
Internal and restricted. Ownership, reuse, distribution, and licensing are governed by applicable Capgemini policies and project agreements.  