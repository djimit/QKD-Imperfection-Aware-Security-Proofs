# QKD Imperfection-Aware Security Proofs

Interactive research synthesis of **arXiv:2602.05057** — _Quantum Key Distribution with Imperfections: Recent Advances in Security Proofs_ (Andriolo, Vasques, Agudelo, Riegler, Pivoluska, Murta; February 2026).

A six-panel single-page application that maps the paper's 80+ page treatment of device imperfections in QKD into navigable, evidence-labeled deliverables for researchers, implementers, and reviewers.

---

## Why This Exists

Security proofs for real QKD devices must account for imperfections — detector dead time, efficiency mismatches, source correlations, spectral distinguishability, and more. Andriolo et al. provide the first unified framework for reasoning about these imperfections across composable security, finite-size analysis, and numerical optimization. This app distils that framework into six interactive panels, each carrying explicit provenance labels so readers can trace every claim back to its source.

## What It Covers

| Panel | Title | Content |
|-------|-------|---------|
| **A** | Research Synthesis | Paper structure map, quantum hacking demonstrations, contribution overview |
| **B** | Imperfection Matrix | 8 device imperfections mapped across 7 analysis dimensions |
| **C** | Methods Playbook | Composable security definitions, map-based modeling, finite-size tools, numerical optimization |
| **D** | Protocol Portfolio | DD, MDI, 1sDI, DI protocol families with trade-off assessments |
| **E** | Research Plan | 5 work packages over 24 weeks with Gantt chart and verification gates |
| **F** | Blind Spots | 14 identified gaps with significance ratings, mitigations, and gap classifications |

Every substantive claim carries an evidence label:

- **From paper** (green) — directly stated in arXiv:2602.05057
- **From cited ref** (blue) — traced to a reference cited by the paper
- **Inference** (amber) — logically derived from paper content
- **Open** (red) — unresolved question or gap

## Quick Start

### Prerequisites

- Node.js 18+ (tested on 22)
- pnpm (`npm install -g pnpm`)

### Install and Run

```bash
git clone <repo-url>
cd qkd-demo
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Build to Single HTML File

```bash
npx parcel build index.html --no-source-maps --dist-dir dist
npx html-inline -i dist/index.html -o bundle.html -b dist
```

The resulting `bundle.html` (~380 KB) is fully self-contained — no server, no external dependencies. Open it directly in any modern browser.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI framework | React | 19.2 |
| Language | TypeScript | 5.9 |
| Styling | Tailwind CSS | 3.4.1 |
| Components | shadcn/ui (Radix primitives) | latest |
| Dev server | Vite | 7.3 |
| Bundler | Parcel | 2.16 |
| Inlining | html-inline | 1.2 |

## Project Structure

```
qkd-demo/
├── src/
│   ├── data/
│   │   └── qkd-data.ts            # Typed data layer (571 lines)
│   ├── views/
│   │   ├── EvidenceBadge.tsx       # Provenance label component
│   │   ├── SynthesisView.tsx       # Panel A — Research synthesis
│   │   ├── MatrixView.tsx          # Panel B — Imperfection matrix
│   │   ├── PlaybookView.tsx        # Panel C — Methods playbook
│   │   ├── PortfolioView.tsx       # Panel D — Protocol portfolio
│   │   ├── TimelineView.tsx        # Panel E — Research plan / Gantt
│   │   └── BlindSpotsView.tsx      # Panel F — Blind spots register
│   ├── components/
│   │   └── ui/                     # shadcn/ui primitives
│   ├── App.tsx                     # Shell, header, tab navigation
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind directives + CSS vars
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── BUILD.md                        # Step-by-step build instructions
└── bundle.html                     # Self-contained output (~380 KB)
```

**Total application code**: ~1,800 lines of TypeScript/React across 9 source files.

## Architecture

### Data-Driven Views

All research content lives in `src/data/qkd-data.ts` as typed arrays and interfaces. Views are purely presentational — they import data, iterate, and render. This means:

- Content updates require editing one file, not six components
- Every data structure has an explicit TypeScript interface
- Evidence labels are enforced at the type level: `"From paper" | "From cited ref" | "Inference" | "Open"`

### Key Data Types

```typescript
// 8 imperfections, each mapped across 7 analysis dimensions
interface Imperfection {
  id: number;
  category: string;
  idealViolated: string;
  attackSurface: string;
  modelingStrategy: string;
  proofFit: "Analytical" | "Numerical" | "Hybrid" | "MDI eliminates";
  residualRisk: string;
  experimentalBounding: string;
  evidence: EvidenceLabel;
}

// 4 protocol families with trade-off metrics
interface Protocol {
  family: string;
  trustLevel: "DD" | "MDI" | "1sDI" | "DI";
  trustLabel: string;
  encoding: string[];
  dominantImperfections: string[];
  proofMode: "Analytical" | "Numerical" | "Hybrid";
  keyRate: "Highest" | "High" | "Moderate" | "Low" | "Lowest";
  distance: string;
  complexity: "Low" | "Moderate" | "High" | "Very High";
  calibration: "Highest" | "High" | "Moderate" | "Low" | "Lowest";
  certificationReadiness: string;
}

// 5 work packages with dependency graph
interface WorkPackage {
  id: string;
  name: string;
  weeks: [number, number];
  deliverables: string[];
  acceptanceCriteria: string[];
  dependencies: string[];
}
```

### Component Interactions

```
App.tsx (tab state)
 ├── SynthesisView    ← tabs filter, attack cards
 ├── MatrixView       ← row click → Dialog detail
 ├── PlaybookView     ← Accordion (all open by default)
 ├── PortfolioView    ← trust spectrum click → expand card
 ├── TimelineView     ← WP click → expand card; CSS Gantt
 └── BlindSpotsView   ← filter chips → grid; card click → Dialog
```

State is local to each view. No global store, no routing — tab switching via conditional rendering keeps the bundle minimal and the mental model simple.

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single-page tabs, no router | Six deliverables map naturally; avoids routing overhead |
| Data separated from views | One typed file for all content; views are stateless renderers |
| Dark theme (zinc-950) | Technical content reads better on dark; reduces visual noise |
| Evidence badges inline | Matches the paper's provenance requirement; immediately visible |
| Dialogs for detail | Keeps overview scannable; depth on demand |
| Accordion for Methods | Five independent sections; reader controls depth |
| CSS Gantt (no charting lib) | Simple enough for 5 WPs x 24 weeks; zero extra dependencies |
| Parcel single-file bundle | Reliable inlining; works with TypeScript path aliases |

### Design Language

- Left-aligned text, no centered layouts
- Monospace for code, formulas, identifiers
- Semantic color coding: green = established, blue = reference, amber = inferred, red = open/risk
- Two nesting levels maximum per view
- No decorative gradients

## Panel Details

### A: Research Synthesis

Tab-filtered paper structure map (All / Part I / Part II / Appendices), quantum hacking attack cards in a 2-column grid color-coded by target (Detector = amber, Source = cyan), and an analytical vs. numerical contribution summary.

### B: Imperfection Matrix

A clickable summary table of all 8 imperfections. Each row opens a Dialog with the full 7-column analysis: category, ideal assumption violated, attack surface, modeling strategy, proof fit, residual risk, and experimental bounding method. Includes a worked micro-example showing POVM modification for detector efficiency mismatch.

### C: Methods Playbook

Five accordion sections covering composable security (epsilon_c / epsilon_s definitions, composition pitfalls), map-based protocol modeling (6-step pipeline), finite-size analysis (security parameters table, penalty scaling), numerical optimization (Devetak-Winter formula, solver requirements), and a 4-step validation protocol.

### D: Protocol Portfolio

A trust-level spectrum bar (DD -> MDI -> 1sDI -> DI) with expandable protocol detail cards. Each card shows key rate and calibration burden as gradient-filled trade-off bars, plus encoding schemes, distance performance, and dominant imperfections.

### E: Research Plan

A CSS-based Gantt chart with 24 weekly columns, 5 color-coded work package bars, and 7 diamond verification gate markers. Below: a gate legend grid and expandable WP cards with deliverables, acceptance criteria, and dependency links.

### F: Blind Spots

14 identified gaps filterable by type (Research / Engineering / Both), rendered as a 2-column card grid. Each card opens a Dialog with the full statement, significance assessment (red), and proposed test or mitigation (green). A summary bar shows gap type distribution with percentage fills.

## Evidence Labeling System

The app enforces a four-tier provenance system across all panels:

| Label | Color | Meaning |
|-------|-------|---------|
| `[From paper]` | Emerald | Directly stated in arXiv:2602.05057 |
| `[From cited ref]` | Blue | Traced to a reference the paper cites |
| `[Inference]` | Amber | Logically derived; not explicitly stated |
| `[Open]` | Red | Unresolved question or identified gap |

Labels are implemented as the `EvidenceBadge` component with inline color-coded borders. The underlying `EvidenceLabel` union type prevents unlabeled claims at compile time.

## Research Context

The paper addresses a fundamental gap in QKD deployment: most security proofs assume ideal devices, but real implementations exhibit imperfections that attackers can exploit. Notable demonstrations include detector blinding (Lydersen et al. 2010), laser seeding (Gerhardt et al. 2011), and Trojan horse attacks on source modulators.

Andriolo et al. systematize the treatment of these imperfections through composable security, finite-size analysis under coherent attacks, and numerical entropic optimization (SDP/convex methods). The framework spans four protocol families at increasing trust levels — from fully device-dependent (DD) to fully device-independent (DI) — trading key rate for assumption minimality.

Key theoretical tools referenced: Entropy Accumulation Theorem (EAT), Generalized EAT (GEAT), Devetak-Winter rate formula, and map-based device modeling that translates physical imperfections into mathematical objects within the security proof.

## Companion Documents

- **`BUILD.md`** — Step-by-step build instructions with architecture rationale, directory setup, component construction patterns, and manual bundling commands
- **`QKD_Imperfections_Research_Synthesis.md`** — Full-text research synthesis document (the source material from which the app's data layer was derived)

## Disclaimer

This application is a research synthesis tool, not a security certification. All recommendations and analyses require expert validation before use in production QKD deployments. The evidence labeling system is designed to make provenance transparent, not to substitute for peer review.

## License

MIT

## Contributing

Contributions that improve data accuracy, add missing evidence labels, or extend panel interactivity are welcome. When adding new claims, always include an `evidence` field with the appropriate `EvidenceLabel` value.

