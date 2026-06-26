// ============================================================
// src/lib/openrouter.ts
// NeedBridge — Two-Stage AI Processing Pipeline
// Stage 1: IBM WatsonX Classifier Engine (triage + routing)
// Stage 2: OpenRouter Generation Engine (response generation)
// ============================================================

const OPENROUTER_API_KEY = "sk-or-v1-c4cd981f1c77f15cd44c9c79c22a95bb5685cf7225e94d9bacdd0d23b508024";

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
// Passes original input + WatsonX context to Gemini 2.0 Flash.
// Agency names verified against GROUNDED_REFERENCE_TABLE.
// ============================================================

async function generateWithOpenRouter(
  input: NeedBridgeInput,
  watsonxResult: WatsonXOutput
): Promise<NeedBridgeOutput> {

  const verifiedAgencies = GROUNDED_REFERENCE_TABLE
    .map(a => a.agency_name)
    .join(", ");

  const agencyTable = GROUNDED_REFERENCE_TABLE
    .map(a => `${a.agency_name}: handles ${a.handles.join(", ")}`)
    .join("\n");

  const systemPrompt = `You are NeedBridge, an AI assistant for Filipino barangay community needs.
You receive a pre-classified community issue report and generate structured response plans.
You must respond ONLY with valid JSON. No preamble, no markdown, no text outside the JSON.

CRITICAL AGENCY RULE:
You have access to a verified Philippine government agency list: ${verifiedAgencies}.
For the gov_escalation agency_name field, use ONLY one of these exact strings.
If the correct agency is not in the list, return: "UNVERIFIED — escalate manually"
Never invent, abbreviate, or modify an agency name.

ACTNOW RULES:
- Always generate actnow — it is never optional
- Steps must be practical and use only resources the community already has
- Write in simple Filipino-context English
- Minimum 3 immediate actions, minimum 2 short-term steps

BUILDIT RULES:
- Only generate buildit if buildit_flag is true
- Parts must be available in Philippine hardware stores or Shopee
- ALL prices must be in Philippine Peso (₱)
- Minimum 3 parts, minimum 4 build steps

GOV ESCALATION RULES:
- Only generate gov_escalation if gov_escalation_flag is true
- Agency name must exactly match one of: ${verifiedAgencies}`;

  const userPrompt = `Community issue report from a Philippine barangay:

--- SUBMISSION DATA ---
Category: ${input.category}
Location: ${input.location}
Description: ${input.description || "No description provided"}
Photo provided: ${input.photoBase64 ? "Yes" : "No"}

--- WATSONX CLASSIFICATION ---
Issue Type: ${watsonxResult.issue_type}
Severity: ${watsonxResult.severity}
Confidence: ${watsonxResult.confidence}
BuildIt Flag: ${watsonxResult.buildit_flag}
Gov Escalation Flag: ${watsonxResult.gov_escalation_flag}

--- VERIFIED AGENCY TABLE ---
${agencyTable}

Respond with this exact JSON structure:
{
  "issue_type": "${watsonxResult.issue_type}",
  "severity": "${watsonxResult.severity}",
  "confidence": ${watsonxResult.confidence},
  "is_diy_feasible": ${watsonxResult.buildit_flag},
  "actnow": {
    "immediate_actions": ["1. Action", "2. Action", "3. Action"],
    "short_term_steps": ["1. Step", "2. Step"],
    "resources_needed": ["Resource 1", "Resource 2"],
    "responsible_parties": ["Party 1", "Party 2"]
  }${watsonxResult.buildit_flag ? `,
  "buildit": {
    "solution_name": "string",
    "difficulty_level": "Beginner",
    "estimated_time": "string",
    "build_steps": ["1. Step", "2. Step", "3. Step", "4. Step"],
    "parts_list": [
      {
        "item": "string",
        "quantity": 1,
        "est_price": "₱XXX",
        "availability": "Available"
      }
    ]
  }` : ""}${watsonxResult.gov_escalation_flag ? `,
  "gov_escalation": {
    "agency_name": "must be one of: ${verifiedAgencies}",
    "agency_relevance": "one sentence",
    "email_template_draft": "short pre-filled email body"
  }` : ""}
}`;

  // Build messages array — include photo if provided
  const messages: any[] = [];

  if (input.photoBase64) {
    messages.push({
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${input.photoBase64}`
          }
        },
        {
          type: "text",
          text: userPrompt
        }
      ]
    });
  } else {
    messages.push({
      role: "user",
      content: userPrompt
    });
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://needbridge.vercel.app",
        "X-Title": "NeedBridge"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  let parsed: NeedBridgeOutput;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Try to extract JSON if there's surrounding text
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      parsed = JSON.parse(content.substring(jsonStart, jsonEnd + 1));
    } else {
      throw new Error(`Failed to parse OpenRouter response: ${content}`);
    }
  }

  return parsed;
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