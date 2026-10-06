# CreatorOS — Creator-to-Brand Marketplace

> A unified, premium two-sided marketplace module engineered for the **CreatorOS** platform. Enables content creators to discover high-value sponsorships, pitch custom concepts, lock in escrow-backed agreements, and manage content deliverables through a seamless review pipeline.

---

## 🎨 Locked Brand & Design System

The marketplace follows the unified CreatorOS visual personality: modern, creative, elegant, and professional.

| Token | Hex Value | Role |
|---|---|---|
| **Primary** | `#412653` | Deep Purple (Headings, primary CTA, brand accents) |
| **Secondary** | `#3F567F` | Slate Blue (Subtitles, borders, filters, meta tags) |
| **Creative Accent** | `#D174D2` | Lavender (Deal badges, highlights, spotlights) |
| **Action Accent** | `#E0563F` | Coral (Deal application buttons, primary alerts) |
| **Background** | `#FFFFFF` / `#F9FAFB` | Clean white & light surface whitespace |

---

## 📂 Architecture & File Structure

```
hhhh/
├── data/                                 # Persistent File-Based JSON Database
│   ├── brands/brands.json                # Vetted Brand Profiles
│   ├── campaigns/campaigns.json          # Sponsorship Campaigns Briefs
│   ├── applications/applications.json    # Creator Pitches & Proposals
│   ├── contracts/contracts.json          # Escrow Contracts & Signatures
│   └── deliverables/deliverables.json    # Content Milestone Tracker
│
├── backend/                              # Python REST Service Layer
│   ├── main.py                           # App Entry Point & CORS Setup
│   ├── models/                           # Dataclass Domain Schemas
│   │   ├── brand.py
│   │   ├── campaign.py
│   │   ├── application.py
│   │   ├── contract.py
│   │   └── deliverable.py
│   ├── repositories/                     # Thread-Safe File Persistence
│   │   ├── base_repository.py
│   │   ├── brand_repository.py
│   │   ├── campaign_repository.py
│   │   ├── application_repository.py
│   │   ├── contract_repository.py
│   │   └── deliverable_repository.py
│   ├── services/                         # Business Logic & Workflow State Machines
│   │   ├── brand_service.py
│   │   ├── campaign_service.py
│   │   ├── application_service.py
│   │   ├── contract_service.py
│   │   └── deliverable_service.py
│   ├── controllers/                      # Request Validation & Handlers
│   │   ├── brand_controller.py
│   │   ├── campaign_controller.py
│   │   ├── application_controller.py
│   │   ├── contract_controller.py
│   │   └── deliverable_controller.py
│   ├── routes/                           # API Endpoints
│   │   ├── brand_routes.py
│   │   ├── campaign_routes.py
│   │   ├── application_routes.py
│   │   ├── contract_routes.py
│   │   └── deliverable_routes.py
│   └── tests/                            # Automated Unit Test Suite
│       ├── test_campaigns.py
│       ├── test_applications.py
│       ├── test_contracts.py
│       ├── test_deliverables.py
│       └── run_tests.py
│
└── frontend/                             # React + Vite Interactive Client
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── index.css                     # CreatorOS Design System Tokens
        ├── main.jsx
        ├── App.jsx                       # Unified Navigation & State
        ├── hooks/
        │   └── useMarketplace.js         # Reactive Data & Mutators
        ├── services/
        │   └── brandService.js           # API Client + Local Fallback
        ├── components/marketplace/
        │   ├── Navbar.jsx                # Topbar with Persona Switcher
        │   ├── CampaignCard.jsx          # Sponsorship Deal Cards
        │   ├── CampaignFilters.jsx       # Multi-faceted Filter Sidebar
        │   ├── BrandCard.jsx             # Verified Brand Cards
        │   ├── ApplicationCard.jsx       # Pitch Review Component
        │   ├── DeliverableTracker.jsx    # Review & Approval Milestone UI
        │   └── Modal.jsx                 # Reusable Dialog Box
        └── pages/brands/
            ├── BrandMarketplace.jsx      # Main Discovery Feed
            ├── BrandProfile.jsx          # Public Brand Dossier
            ├── Campaigns.jsx             # Campaign Wizard & Dashboard
            ├── CampaignDetails.jsx       # Campaign Brief Specifications
            ├── Applications.jsx          # Proposal Management Board
            ├── Contracts.jsx             # Digital Signatures & Escrow
            ├── Deliverables.jsx          # Content Submission & Sign-off
            └── BrandDirectory.jsx        # Verified Brand Directory
```

---

## 🔄 Two-Sided Marketplace Workflow

1. **Brand Creates Campaign** ➔ Brand launches a sponsorship deal specifying required deliverables, niche, budget, and guidelines.
2. **Campaign Published** ➔ Listed immediately on the marketplace discovery grid with multi-filter search.
3. **Creator Discovers & Pitches** ➔ Creator applies with customized rate, delivery timeframe, and pitch concept.
4. **Brand Reviews & Accepts** ➔ Brand reviews creator credentials and clicks **"Accept & Issue Deal"**.
5. **Auto-Contract & Escrow Lock** ➔ System automatically creates a legally binding agreement and funds the escrow pool.
6. **Deliverables & Milestone Review** ➔ Creator uploads draft video/asset URL $\to$ Brand adds timestamped review notes or clicks **"Approve & Release Escrow"**.
7. **Completion** ➔ Funds are disbursed and contract marked **"Completed"**.

---

## 🧪 Running the Backend Unit Tests

To run the complete automated test suite without external dependencies:

```bash
python -m backend.tests.run_tests
```

All test cases validate campaign filtering, proposal submissions, auto-contract generation, deliverable reviews, and escrow state transitions.

---

## 💻 Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the marketplace. Use the top persona switcher to test both **Creator Mode** and **Brand Partner Mode**.
