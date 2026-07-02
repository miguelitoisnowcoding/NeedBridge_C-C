import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { PageLayout } from "../layout/PageLayout";
import holdingHands from "../../../assets/holding-hands.jpg";
import { MOCK_SUBMISSIONS, type MockSubmission } from "@/lib/mockData";

const RECENT_SUBMISSIONS = MOCK_SUBMISSIONS.slice(0, 3);

function severityColor(severity: string) {
  if (severity === "High") return "#C62828";
  if (severity === "Medium") return "#F9A825";
  return "#388E3C";
}

function severityBgClass(severity: string) {
  if (severity === "High") return "bg-red-50";
  if (severity === "Medium") return "bg-yellow-50";
  return "bg-green-50";
}

function SeverityBadge({ severity }: { severity: string }) {
  if (severity === "High")
    return (
      <span className="bg-[#FEE2E2] text-[#C62828] font-bold rounded-full px-3 py-1 text-xs">
        {severity}
      </span>
    );
  if (severity === "Medium")
    return (
      <span className="bg-[#FEF9C3] text-[#854D0E] font-bold rounded-full px-3 py-1 text-xs">
        {severity}
      </span>
    );
  return (
    <span className="bg-[#DCFCE7] text-[#166534] font-bold rounded-full px-3 py-1 text-xs">
      {severity}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  if (status === "Open")
    return (
      <span className="bg-[#DBEAFE] text-[#185FA5] font-semibold rounded-full px-3 py-1 text-xs">
        {status}
      </span>
    );
  if (status === "In Progress")
    return (
      <span className="bg-[#FEF9C3] text-[#854D0E] font-semibold rounded-full px-3 py-1 text-xs">
        {status}
      </span>
    );
  return (
    <span className="bg-[#DCFCE7] text-[#166534] font-semibold rounded-full px-3 py-1 text-xs">
      {status}
    </span>
  );
}

interface SubmissionModalProps {
  submission: MockSubmission;
  onClose: () => void;
  onViewFullReport: (submission: MockSubmission) => void;
}

function SubmissionModal({ submission: s, onClose, onViewFullReport }: SubmissionModalProps) {
  const subject = encodeURIComponent(
    `[NeedBridge] ${s.severity} — ${s.description} in ${s.location}`
  );
  const body = encodeURIComponent(s.gov_escalation.email_template_draft);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative z-50 mt-20 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 text-white flex-shrink-0" style={{ background: "#185FA5" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
          <h2 className="text-xl font-bold pr-8">{s.description}</h2>
          <p className="text-white/70 text-sm mt-1">{s.location}</p>
          <div className="flex items-center gap-2 mt-3">
            <SeverityBadge severity={s.severity} />
            <StatusPill status={s.status} />
            <span className="text-white/60 text-xs ml-1">{s.date}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* ActNow */}
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: "#185FA5" }}>
              🟢 ActNow — Immediate Steps
            </p>
            <div className="flex flex-col">
              {s.actnow.immediate_actions.map((action, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "#185FA5" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700">{action.replace(/^\d+\.\s*/, "")}</p>
                </div>
              ))}
            </div>
            {s.actnow.short_term_steps.length > 0 && (
              <div className="mt-3 flex flex-col gap-1">
                {s.actnow.short_term_steps.map((step, i) => (
                  <p key={i} className="text-sm text-gray-500 pl-2">
                    • {step.replace(/^\d+\.\s*/, "")}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* BuildIt */}
          {s.buildit && (
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm font-semibold mb-3" style={{ color: "#E24B4A" }}>
                🔧 BuildIt — Community Fix
              </p>
              <p className="font-bold text-[#0F1E33] text-base mb-2">{s.buildit.solution_name}</p>
              <div className="mb-3">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full inline-block mr-2">
                  {s.buildit.difficulty_level}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full inline-block">
                  {s.buildit.estimated_time}
                </span>
              </div>
              <div className="mt-3 flex flex-col">
                {s.buildit.parts_list.map((part, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-sm text-gray-700">
                      {part.item}{" "}
                      <span className="text-gray-400">x{part.quantity}</span>
                    </span>
                    <span className="text-sm font-bold" style={{ color: "#185FA5" }}>
                      {part.est_price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3 flex-shrink-0">
          <a
            href={`mailto:contact@${s.gov_escalation.agency_name.toLowerCase()}.gov.ph?subject=${subject}&body=${body}`}
            className="flex-1 flex items-center justify-center rounded-lg py-3 text-sm font-bold transition-colors border-2 hover:bg-blue-50"
            style={{ borderColor: "#185FA5", color: "#185FA5" }}
          >
            🚩 Flag for Escalation — {s.gov_escalation.agency_name}
          </a>
          <button
            onClick={() => onViewFullReport(s)}
            className="flex-1 rounded-lg py-3 text-sm font-bold text-white transition-colors hover:bg-[#0C447C]"
            style={{ background: "#185FA5" }}
          >
            View Full Report →
          </button>
        </div>
      </div>
    </div>
  );
}

function OnboardingModal({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");

  // Step 2 form states
  const [city, setCity] = useState("");
  const [issueFrequency, setIssueFrequency] = useState("");
  const [issueTypes, setIssueTypes] = useState<string[]>([]);

  const [studentField, setStudentField] = useState("");
  const [studentInterests, setStudentInterests] = useState<string[]>([]);
  const [studentEnrollment, setStudentEnrollment] = useState("");

  const [officialPosition, setOfficialPosition] = useState("");
  const [officialCommunities, setOfficialCommunities] = useState("");
  const [officialChallenges, setOfficialChallenges] = useState<string[]>([]);

  const [ngoSector, setNgoSector] = useState("");
  const [ngoCommunities, setNgoCommunities] = useState("");
  const [ngoUseCase, setNgoUseCase] = useState<string[]>([]);

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  const completeOnboarding = (navigateTo?: string) => {
    localStorage.setItem("needbridge_onboarded", "true");
    localStorage.setItem("needbridge_role", selectedRole);
    onComplete();
    if (navigateTo) {
      navigate({ to: navigateTo });
    }
  };

  const toggleArrayItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    if (arr.includes(item)) {
      setArr(arr.filter((i) => i !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  const roleTitles: Record<string, string> = {
    resident: "Tell us about your community",
    student: "Tell us about your field",
    official: "Tell us about your role",
    ngo: "Tell us about your organization",
  };

  const welcomeTitles: Record<string, string> = {
    resident: "Welcome to NeedBridge! 🏘️",
    student: "Welcome, Future Builder! 🎓",
    official: "Welcome, Community Leader! 🏛️",
    ngo: "Welcome, Change Maker! 🤝",
  };

  const featureRows: Record<string, Array<{ bg: string; icon: string; title: string; subtitle: string }>> = {
    resident: [
      { bg: "bg-[#EFF6FF]", icon: "📸", title: "Quick Photo Reporting", subtitle: "Submit issues with one photo — no forms needed" },
      { bg: "bg-[#FEF9C3]", icon: "📍", title: "Your Barangay Feed", subtitle: "See all recent reports near your location" },
      { bg: "bg-[#DCFCE7]", icon: "⚡", title: "Instant AI Action Plan", subtitle: "Get a response plan generated in seconds" },
    ],
    student: [
      { bg: "bg-[#EFF6FF]", icon: "🔧", title: "BuildIt Blueprints", subtitle: "Access DIY guides built for your skill level" },
      { bg: "bg-[#FEF9C3]", icon: "📊", title: "Real Community Data", subtitle: "Analyze actual infrastructure needs near you" },
      { bg: "bg-[#DCFCE7]", icon: "🏅", title: "Build Your Portfolio", subtitle: "Document solutions you implement for real impact" },
    ],
    official: [
      { bg: "bg-[#EFF6FF]", icon: "📋", title: "Coordinator Dashboard", subtitle: "Track all submissions in your barangay in one place" },
      { bg: "bg-[#FEF9C3]", icon: "⚡", title: "AI-Prioritized Reports", subtitle: "High severity issues are flagged automatically" },
      { bg: "bg-[#DCFCE7]", icon: "📧", title: "One-Click Escalation", subtitle: "Pre-filled agency emails generated for every report" },
    ],
    ngo: [
      { bg: "bg-[#EFF6FF]", icon: "🗺️", title: "Community Needs Map", subtitle: "See infrastructure gaps across all areas you serve" },
      { bg: "bg-[#FEF9C3]", icon: "📊", title: "Impact Reports", subtitle: "Generate donor-ready summaries from real data" },
      { bg: "bg-[#DCFCE7]", icon: "🔧", title: "Volunteer Coordination", subtitle: "Connect your volunteers to active BuildIt projects" },
    ],
  };

  const ctaButtons: Record<string, { text: string; navigateTo: string }> = {
    resident: { text: "Submit My First Report →", navigateTo: "/submit" },
    student: { text: "Explore BuildIt Guides →", navigateTo: "/reports" },
    official: { text: "Open Coordinator Dashboard →", navigateTo: "/dashboard" },
    ngo: { text: "View Community Reports →", navigateTo: "/reports" },
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-start justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto my-4 relative">
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100">
          <div
            className="bg-[#185FA5] h-1 transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Step counter */}
        <span className="absolute top-4 right-5 text-xs text-gray-400 font-medium">
          Step {step} of 3
        </span>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="bg-[#185FA5] p-8 text-white text-center">
              <p className="text-2xl font-bold mb-1">NeedBridge</p>
              <p className="text-lg text-white/80 mb-2">See it. Solve it.</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Help us personalize your experience. Who are you joining as today?
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                I am a...
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "resident", icon: "🏘️", title: "Community Resident", subtitle: "I want to report issues in my barangay" },
                  { key: "student", icon: "🎓", title: "Student / Maker", subtitle: "Engineering, tech, or any field — I want to help build solutions" },
                  { key: "official", icon: "🏛️", title: "Barangay / LGU Official", subtitle: "I coordinate community response and resource allocation" },
                  { key: "ngo", icon: "🤝", title: "NGO / Organization", subtitle: "We support communities and want to track local needs" },
                ].map((role) => (
                  <div
                    key={role.key}
                    onClick={() => setSelectedRole(role.key)}
                    className={`border-2 rounded-xl p-4 cursor-pointer text-center flex flex-col items-center gap-2 transition-all ${
                      selectedRole === role.key
                        ? "border-[#185FA5] bg-[#EFF6FF]"
                        : "border-gray-200 hover:border-[#185FA5] hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-3xl">{role.icon}</span>
                    <p className="text-sm font-semibold text-[#0F1E33]">{role.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{role.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                disabled={!selectedRole}
                onClick={() => setStep(2)}
                className="w-full bg-[#185FA5] text-white rounded-xl py-3.5 font-bold text-sm hover:bg-[#0C447C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="p-6 pb-0">
              <span
                onClick={() => setStep(1)}
                className="text-[#185FA5] cursor-pointer text-sm font-medium"
              >
                ← Back
              </span>
              <p className="text-xl font-bold text-[#0F1E33] mt-4">{roleTitles[selectedRole]}</p>
              <p className="text-sm text-gray-400 mt-1 mb-6">
                This helps NeedBridge surface the most relevant tools for you.
              </p>
            </div>

            <div className="p-6 pt-2 flex flex-col gap-5 overflow-y-auto max-h-[45vh] md:max-h-none">
              {selectedRole === "resident" && (
                <>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Which city or municipality are you from?
                    </p>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Quezon City, Caloocan..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#185FA5] focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      How often do you see unresolved infrastructure issues in your area?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["Rarely", "Sometimes", "Very Often"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setIssueFrequency(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            issueFrequency === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What types of issues do you most commonly see?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["🚧 Roads", "💧 Water", "💡 Streetlights", "🗑️ Waste", "🌊 Flooding", "🏗️ Buildings"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => toggleArrayItem(issueTypes, setIssueTypes, opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            issueTypes.includes(opt)
                              ? "bg-[#EFF6FF] border border-[#185FA5] text-[#185FA5]"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedRole === "student" && (
                <>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What field are you studying or working in?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["⚙️ Civil Engineering", "💻 Computer Science / IT", "⚡ Electrical Engineering", "🏗️ Architecture", "🔬 Environmental Science", "📋 Other"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setStudentField(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            studentField === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What are you most interested in doing on NeedBridge?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["🔧 Build DIY solutions from BuildIt guides", "📊 Analyze community needs data", "🤝 Volunteer for barangay projects"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => toggleArrayItem(studentInterests, setStudentInterests, opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            studentInterests.includes(opt)
                              ? "bg-[#EFF6FF] border border-[#185FA5] text-[#185FA5]"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Are you currently enrolled or working?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["Currently Enrolled", "Recently Graduated", "Working Professional"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setStudentEnrollment(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            studentEnrollment === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedRole === "official" && (
                <>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What is your position?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["Barangay Captain", "Barangay Kagawad", "City/Municipal Officer", "DRRMO Staff", "Other LGU Role"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setOfficialPosition(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            officialPosition === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      How many barangays or communities are you responsible for?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["Just 1", "2–5", "6–20", "20+"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setOfficialCommunities(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            officialCommunities === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What is your biggest challenge in community response?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["📋 Tracking all reported issues", "⚡ Responding fast enough", "🔧 Lack of technical solutions", "📢 Communicating with residents"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => toggleArrayItem(officialChallenges, setOfficialChallenges, opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            officialChallenges.includes(opt)
                              ? "bg-[#EFF6FF] border border-[#185FA5] text-[#185FA5]"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedRole === "ngo" && (
                <>
                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What sector does your organization primarily serve?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["🌊 Disaster Relief", "💧 Water & Sanitation", "🏥 Health", "🏫 Education", "🌱 Environment", "🤝 General Community"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setNgoSector(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            ngoSector === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      How many communities do you currently serve?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["1–5", "6–20", "21–50", "50+"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => setNgoCommunities(opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            ngoCommunities === opt
                              ? "bg-[#185FA5] text-white"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      How would your organization use NeedBridge?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["📊 Monitor community needs in our area", "🔧 Connect volunteers to BuildIt projects", "📋 Generate reports for our donors/LGU"].map((opt) => (
                        <span
                          key={opt}
                          onClick={() => toggleArrayItem(ngoUseCase, setNgoUseCase, opt)}
                          className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
                            ngoUseCase.includes(opt)
                              ? "bg-[#EFF6FF] border border-[#185FA5] text-[#185FA5]"
                              : "border border-gray-200 text-gray-500 hover:border-[#185FA5]"
                          }`}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 pt-2 flex flex-col">
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-shrink-0 border border-gray-200 text-gray-500 rounded-xl px-5 py-3.5 text-sm font-bold hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#185FA5] text-white rounded-xl py-3.5 font-bold text-sm hover:bg-[#0C447C] transition-colors"
                >
                  Continue →
                </button>
              </div>
              <span
                onClick={() => completeOnboarding()}
                className="text-center text-xs text-gray-400 hover:text-gray-600 cursor-pointer mt-2"
              >
                Skip for now
              </span>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="bg-[#185FA5] p-8 text-white text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">✓</span>
              </div>
              <p className="text-2xl font-bold mb-2">{welcomeTitles[selectedRole]}</p>
              <p className="text-white/80 text-sm">Your personalized NeedBridge is ready.</p>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Here's what we've set up for you:
              </p>

              {featureRows[selectedRole]?.map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${row.bg}`}>
                    <span className="text-lg">{row.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-900">{row.title}</p>
                    <p className="text-xs text-gray-500">{row.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => completeOnboarding(ctaButtons[selectedRole]?.navigateTo)}
                className="w-full bg-[#E24B4A] text-white rounded-xl py-4 font-bold text-sm hover:bg-[#c93e3d] transition-colors"
              >
                {ctaButtons[selectedRole]?.text}
              </button>
              <span
                onClick={() => completeOnboarding()}
                className="block text-center text-xs text-gray-400 hover:text-[#185FA5] cursor-pointer mt-3"
              >
                Explore on my own →
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function HomeScreen() {
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<MockSubmission | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("needbridge_onboarded");
    const storedRole = localStorage.getItem("needbridge_role");
    setShowOnboarding(!hasOnboarded);
    setUserRole(storedRole);
  }, []);

  const handleViewFullReport = (submission: MockSubmission) => {
    localStorage.setItem("selectedReportId", String(submission.id));
    navigate({ to: "/reports" });
  };

  const getHeroSubtitle = () => {
    switch (userRole) {
      case "student":
        return "Find real community problems to solve. Build your portfolio.";
      case "official":
        return "Track, prioritize, and act on every report in your barangay.";
      case "ngo":
        return "Monitor community needs. Coordinate impact at scale.";
      default:
        return "From photo to plan — same day.";
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32" style={{ background: "#0C447C" }}>
        {/* Background image layer */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${holdingHands})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dot pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#185FA5 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <h1 className="mb-6 text-[40px] font-bold leading-tight text-white">
            See it. Solve it.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
            {getHeroSubtitle()}
          </p>
          <div className="flex flex-col gap-5 sm:flex-row">
            <Link
              to="/submit"
              className="rounded-lg px-8 py-3.5 text-lg font-bold text-white shadow-lg transition-colors hover:opacity-90"
              style={{ background: "#E24B4A" }}
            >
              Submit a Need
            </Link>
            <Link
              to="/reports"
              className="rounded-lg border-2 border-white px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              View Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Large Featured Stat */}
          <div className="relative col-span-1 flex flex-col justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] lg:col-span-7">
            <div className="pointer-events-none absolute bottom-[-20px] right-[-20px] opacity-[0.03]">
              <svg className="h-60 w-60" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-2h2v16h-2z" />
              </svg>
            </div>
            <h3 className="relative z-10 mb-3 text-[22px] font-bold" style={{ color: "#185FA5" }}>
              Real-time Impact Tracking
            </h3>
            <p className="relative z-10 mb-8 max-w-md text-base leading-relaxed text-gray-500">
              Our AI validates and prioritizes submissions, generating actionable reports for local government units instantly.
            </p>
            <div className="relative z-10 flex items-end gap-6">
              <div className="text-[48px] font-bold leading-none" style={{ color: "#185FA5" }}>
                1,204
              </div>
              <div className="pb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                Needs Resolved
                <br />
                This Year
              </div>
            </div>
          </div>

          {/* Small Stats */}
          <div className="col-span-1 flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-grow flex-col justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]" style={{ borderLeft: "6px solid #185FA5" }}>
              <div className="mb-3 flex items-center gap-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-lg font-semibold text-gray-700">Verified Submissions</span>
              </div>
              <div className="text-4xl font-bold" style={{ color: "#185FA5" }}>
                89%
              </div>
            </div>
            <div className="flex flex-grow flex-col justify-center rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]" style={{ borderLeft: "6px solid #E24B4A" }}>
              <div className="mb-3 flex items-center gap-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#E24B4A" }}>
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span className="text-lg font-semibold text-gray-700">Avg. Response Time</span>
              </div>
              <div className="text-4xl font-bold" style={{ color: "#185FA5" }}>
                48 Hrs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Submissions */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold" style={{ color: "#185FA5" }}>
              Recent Submissions
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Latest infrastructure needs reported by the community.
            </p>
          </div>
          <Link
            to="/reports"
            className="hidden items-center font-semibold transition-colors hover:underline sm:flex"
            style={{ color: "#185FA5" }}
          >
            View All
            <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RECENT_SUBMISSIONS.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubmission(sub)}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
              style={{ borderTop: `6px solid ${severityColor(sub.severity)}` }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${severityBgClass(sub.severity)}`}
                  style={{ color: severityColor(sub.severity) }}
                >
                  {sub.severity} Priority
                </div>
                <span className="text-sm font-medium text-gray-400">{sub.date}</span>
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-snug text-gray-900">
                {sub.description}
              </h3>
              <p className="mb-8 line-clamp-2 text-base leading-relaxed text-gray-500">
                {sub.location}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {sub.barangay}
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sub.status === "Resolved" ? "bg-[#DCFCE7] text-[#166534]" : sub.status === "In Progress" ? "bg-[#FEF9C3] text-[#854D0E]" : "bg-[#DBEAFE] text-[#185FA5]"}`}
                >
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/reports"
            className="inline-flex items-center font-semibold hover:underline"
            style={{ color: "#185FA5" }}
          >
            View All Submissions
            <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          onComplete={() => {
            setShowOnboarding(false);
            const storedRole = localStorage.getItem("needbridge_role");
            setUserRole(storedRole);
          }}
        />
      )}

      {/* Submission Modal */}
      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onViewFullReport={handleViewFullReport}
        />
      )}
    </PageLayout>
  );
}
