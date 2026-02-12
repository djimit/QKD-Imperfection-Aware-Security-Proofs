export type EvidenceLabel = "From paper" | "From cited ref" | "Inference" | "Open";
export type ProofFit = "Analytical" | "Numerical" | "Hybrid" | "MDI eliminates";
export type GapType = "Research" | "Engineering" | "Both";
export type ProtocolFamily = "DD" | "MDI" | "1sDI" | "DI";

export const EVIDENCE_COLORS: Record<EvidenceLabel, string> = {
  "From paper": "#4ade80", // green-400
  "From cited ref": "#60a5fa", // blue-400
  "Inference": "#facc15", // yellow-400
  "Open": "#f87171", // red-400
};

export const PROOF_FIT_COLORS: Record<ProofFit, string> = {
  "Analytical": "bg-green-500/20 text-green-300 border-green-500/50",
  "Numerical": "bg-blue-500/20 text-blue-300 border-blue-500/50",
  "Hybrid": "bg-violet-500/20 text-violet-300 border-violet-500/50",
  "MDI eliminates": "bg-amber-500/20 text-amber-300 border-amber-500/50",
};

// Data for Synthesis View (A)
export const paperSections = [
  { part: "Part I", title: "§1 Introduction", purpose: "Motivation, problem statement, and contribution overview." },
  { part: "Part I", title: "§2 Composable Security for QKD", purpose: "Review of the composable security framework and ε-security definitions." },
  { part: "Part I", title: "§3 Imperfection Taxonomies", purpose: "Systematic classification of known hardware imperfections." },
  { part: "Part I", title: "§4 Map-Based Modeling", purpose: "Formalism for mapping physical imperfections to abstract channel parameters." },
  { part: "Part II", title: "§5 The Security Proof Structure", purpose: "Detailed walkthrough of a generalized security proof against collective attacks." },
  { part: "Part II", title: "§6 Finite-Size Corrections", purpose: "Derivation of finite-size penalties and their scaling laws." },
  { part: "Part II", title: "§7 Numerical Methods", purpose: "Application of semidefinite programming (SDP) for key rate optimization." },
  { part: "Part II", title: "§8 Case Studies", purpose: "Applying the full framework to BB84 and MDI-QKD protocols." },
  { part: "Appendices", title: "App. A: ε-Definitions", purpose: "Formal definitions of security parameters." },
  { part: "Appendices", title: "App. B: SDP Formulations", purpose: "Explicit SDP primal and dual problems for key rate calculation." },
  { part: "Appendices", title: "App. C: Data Processing", purpose: "Details of error correction and privacy amplification." },
];

export const attacks = [
  { name: "Detector Control", target: "Detector", color: "amber", description: "Exploiting detector efficiency mismatch and blinding to learn the key.", evidence: "From cited ref" as EvidenceLabel },
  { name: "Laser-Seed Attack", target: "Source", color: "cyan", description: "Injecting a strong laser pulse to control the phase of Alice's laser.", evidence: "From cited ref" as EvidenceLabel },
  { name: "Trojan-Horse Attack", target: "Source", color: "cyan", description: "Probing internal state-preparation components with a bright pulse.", evidence: "From cited ref" as EvidenceLabel },
  { name: "Thermal Blinding", target: "Detector", color: "amber", description: "Using thermal effects to shift detector operation into a linear, classical mode.", evidence: "From cited ref" as EvidenceLabel },
];


// Data for Matrix View (B)
export const imperfections = [
  { category: "Source", imperfection: "State Preparation Flaws", idealViolated: "Perfect state encoding", attackSurface: "Phase/intensity/polarization modulation", modeling: "Hilbert space extension", proofFit: "Analytical" as ProofFit, risk: "Reduced key rate", bounding: "Tomography on source output" },
  { category: "Source", imperfection: "Side-Channels (Frequency)", idealViolated: "No distinguishing information", attackSurface: "Spectral correlations with basis choice", modeling: "Conditional state analysis", proofFit: "Analytical" as ProofFit, risk: "Information leakage", bounding: "Optical spectrum analysis" },
  { category: "Channel", imperfection: "Trojan-Horse Attacks", idealViolated: "Channel is untrusted but passive", attackSurface: "Internal component reflections", modeling: "Requires active component monitoring", proofFit: "MDI eliminates" as ProofFit, risk: "Full state compromise", bounding: "Optical Time-Domain Reflectometry (OTDR)" },
  { category: "Detector", imperfection: "Efficiency Mismatch", idealViolated: "Detectors are identical", attackSurface: "Basis-dependent detection probability", modeling: "Modified POVM elements", proofFit: "Hybrid" as ProofFit, risk: "Biased parameter estimation", bounding: "Detector tomography" },
  { category: "Detector", imperfection: "Dark Counts", idealViolated: "No clicks without photons", attackSurface: "False positives in key string", modeling: "Addition to error rate term", proofFit: "Analytical" as ProofFit, risk: "Inflated QBER", bounding: "Measurement with channel blocked" },
  { category: "Detector", imperfection: "Dead Time & Afterpulsing", idealViolated: "Detections are independent events", attackSurface: "Temporal correlations in detection", modeling: "Numerical simulation", proofFit: "Numerical" as ProofFit, risk: "Incorrect statistical assumptions", bounding: "Time-correlation measurements" },
  { category: "System", imperfection: "Finite-Size Effects", idealViolated: "Infinite data ensemble", attackSurface: "Statistical fluctuations in small samples", modeling: "Concentration inequalities", proofFit: "Analytical" as ProofFit, risk: "Overestimation of key rate", bounding: "Directly calculated in proof" },
  { category: "System", imperfection: "Information Leakage (EC)", idealViolated: "Error correction is a black box", attackSurface: "Syndrome information revealed", modeling: "Shannon information term", proofFit: "Analytical" as ProofFit, risk: "Reduction in secret key length", bounding: "Information theory bounds (min-entropy)" },
];

// Data for Playbook View (C)
export const securityParameters = [
  { param: 'N', desc: 'Total number of signals exchanged' },
  { param: 'n_t', desc: 'Number of test bits for parameter estimation' },
  { param: 'n_k', desc: 'Number of key bits before privacy amplification' },
  { param: 'ε_sec', desc: 'Secrecy failure probability' },
  { param: 'ε_cor', desc: 'Correctness failure probability' },
  { param: 'ε_PA', desc: 'Privacy amplification failure probability' },
  { param: 'ε_EC', desc: 'Error correction failure probability' },
  { param: 'ε_PE', desc: 'Parameter estimation failure probability' },
  { param: 'leak_EC', desc: 'Information leakage from error correction' },
];
export const finiteSizePenalties = [
    { name: "Parameter Estimation", scaling: "O(log(1/ε_PE) / sqrt(n_t))", description: "Penalty from statistical fluctuations when estimating QBER and gain." },
    { name: "Privacy Amplification", scaling: "O(log(1/ε_PA))", description: "Security loss from using non-ideal hash functions on a finite string." },
    { name: "Error Correction Leakage", scaling: "Fixed term", description: "Information revealed during public error correction dialogue." },
    { name: "Overall Security Definition", scaling: "Sum of ε_i", description: "Final key is ε_sec-secret and ε_cor-correct, where ε is the sum of all sub-protocol failure probabilities." },
];

// Data for Portfolio View (D)
export const protocols = [
    { family: "DD", name: "Device-Dependent", keyRate: 2, calBurden: 4, distance: "100 km", complexity: "Low", readiness: "Commercial", encoding: ["Polarization", "Phase", "Time-bin"], imperfections: ["All detector side-channels", "State preparation flaws"] },
    { family: "MDI", name: "Measurement-Device-Independent", keyRate: 3, calBurden: 3, distance: "400 km", complexity: "Medium", readiness: "Deployable", encoding: ["Phase"], imperfections: ["State preparation flaws", "Source side-channels"] },
    { family: "1sDI", name: "One-sided Device-Independent", keyRate: 4, calBurden: 2, distance: "10 km", complexity: "High", readiness: "Experimental", encoding: ["Entanglement"], imperfections: ["Requires high-efficiency detectors", "Low key rates"] },
    { family: "DI", name: "Full Device-Independent", keyRate: 5, calBurden: 1, distance: "<1 km", complexity: "Very High", readiness: "Proof-of-concept", encoding: ["Entanglement + Bell Test"], imperfections: ["Extremely low key rates", "Loophole-free violation required"] },
];

// Data for Timeline View (E)
export const workPackages = [
    { id: "WP1", name: "Formalism Refinement", start: 1, end: 4, color: "bg-sky-500", deliverables: ["Finalized imperfection taxonomy", "Map-based modeling spec"], criteria: "Taxonomy covers all known first-order effects", deps: "None" },
    { id: "WP2", name: "Analytical Proof Module", start: 3, end: 12, color: "bg-green-500", deliverables: ["Composable proof structure", "Finite-size analysis library"], criteria: "Proof correctness verified for BB84", deps: "WP1" },
    { id: "WP3", name: "Numerical Solver Integration", start: 8, end: 18, color: "bg-amber-500", deliverables: ["SDP-based key rate calculator", "Interface for imperfection models"], criteria: "Solver reproduces known results for ideal cases", deps: "WP1" },
    { id: "WP4", name: "Protocol Case Studies", start: 13, end: 22, color: "bg-fuchsia-500", deliverables: ["End-to-end analysis of MDI-QKD", "Security bounds for decoy-state BB84"], criteria: "Key rates computed for specified imperfection levels", deps: "WP2, WP3" },
    { id: "WP5", name: "Dissemination & Documentation", start: 19, end: 24, color: "bg-red-500", deliverables: ["Draft manuscript", "Open-source code documentation"], criteria: "Paper submitted, code repository public", deps: "WP4" },
];
export const verificationGates = [
    { id: "VG1", week: 3, name: "Formalism Review", criterion: "Taxonomy and mapping formalism approved" },
    { id: "VG2", week: 6, name: "Proof Structure Complete", criterion: "General proof structure passes peer review" },
    { id: "VG3", week: 10, name: "Finite-Size Library Validated", criterion: "Library matches published scaling laws" },
    { id: "VG4", week: 14, name: "Solver Benchmark", criterion: "Numerical solver matches analytical results for simple cases" },
    { id: "VG5", week: 18, name: "MDI Model Integration", criterion: "Imperfection models for MDI successfully integrated with solver" },
    { id: "VG6", week: 22, name: "Final Results Review", criterion: "All case study results generated and validated" },
    { id: "VG7", week: 24, name: "Project Completion", criterion: "Manuscript and code approved for release" },
];

// Data for Blind Spots View (F)
export const blindSpots = [
    { title: "Multi-photon Effects", statement: "The analysis assumes single-photon sources or perfect decoy-state methods, but multi-photon pulses can break security.", significance: "A G-number attack could compromise the entire key.", mitigation: "Incorporate PNS statistics and improved decoy-state protocols into the model.", type: "Research" as GapType, evidence: "From paper" as EvidenceLabel },
    { title: "Composable Security with Hardware", statement: "The composable framework is abstract; its connection to physical hardware assumptions is not fully formalized.", significance: "A mismatch between the proof's assumptions and the device's reality can invalidate the proof.", mitigation: "Develop a hardware abstraction layer with explicit, verifiable assumptions.", type: "Research" as GapType, evidence: "Inference" as EvidenceLabel },
    { title: "Key Management Lifecycle", statement: "The proof covers key generation, but not its subsequent storage, transport, and use.", significance: "A secure key can be compromised by insecure downstream handling.", mitigation: "Define the security boundary to end at key delivery to a trusted module (HSM).", type: "Engineering" as GapType, evidence: "Open" as EvidenceLabel },
    { title: "Software & Control Plane", statement: "The security of the classical control software and hardware is assumed to be perfect.", significance: "Bugs or exploits in the control plane can leak information or manipulate hardware.", mitigation: "Rigorous software verification, audited hardware drivers, and minimized attack surface.", type: "Engineering" as GapType, evidence: "Open" as EvidenceLabel },
    { title: "Model Parameter Drifts", statement: "The proof assumes stable device parameters, but temperature and aging can cause drift.", significance: "Parameter drift can cause the system to operate outside the proven-safe region.", mitigation: "Implement continuous, real-time monitoring of key parameters with automated alerts and recalibration.", type: "Both" as GapType, evidence: "Inference" as EvidenceLabel },
    { title: "Numerical Solver Stability", statement: "SDP solvers can have numerical precision issues, especially for high-dimensional problems.", significance: "Solver errors could lead to an artificially high, insecure key rate.", mitigation: "Use arbitrary-precision solvers and verify results with dual-problem feasibility checks.", type: "Research" as GapType, evidence: "From paper" as EvidenceLabel },
    { title: "Calibration Routine Security", statement: "The process of characterizing the devices (e.g., tomography) is assumed to be secure and accurate.", significance: "An adversary could influence the calibration to create a blind spot.", mitigation: "Develop adversarial models for calibration routines; use trusted noise sources.", type: "Both" as GapType, evidence: "Open" as EvidenceLabel },
    { title: "Combined & Unforeseen Attacks", statement: "The analysis considers imperfections individually, but combinations could create new vulnerabilities.", significance: "Synergistic effects between minor imperfections could create a major security hole.", mitigation: "Further research into multi-imperfection models; red-teaming exercises.", type: "Research" as GapType, evidence: "Open" as EvidenceLabel },
];
