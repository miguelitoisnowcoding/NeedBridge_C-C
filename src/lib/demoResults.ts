import type { NeedBridgeOutput } from "./openrouter";

export const DEMO_MODE_KEY = "needbridgeDemoMode";

const drainage: NeedBridgeOutput = {
  issue_type: "Drainage Blockage",
  severity: "High",
  confidence: 0.92,
  is_diy_feasible: true,
  barangay_context:
    "A blocked drainage system near Barangay San Isidro is causing floodwater to accumulate on the main road, affecting approximately 80 households.",
  actnow: {
    immediate_actions: [
      "1. Deploy tanod personnel to rope off the flooded section of the road immediately",
      "2. Notify the barangay captain and DRRMO officer of the drainage blockage",
      "3. Post warning signs at both ends of the affected road to redirect foot traffic",
    ],
    short_term_steps: [
      "1. Coordinate a community cleanup team of at least 10 volunteers for tomorrow morning",
      "2. Request a DPWH drainage inspection within 48 hours via formal written request",
      "3. Document the blockage with photos and submit to the barangay records office",
    ],
    resources_needed: [
      "Rope and warning cones for road cordoning",
      "Shovels and rakes for debris clearing",
      "Megaphone for community announcement",
      "Barangay emergency fund for cleanup materials",
    ],
    responsible_parties: [
      "Barangay Captain — overall coordination",
      "DRRMO Officer — disaster risk assessment",
      "Tanod Force — road cordoning and crowd control",
      "Barangay Health Worker — monitor for health hazards",
    ],
  },
  buildit: {
    solution_name: "DIY Drainage De-clogger",
    difficulty_level: "Beginner",
    estimated_time: "2-3 hours",
    build_steps: [
      "1. Wear rubber gloves and boots before approaching the drainage opening",
      "2. Use the sturdy stick or PVC pipe to probe the drainage and locate the blockage",
      "3. Attach the small hook or net to the end of the PVC pipe using duct tape",
      "4. Insert the tool into the drainage and pull out debris in sections — do not force it",
      "5. Flush the drain with a bucket of water to test if flow has been restored",
      "6. Dispose of removed debris in sealed garbage bags away from the drain",
    ],
    parts_list: [
      { item: "Sturdy bamboo stick or PVC pipe (6ft)", quantity: 1, est_price: "₱150", availability: "Available at Wilcon Depot" },
      { item: "Duct tape (heavy duty roll)", quantity: 1, est_price: "₱100", availability: "Available at Ace Hardware" },
      { item: "Small metal hook or wire mesh net", quantity: 1, est_price: "₱80", availability: "Available at Shopee Philippines" },
      { item: "Rubber gloves (pair)", quantity: 1, est_price: "₱50", availability: "Available at any hardware store" },
      { item: "Garbage bags (pack of 10)", quantity: 1, est_price: "₱45", availability: "Available at any sari-sari store" },
    ],
  },
  gov_escalation: {
    agency_name: "DPWH",
    agency_relevance:
      "The drainage system along the main road falls under DPWH jurisdiction for inspection and major repair.",
    email_template_draft:
      "Dear DPWH Regional Office, We wish to report a severe drainage blockage at the main road of Barangay San Isidro causing flooding that affects approximately 80 households. We request an urgent inspection and repair. Thank you.",
  },
} as unknown as NeedBridgeOutput;

const road: NeedBridgeOutput = {
  issue_type: "Road Damage",
  severity: "Medium",
  confidence: 0.88,
  is_diy_feasible: true,
  barangay_context:
    "A large pothole on Barangay Poblacion's secondary road is causing vehicle damage and poses a safety risk to motorcyclists and pedestrians.",
  actnow: {
    immediate_actions: [
      "1. Place visible warning markers — cones, rocks, or rope — around the pothole immediately",
      "2. Inform the barangay captain and log the damage in the barangay incident record",
      "3. Alert the local DPWH satellite office via phone call to request road inspection",
    ],
    short_term_steps: [
      "1. Organize a volunteer team of 4-6 residents for a temporary road patching session",
      "2. Source cold-mix asphalt or gravel from the barangay supply or local hardware store",
      "3. Submit a formal written road damage report to the municipal engineering office",
    ],
    resources_needed: [
      "Warning cones or improvised road markers",
      "Cold-mix asphalt or compacted gravel",
      "Tamping rod or heavy flat stone for compaction",
      "Barangay emergency maintenance fund",
    ],
    responsible_parties: [
      "Barangay Captain — formal reporting and fund authorization",
      "Tanod Force — area cordoning and traffic management",
      "Municipal Engineering Office — permanent repair coordination",
      "Community Volunteers — temporary patching team",
    ],
  },
  buildit: {
    solution_name: "Temporary Pothole Patch Kit",
    difficulty_level: "Beginner",
    estimated_time: "1-2 hours",
    build_steps: [
      "1. Clear the pothole of loose debris, water, and dirt using a broom and dustpan",
      "2. Pour cold-mix asphalt or compacted gravel into the pothole in 2-inch layers",
      "3. Tamp each layer firmly using the tamping rod or a heavy flat stone",
      "4. Continue filling and tamping until the patch is level with the surrounding road surface",
      "5. Allow the patch to set for at least 1 hour before opening to vehicle traffic",
      "6. Place a temporary marker at the patch site and check it after 24 hours for settling",
    ],
    parts_list: [
      { item: "Cold-mix asphalt (25kg bag)", quantity: 2, est_price: "₱850", availability: "Available at Wilcon Depot" },
      { item: "Tamping rod or steel bar", quantity: 1, est_price: "₱350", availability: "Available at Ace Hardware Philippines" },
      { item: "Heavy-duty work gloves (pair)", quantity: 2, est_price: "₱120", availability: "Available at any hardware store" },
      { item: "Broom and dustpan set", quantity: 1, est_price: "₱85", availability: "Available at any sari-sari store or market" },
    ],
  },
  gov_escalation: {
    agency_name: "DPWH",
    agency_relevance:
      "Permanent road repair and resurfacing of barangay roads fall under DPWH jurisdiction.",
    email_template_draft:
      "Dear DPWH Regional Office, We wish to report significant road damage and pothole formation on the secondary road of Barangay Poblacion. The damage poses safety risks to motorists and pedestrians. We request an urgent inspection and permanent repair schedule. Thank you.",
  },
} as unknown as NeedBridgeOutput;

const streetlight: NeedBridgeOutput = {
  issue_type: "Streetlight Failure",
  severity: "Low",
  confidence: 0.85,
  is_diy_feasible: true,
  barangay_context:
    "Three consecutive streetlights along Barangay Mabini's main pathway have been non-functional for one week, creating safety risks for residents at night.",
  actnow: {
    immediate_actions: [
      "1. Place reflective markers or improvised lanterns near the dark pathway tonight",
      "2. Request tanod personnel to increase patrol frequency along the unlit area after 6PM",
      "3. Contact the local MERALCO service center to report the streetlight outage",
    ],
    short_term_steps: [
      "1. Identify whether the issue is a blown bulb, tripped breaker, or damaged wiring",
      "2. Coordinate with a licensed electrician volunteer from the community for inspection",
      "3. File a formal streetlight repair request with the municipal engineering office",
    ],
    resources_needed: [
      "Reflective markers or battery-powered lanterns for temporary lighting",
      "Contact details for MERALCO area service center",
      "Barangay maintenance fund for bulb or fixture replacement",
    ],
    responsible_parties: [
      "Barangay Captain — coordinate with MERALCO and municipal office",
      "Tanod Force — increased night patrol along unlit pathway",
      "Licensed Electrician Volunteer — safety inspection of fixture",
      "Barangay Treasurer — authorize emergency maintenance fund",
    ],
  },
  buildit: {
    solution_name: "LED Streetlight Bulb Replacement Kit",
    difficulty_level: "Intermediate",
    estimated_time: "1-2 hours",
    build_steps: [
      "1. Turn off the circuit breaker controlling the streetlight before any work begins",
      "2. Set up a stable ladder directly beneath the streetlight fixture — have a spotter hold it",
      "3. Remove the protective casing of the streetlight fixture by unscrewing the retaining bolts",
      "4. Carefully remove the old bulb by rotating it counterclockwise until it releases",
      "5. Insert the new LED bulb and rotate clockwise until firmly seated",
      "6. Replace the protective casing, tighten the bolts, and restore power at the breaker",
      "7. Test the light at dusk and confirm all three units are functioning before leaving the site",
    ],
    parts_list: [
      { item: "LED street light bulb 40W E27 base", quantity: 3, est_price: "₱450", availability: "Available at Wilcon Depot or Shopee Philippines" },
      { item: "Aluminum ladder 6ft", quantity: 1, est_price: "₱1200", availability: "Available at Ace Hardware Philippines" },
      { item: "Insulated screwdriver set", quantity: 1, est_price: "₱180", availability: "Available at any hardware store" },
      { item: "Electrical tape roll", quantity: 1, est_price: "₱35", availability: "Available at any hardware store" },
      { item: "Work gloves insulated (pair)", quantity: 1, est_price: "₱120", availability: "Available at Ace Hardware Philippines" },
    ],
  },
} as unknown as NeedBridgeOutput;

export const DEMO_RESULTS: Record<string, NeedBridgeOutput> = {
  "demo-drainage.jpg": drainage,
  "demo-road.jpg": road,
  "demo-streetlight.jpg": streetlight,
};

export const DEFAULT_DEMO: NeedBridgeOutput = drainage;

export interface DemoOption {
  id: string;
  label: string;
  filename: string;
  result: NeedBridgeOutput;
}

export const DEMO_OPTIONS: DemoOption[] = [
  { id: "drainage", label: "Demo 1 — Drainage Overflow", filename: "demo-drainage.jpg", result: drainage },
  { id: "road", label: "Demo 2 — Road Damage", filename: "demo-road.jpg", result: road },
  { id: "streetlight", label: "Demo 3 — Broken Streetlight", filename: "demo-streetlight.jpg", result: streetlight },
];

export function getDemoByFilename(name: string | undefined): NeedBridgeOutput | null {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  return DEMO_RESULTS[key] ?? null;
}

export function activateDemo(result: NeedBridgeOutput) {
  localStorage.setItem("needbridgeResult", JSON.stringify(result));
  localStorage.setItem(DEMO_MODE_KEY, "true");
}

export function clearDemoFlag() {
  localStorage.removeItem(DEMO_MODE_KEY);
}