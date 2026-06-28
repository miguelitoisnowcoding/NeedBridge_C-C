// ============================================================
// src/lib/openrouter.ts
// NeedBridge — Two-Stage AI Processing Pipeline
// Stage 1: IBM WatsonX Classifier Engine (triage + routing)
// Stage 2: OpenRouter Generation Engine (response generation)
// ============================================================

import { generateNeedBridgePlan } from "./openrouter.functions";

// ============================================================
// SECTION 1 — TYPES AND INTERFACES
// ============================================================

export interface NeedBridgeInput {
  photoBase64?: string;
  description?: string;
  category: string;
  location: string;
}

export interface WatsonXOutput {
  issue_type: string;
  severity: "Low" | "Medium" | "High";
  confidence: number;
  buildit_flag: boolean;
  gov_escalation_flag: boolean;
}

export interface ActNowPlan {
  immediate_actions: string[];
  short_term_steps: string[];
  resources_needed: string[];
  responsible_parties: string[];
}

export interface PartsItem {
  item: string;
  quantity: number;
  est_price: string;
  availability: string;
}

export interface BuildItPlan {
  solution_name: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  estimated_time: string;
  build_steps: string[];
  parts_list: PartsItem[];
}

export interface GovEscalation {
  agency_name: string;
  agency_relevance: string;
  email_template_draft: string;
}

export interface NeedBridgeOutput {
  issue_type: string;
  severity: "Low" | "Medium" | "High";
  confidence: number;
  is_diy_feasible: boolean;
  actnow: ActNowPlan;
  buildit?: BuildItPlan;
  gov_escalation?: GovEscalation;
}

export interface LowConfidenceResult {
  status: "LOW_CONFIDENCE_FALLBACK";
  confidence: number;
  message: string;
}

// ============================================================
// SECTION 2 — GROUNDED REFERENCE TABLE
// Hardcoded verified Philippine government agencies.
// AI must match against this list or return UNVERIFIED.
// ============================================================

const GROUNDED_REFERENCE_TABLE = [
  {
    agency_name: "DPWH",
    full_name: "Department of Public Works and Highways",
    handles: [
      "road damage", "bridge", "drainage",
      "flood infrastructure", "pavement", "highway"
    ]
  },
  {
    agency_name: "MWSS",
    full_name: "Metropolitan Waterworks and Sewerage System",
    handles: [
      "water line", "water pipe", "sewage",
      "water supply", "water leak", "water disruption"
    ]
  },
  {
    agency_name: "DRRMO",
    full_name: "Disaster Risk Reduction and Management Office",
    handles: [
      "flooding", "flash flood", "landslide",
      "disaster", "evacuation", "storm damage"
    ]
  },
  {
    agency_name: "NDRRMC",
    full_name: "National Disaster Risk Reduction and Management Council",
    handles: [
      "large-scale disaster", "national emergency",
      "typhoon", "earthquake", "widespread flooding"
    ]
  },
  {
    agency_name: "DILG",
    full_name: "Department of the Interior and Local Government",
    handles: [
      "barangay governance", "local authority",
      "community safety", "peace and order"
    ]
  }
];

// ============================================================
// SECTION 3 — STAGE 1: WATSONX CLASSIFIER ENGINE
// Pure TypeScript function — no API call needed.
// Reads input, applies severity rubric, sets routing flags,
// generates confidence score.
// ============================================================

function analyzeWithWatsonX(input: NeedBridgeInput): WatsonXOutput {

  const text = (input.description || "").toLowerCase();
  const category = (input.category || "").toLowerCase();
  const hasPhoto = !!input.photoBase64;

  // --- ISSUE TYPE DETECTION ---
  let issue_type = "General Community Issue";

  if (text.includes("flood") || text.includes("baha")) {
    issue_type = "Flooding";
  } else if (
    text.includes("drainage") ||
    text.includes("imburnal") ||
    text.includes("drain")
  ) {
    issue_type = "Drainage Blockage";
  } else if (
    text.includes("road") ||
    text.includes("pothole") ||
    text.includes("kalsada")
  ) {
    issue_type = "Road Damage";
  } else if (
    text.includes("water") ||
    text.includes("pipe") ||
    text.includes("leak")
  ) {
    issue_type = "Water Line Issue";
  } else if (
    text.includes("light") ||
    text.includes("ilaw") ||
    text.includes("streetlight")
  ) {
    issue_type = "Streetlight Failure";
  } else if (
    text.includes("garbage") ||
    text.includes("basura") ||
    text.includes("waste")
  ) {
    issue_type = "Waste Management";
  } else if (category === "infrastructure") {
    issue_type = "Infrastructure Damage";
  } else if (category === "water") {
    issue_type = "Water Supply Issue";
  } else if (category === "safety") {
    issue_type = "Safety Hazard";
  }

  // --- SEVERITY RUBRIC ---
  // High  = immediate safety risk OR 50+ residents affected
  // Medium = property/health risk, 10-50 residents
  // Low   = localized inconvenience, under 10 residents

  let severity: "Low" | "Medium" | "High" = "Low";

  const highKeywords = [
    "flood", "baha", "collapsed", "bumagsak", "fire", "sunog",
    "emergency", "urgent", "danger", "hazard", "major",
    "barangay", "everyone", "lahat", "residents", "subdivision"
  ];
  const mediumKeywords = [
    "leak", "broken", "sira", "damage", "several",
    "neighbors", "kapitbahay", "families", "pamilya", "block", "area"
  ];

  if (highKeywords.some(word => text.includes(word))) {
    severity = "High";
  } else if (mediumKeywords.some(word => text.includes(word))) {
    severity = "Medium";
  } else {
    severity = "Low";
  }

  // --- ROUTING FLAGS ---
  // Both can be true at the same time
  // ActNow is always generated — never a flag

  const diyIssues = [
    "streetlight", "pothole", "signage", "minor leak",
    "small drain", "broken step", "cracked pavement", "ilaw"
  ];
  const govIssues = [
    "flood", "major road", "water line", "pipe burst",
    "collapsed", "drainage failure", "sewage", "widespread"
  ];

  const buildit_flag =
    diyIssues.some(word => text.includes(word)) ||
    (severity === "Low" && category === "infrastructure");

  const gov_escalation_flag =
    govIssues.some(word => text.includes(word)) ||
    severity === "High" ||
    (severity === "Medium" && !buildit_flag);

  // --- CONFIDENCE SCORE ---
  // Below 0.6 = LOW_CONFIDENCE_FALLBACK (no AI call made)
  // 0.6 and above = proceed to Stage 2

  let confidence = 0.5;

  if (hasPhoto) confidence += 0.2;
  if (input.description && input.description.length > 30) confidence += 0.15;
  if (input.description && input.description.length > 80) confidence += 0.05;
  if (input.category && input.category !== "Other") confidence += 0.1;
  if (input.location && input.location.length > 5) confidence += 0.05;

  confidence = Math.min(confidence, 1.0);
  confidence = Math.round(confidence * 100) / 100;

  return {
    issue_type,
    severity,
    confidence,
    buildit_flag,
    gov_escalation_flag
  };
}

// ============================================================
// SECTION 4 — STAGE 2: OPENROUTER GENERATION ENGINE
// Only runs if WatsonX confidence >= 0.6.
// Passes original input + WatsonX context to Gemini 2.5 Flash Lite.
// Agency names verified against GROUNDED_REFERENCE_TABLE.
// ============================================================

async function generateWithOpenRouter(
  input: NeedBridgeInput,
  watsonxResult: WatsonXOutput
): Promise<NeedBridgeOutput> {
  // All prompt assembly, API key handling, and the OpenRouter HTTP call
  // live in the server function — the key never reaches the client bundle.
  const result = await generateNeedBridgePlan({
    data: { input, watsonxResult },
  });
  return result as NeedBridgeOutput;
}

// ============================================================
// SECTION 5 — MAIN ORCHESTRATOR: analyzeNeed()
// Single exported entry point — call this from submission form.
// ============================================================

export async function analyzeNeed(
  input: NeedBridgeInput
): Promise<NeedBridgeOutput | LowConfidenceResult> {

  // STAGE 1 — WatsonX Classifier
  const watsonxResult = analyzeWithWatsonX(input);

  // CONFIDENCE GATE
  if (watsonxResult.confidence < 0.6) {
    return {
      status: "LOW_CONFIDENCE_FALLBACK",
      confidence: watsonxResult.confidence,
      message:
        "Your submission doesn't have enough detail for NeedBridge to generate a reliable response. Please add a clearer photo, a more detailed description, or both."
    } as LowConfidenceResult;
  }

  // STAGE 2 — OpenRouter Generator
  const finalOutput = await generateWithOpenRouter(input, watsonxResult);
  return finalOutput;
}

// ============================================================
// SECTION 6 — HELPER: fileToBase64()
// Converts an uploaded File to base64 string.
// Call this before analyzeNeed() if a photo was uploaded.
// ============================================================

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data:image/...;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
