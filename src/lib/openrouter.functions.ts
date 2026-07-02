import { createServerFn } from "@tanstack/react-start";

// ============================================================
// Server function — performs the OpenRouter call.
// Reads OPENROUTER_API_KEY from server-side env only.
// ============================================================

interface GeneratePayload {
  input: {
    photoBase64?: string;
    description?: string;
    category: string;
    location: string;
  };
  watsonxResult: {
    issue_type: string;
    severity: "Low" | "Medium" | "High";
    confidence: number;
    buildit_flag: boolean;
    gov_escalation_flag: boolean;
  };
}

const GROUNDED_REFERENCE_TABLE = [
  { agency_name: "DPWH", handles: ["road damage", "bridge", "drainage", "flood infrastructure", "pavement", "highway"] },
  { agency_name: "MWSS", handles: ["water line", "water pipe", "sewage", "water supply", "water leak", "water disruption"] },
  { agency_name: "DRRMO", handles: ["flooding", "flash flood", "landslide", "disaster", "evacuation", "storm damage"] },
  { agency_name: "NDRRMC", handles: ["large-scale disaster", "national emergency", "typhoon", "earthquake", "widespread flooding"] },
  { agency_name: "DILG", handles: ["barangay governance", "local authority", "community safety", "peace and order"] },
];

export const generateNeedBridgePlan = createServerFn({ method: "POST" })
  .inputValidator((data: GeneratePayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured on the server");
    }

    const { input, watsonxResult } = data;
    const verifiedAgencies = GROUNDED_REFERENCE_TABLE.map(a => a.agency_name).join(", ");
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
      { "item": "string", "quantity": 1, "est_price": "₱XXX", "availability": "Available" }
    ]
  }` : ""}${watsonxResult.gov_escalation_flag ? `,
  "gov_escalation": {
    "agency_name": "must be one of: ${verifiedAgencies}",
    "agency_relevance": "one sentence",
    "email_template_draft": "short pre-filled email body"
  }` : ""}
}`;

    // NeedBridge AI — Free tier models via OpenRouter (updated)
    // Two-tier free model system
    // Tier 1 — Vision capable (used when photo is uploaded)
    const visionModels = [
      "google/gemma-4-31b-it:free",        // Primary — free, vision capable
      "meta-llama/llama-4-maverick:free",  // Fallback — free, vision capable
    ];

    // Tier 2 — Text only (used when only description is provided, no photo)
    const textModels = [
      "nvidia/nemotron-3-super-120b-a12b:free", // Primary — free, strong reasoning
      "meta-llama/llama-4-scout:free",          // Fallback — free, fast
    ];

    // Select model tier based on whether a photo was provided
    const modelsToTry = input.photoBase64 ? visionModels : textModels;

    // Only include image for vision-capable models
    const isVisionModel = (modelId: string) =>
      modelId.includes("gemma") || modelId.includes("maverick");

    let lastError: Error | null = null;

    for (const model of modelsToTry) {
      try {
        // Build messages — include photo only for vision models
        const messages: Array<Record<string, unknown>> = [];
        if (input.photoBase64 && isVisionModel(model)) {
          messages.push({
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${input.photoBase64}` },
              },
              { type: "text", text: userPrompt },
            ],
          });
        } else {
          messages.push({ role: "user", content: userPrompt });
        }

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://needbridge.vercel.app",
              "X-Title": "NeedBridge",
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                ...messages,
              ],
              response_format: { type: "json_object" },
              temperature: 0.3,
              max_tokens: 2000,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${model} failed with ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const content: string = data.choices[0].message.content;

        // Clean and parse the JSON response
        let cleanedText = content
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

        const jsonStart = cleanedText.indexOf("{");
        const jsonEnd = cleanedText.lastIndexOf("}");

        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error(`No valid JSON in response from ${model}`);
        }

        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(cleanedText);
      } catch (error: any) {
        console.warn(`Model ${model} failed — trying next:`, error.message);
        lastError = error;
        // Continue to next model in the array
      }
    }

    // All models failed
    throw lastError || new Error("All AI models failed. Please try again.");
  });