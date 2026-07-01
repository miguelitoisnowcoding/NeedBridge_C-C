export const MOCK_SUBMISSIONS = [
  {
    id: 1,
    description: "Clogged drainage on Rizal St.",
    type: "Water",
    typeIcon: "💧",
    severity: "High",
    date: "Oct 24, 2024",
    status: "Open",
    location: "Rizal St., Barangay San Isidro",
    barangay: "Barangay San Isidro",
    confidence: 0.92,
    is_diy_feasible: true,
    actnow: {
      immediate_actions: [
        "1. Alert tanod force and rope off the affected drainage area immediately.",
        "2. Notify residents within 50 meters to avoid the flooded zone.",
        "3. Place warning signs and barriers around the clogged drainage.",
        "4. Contact MWSS barangay liaison for emergency assessment.",
      ],
      short_term_steps: [
        "1. Organize a drainage clearing team of 4-6 community volunteers.",
        "2. Schedule a follow-up inspection within 48 hours.",
      ],
      resources_needed: [
        "Barangay tanod force",
        "Warning cones and tape",
        "MWSS barangay contact",
      ],
      responsible_parties: [
        "Barangay Captain",
        "Tanod Commander",
        "MWSS Liaison",
      ],
    },
    buildit: {
      solution_name: "Temporary Drainage Diversion Kit",
      difficulty_level: "Beginner",
      estimated_time: "2-3 hours",
      build_steps: [
        "1. Clear loose debris from the drainage opening using gloves.",
        "2. Lay sandbags in a U-shape around the blocked area to divert water flow.",
        "3. Insert PVC pipe sections to create a temporary bypass channel.",
        "4. Secure pipes with rope ties to prevent displacement.",
        "5. Check water flow every 30 minutes and adjust sandbag position as needed.",
      ],
      parts_list: [
        { item: "PVC pipe (1m)", quantity: 2, est_price: "₱120", availability: "Available" },
        { item: "Sandbags", quantity: 5, est_price: "₱75", availability: "Available" },
        { item: "Rope (5m)", quantity: 1, est_price: "₱40", availability: "Available" },
        { item: "Waterproof tape", quantity: 2, est_price: "₱35", availability: "Available" },
      ],
    },
    gov_escalation: {
      agency_name: "MWSS",
      agency_relevance:
        "MWSS handles water line and drainage infrastructure in Metro Manila barangays.",
      email_template_draft:
        "Dear MWSS,\n\nWe wish to report a High severity drainage blockage on Rizal St., Barangay San Isidro. The blockage is causing localized flooding and poses an immediate health and safety risk to residents.\n\nWe request an emergency assessment at your earliest convenience.\n\nThank you.\n\n— NeedBridge Civic Technology",
    },
  },
  {
    id: 2,
    description: "Broken streetlight near plaza",
    type: "Infrastructure",
    typeIcon: "⚡",
    severity: "Medium",
    date: "Oct 23, 2024",
    status: "In Progress",
    location: "Plaza Area, Barangay San Isidro",
    barangay: "Barangay San Isidro",
    confidence: 0.85,
    is_diy_feasible: true,
    actnow: {
      immediate_actions: [
        "1. Place orange cones around the non-functioning streetlight.",
        "2. Assign two barangay tanods for night patrol in the unlit area.",
        "3. Log the issue in the barangay infrastructure incident report.",
        "4. Coordinate with the city electrician for a scheduled repair visit.",
      ],
      short_term_steps: [
        "1. Install a temporary solar lamp as a stopgap measure.",
        "2. File a formal work order with the city engineering office.",
      ],
      resources_needed: [
        "Orange traffic cones (x4)",
        "Barangay tanod patrol",
        "City electrician contact",
      ],
      responsible_parties: [
        "Barangay Engineer",
        "Tanod Night Patrol",
        "City Electrical Division",
      ],
    },
    buildit: {
      solution_name: "Temporary Solar Lamp Post",
      difficulty_level: "Intermediate",
      estimated_time: "3-4 hours",
      build_steps: [
        "1. Select a stable mounting point near the broken streetlight.",
        "2. Dig a 30cm hole and set the bamboo pole with concrete mix.",
        "3. Allow concrete to set for at least 1 hour before mounting lamp.",
        "4. Attach solar garden lamp to the top of the pole using cable ties.",
        "5. Test the solar panel orientation — face south for maximum charge.",
      ],
      parts_list: [
        { item: "Solar garden lamp", quantity: 1, est_price: "₱450", availability: "Available" },
        { item: "Bamboo pole (3m)", quantity: 1, est_price: "₱80", availability: "Available" },
        { item: "Cable ties", quantity: 10, est_price: "₱25", availability: "Available" },
        { item: "Concrete mix (small bag)", quantity: 1, est_price: "₱95", availability: "Available" },
      ],
    },
    gov_escalation: {
      agency_name: "DILG",
      agency_relevance:
        "DILG oversees barangay infrastructure maintenance and local government coordination.",
      email_template_draft:
        "Dear DILG,\n\nWe are reporting a Medium severity broken streetlight near the plaza in Barangay San Isidro. The area is currently unlit at night, posing a safety risk to residents.\n\nWe request coordination with the city electrical division for prompt repair.\n\nThank you.\n\n— NeedBridge Civic Technology",
    },
  },
  {
    id: 3,
    description: "Deep pothole on Mabini Ave",
    type: "Infrastructure",
    typeIcon: "⚡",
    severity: "High",
    date: "Oct 22, 2024",
    status: "Resolved",
    location: "Mabini Ave., Barangay San Isidro",
    barangay: "Barangay San Isidro",
    confidence: 0.88,
    is_diy_feasible: true,
    actnow: {
      immediate_actions: [
        "1. Place traffic cones and warning tape around the pothole immediately.",
        "2. Redirect foot and vehicle traffic to an alternate route.",
        "3. Document the pothole dimensions with photos for DPWH filing.",
        "4. Submit a formal report to the District Engineering Office.",
      ],
      short_term_steps: [
        "1. Apply cold mix asphalt as a temporary patch within 24 hours.",
        "2. Monitor the patch daily and reapply if displacement occurs.",
      ],
      resources_needed: [
        "Traffic cones and warning tape",
        "Camera for documentation",
        "DPWH district contact",
      ],
      responsible_parties: [
        "Barangay Engineer",
        "DPWH District Office",
        "Community Volunteers",
      ],
    },
    buildit: {
      solution_name: "Cold Mix Asphalt Patch",
      difficulty_level: "Intermediate",
      estimated_time: "2-3 hours",
      build_steps: [
        "1. Clean the pothole — remove all loose debris and standing water.",
        "2. Cut the edges of the pothole square using a chisel if possible.",
        "3. Pour cold mix asphalt into the hole until slightly overfilled.",
        "4. Tamp down firmly using a tamping rod or heavy flat object.",
        "5. Allow to cure for 2 hours before reopening to traffic.",
      ],
      parts_list: [
        { item: "Cold mix asphalt (bag)", quantity: 2, est_price: "₱380", availability: "Available" },
        { item: "Tamping rod", quantity: 1, est_price: "₱150", availability: "Available" },
        { item: "Safety gloves (pair)", quantity: 2, est_price: "₱60", availability: "Available" },
        { item: "Traffic cones", quantity: 4, est_price: "₱200", availability: "Available" },
      ],
    },
    gov_escalation: {
      agency_name: "DPWH",
      agency_relevance:
        "DPWH is responsible for road infrastructure repair and maintenance in barangay areas.",
      email_template_draft:
        "Dear DPWH,\n\nWe are reporting a High severity deep pothole on Mabini Ave., Barangay San Isidro. The pothole poses an immediate risk to vehicles and pedestrians.\n\nA temporary cold mix patch has been applied by community volunteers. We request a permanent repair at your earliest convenience.\n\nThank you.\n\n— NeedBridge Civic Technology",
    },
  },
  {
    id: 4,
    description: "Water line leak on Bonifacio St.",
    type: "Water",
    typeIcon: "💧",
    severity: "High",
    date: "Oct 21, 2024",
    status: "Open",
    location: "Bonifacio St., Barangay San Isidro",
    barangay: "Barangay San Isidro",
    confidence: 0.9,
    is_diy_feasible: true,
    actnow: {
      immediate_actions: [
        "1. Shut off the nearest water valve to reduce pressure on the leak.",
        "2. Distribute bottled water from barangay hall to affected households.",
        "3. Rope off the wet area to prevent slipping accidents.",
        "4. File an emergency report with the MWSS district office.",
      ],
      short_term_steps: [
        "1. Apply temporary pipe repair wrap to slow the leak.",
        "2. Monitor water pressure and inform residents of estimated repair time.",
      ],
      resources_needed: [
        "Water valve wrench",
        "Bottled water reserves",
        "MWSS emergency hotline",
      ],
      responsible_parties: [
        "Barangay Water Officer",
        "MWSS District Office",
        "Community Volunteers",
      ],
    },
    buildit: {
      solution_name: "Pipe Leak Temporary Wrap",
      difficulty_level: "Beginner",
      estimated_time: "1-2 hours",
      build_steps: [
        "1. Shut off the water supply at the nearest valve before starting.",
        "2. Dry the pipe surface around the leak with a cloth.",
        "3. Apply waterproof epoxy putty directly over the leak and press firmly.",
        "4. Wrap the repair clamp over the putty and tighten bolts evenly.",
        "5. Slowly reopen the water valve and check for remaining leaks.",
      ],
      parts_list: [
        { item: "Pipe repair clamp", quantity: 1, est_price: "₱180", availability: "Available" },
        { item: "Waterproof epoxy putty", quantity: 1, est_price: "₱95", availability: "Available" },
        { item: "Rubber gasket sheet", quantity: 1, est_price: "₱75", availability: "Available" },
        { item: "Adjustable wrench", quantity: 1, est_price: "₱220", availability: "Available" },
      ],
    },
    gov_escalation: {
      agency_name: "MWSS",
      agency_relevance:
        "MWSS handles water line infrastructure, pipe repair, and water supply in Metro Manila.",
      email_template_draft:
        "Dear MWSS,\n\nWe are reporting a High severity water line leak on Bonifacio St., Barangay San Isidro. The leak is disrupting water supply to multiple households.\n\nA temporary pipe wrap has been applied. We request a permanent repair crew at your earliest convenience.\n\nThank you.\n\n— NeedBridge Civic Technology",
    },
  },
  {
    id: 5,
    description: "Garbage overflow at collection point",
    type: "Safety",
    typeIcon: "🛡️",
    severity: "Medium",
    date: "Oct 20, 2024",
    status: "In Progress",
    location: "Purok 3 Collection Point, Barangay San Isidro",
    barangay: "Barangay San Isidro",
    confidence: 0.78,
    is_diy_feasible: true,
    actnow: {
      immediate_actions: [
        "1. Organize a community clean-up brigade for this weekend.",
        "2. Place additional temporary bins to contain the overflow.",
        "3. Post a barangay notice reminding residents of disposal schedules.",
        "4. Coordinate with the city sanitation office for an extra pickup.",
      ],
      short_term_steps: [
        "1. Install DIY segregation bins at the collection point.",
        "2. Assign a volunteer monitor for the next two weekends.",
      ],
      resources_needed: [
        "Additional waste bins",
        "Barangay announcement system",
        "City sanitation contact",
      ],
      responsible_parties: [
        "Barangay Sanitation Officer",
        "Community Volunteers",
        "City Sanitation Division",
      ],
    },
    buildit: {
      solution_name: "DIY Waste Segregation Bins",
      difficulty_level: "Beginner",
      estimated_time: "1-2 hours",
      build_steps: [
        "1. Obtain three large plastic drums (80L) from the barangay supply.",
        "2. Paint each drum a different color: green (biodegradable), blue (recyclable), red (residual).",
        "3. Use stencils to label each bin clearly in Filipino and English.",
        "4. Attach rope handles to each drum for easy transport.",
        "5. Place the bins at the collection point and brief residents on proper use.",
      ],
      parts_list: [
        { item: "Large plastic drum (80L)", quantity: 3, est_price: "₱360", availability: "Available" },
        { item: "Paint set (3 colors)", quantity: 1, est_price: "₱85", availability: "Available" },
        { item: "Stencil set", quantity: 1, est_price: "₱45", availability: "Available" },
        { item: "Rope handle kit", quantity: 3, est_price: "₱90", availability: "Available" },
      ],
    },
    gov_escalation: {
      agency_name: "DILG",
      agency_relevance:
        "DILG coordinates barangay sanitation programs and waste management compliance.",
      email_template_draft:
        "Dear DILG,\n\nWe are reporting a Medium severity garbage overflow at the Purok 3 collection point in Barangay San Isidro. The overflow is creating unsanitary conditions for nearby residents.\n\nWe request coordination with the city sanitation office for an additional collection schedule.\n\nThank you.\n\n— NeedBridge Civic Technology",
    },
  },
];

export const MOCK_STATS = {
  totalReports: MOCK_SUBMISSIONS.length,
  highSeverity: MOCK_SUBMISSIONS.filter((s) => s.severity === "High").length,
  inProgress: MOCK_SUBMISSIONS.filter((s) => s.status === "In Progress").length,
  resolved: MOCK_SUBMISSIONS.filter((s) => s.status === "Resolved").length,
};

export type MockSubmission = (typeof MOCK_SUBMISSIONS)[number];
