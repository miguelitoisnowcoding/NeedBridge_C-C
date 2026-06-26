import { useState } from "react";
import { analyzeNeed, fileToBase64, NeedBridgeInput } from "@/lib/openrouter";
import { Link, useNavigate } from "@tanstack/react-router";
import { PageLayout } from "../layout/PageLayout";

const CATEGORIES = ["Infrastructure", "Water", "Safety", "Other"];

export function SubmitScreen() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/loading" });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
      setUploadedFile(file);
    }
  };

    const handleSubmit = async () => {
    // Validate input
    if (!uploadedFile && !description) {
      setError("Please upload a photo or describe the issue.");
      return;
    }
  
    setError(null);
    setIsAnalyzing(true);
  
    try {
    // Build the input object
    const input: NeedBridgeInput = {
      category,
      location,
      description: description || undefined,
    };

    // Convert photo to base64 if provided
    if (uploadedFile) {
      input.photoBase64 = await fileToBase64(uploadedFile);
    }

    // Call the two-stage AI pipeline
    const result = await analyzeNeed(input);

    // Check for low confidence fallback
    if ("status" in result && result.status === "LOW_CONFIDENCE_FALLBACK") {
      setError(result.message);
      setIsAnalyzing(false);
      return;
    }

        // Save result to localStorage and navigate to result screen
    localStorage.setItem("needbridgeResult", JSON.stringify(result));
    window.location.href = "/result";
    
      } catch (err: any) {
        setError("Something went wrong. Please try again.");
        console.error("Submit error:", err);
      } finally {
        setIsAnalyzing(false);
      }
    };

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {/* Back Link */}
        <Link to="/" className="mb-6 inline-flex items-center text-sm font-semibold" style={{ color: "#185FA5" }}>
          <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          Back to Home
        </Link>

        {/* Progress Indicator */}
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />
            <div className="absolute left-0 top-1/2 -z-10 h-1 w-[10%] -translate-y-1/2 rounded-full" style={{ background: "#E24B4A" }} />
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm text-white shadow-sm ring-4 ring-white" style={{ background: "#E24B4A" }}>
                1
              </div>
              <span className="text-xs font-bold text-gray-900">Describe Issue</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold text-sm text-gray-400 ring-4 ring-white">
                2
              </div>
              <span className="text-xs text-gray-400">Review AI Plan</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold text-sm text-gray-400 ring-4 ring-white">
                3
              </div>
              <span className="text-xs text-gray-400">Confirm</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-[28px] font-bold" style={{ color: "#185FA5" }}>
            Report Infrastructure Need
          </h1>
          <p className="max-w-2xl text-gray-500">
            Please provide details about the issue. The more accurate your report, the faster the barangay can allocate resources and address the problem.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Column (Form) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8 rounded-xl border border-gray-200/50 bg-white p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] sm:p-8">
            {/* Photo Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-900">Evidence (Required)</label>
              <div className="flex h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110" style={{ background: "rgba(24,95,165,0.1)", color: "#185FA5" }}>
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold" style={{ color: "#185FA5" }}>Upload a photo of the issue</p>
                  <p className="mt-1 text-xs text-gray-400">Drag and drop, or click to browse (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-gray-900">Category</label>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition-colors ${
                      category === cat
                        ? "border-transparent text-white"
                        : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                    }`}
                    style={category === cat ? { background: "#185FA5", borderColor: "#185FA5" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <label htmlFor="description" className="text-xs font-bold text-gray-900">
                  Detailed Description
                </label>
                <span className="text-[11px] text-gray-400">{description.length}/500</span>
              </div>
              <textarea
                id="description"
                rows={4}
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the severity, exact location details, and how long the issue has been present..."
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400/50 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-xs font-bold text-gray-900">
                Specific Location
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" style={{ color: "#185FA5" }}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="E.g., Corner of Rizal St. and Mabini Ave."
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400/50 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Action */}
            <div className="mt-2 border-t border-gray-100/30 pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
                style={{ background: "#E24B4A" }}
                onClick={handleSubmit}
                disabled={isAnalyzing}
              >
                Continue to AI Plan
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>
              <p className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-gray-400">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                Your report will be processed securely.
              </p>
            </div>
          </form>

          {/* Right Column (Tips & Map) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Map Section */}
            <div className="relative flex h-[300px] flex-col overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
              <div className="absolute inset-0 bg-gray-100">
                <div
                  className="h-full w-full bg-cover bg-center opacity-60 mix-blend-multiply"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')`,
                  }}
                />
              </div>
              <div className="relative z-10 bg-gradient-to-b from-white/80 to-transparent p-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold" style={{ color: "#185FA5" }}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3l-6.5 6.5-2.5-2.5-7 7 2.5 2.5 4.5-4.5 2.5 2.5 9-9z" />
                  </svg>
                  Verify Location
                </h3>
              </div>
              <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="absolute -z-10 h-12 w-12 animate-pulse rounded-full" style={{ background: "rgba(226,75,74,0.2)" }} />
                <svg className="h-8 w-8 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#185FA5" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition-colors hover:opacity-90" style={{ background: "#185FA5" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                  Use Current Location
                </button>
              </div>
            </div>

            {/* Tips Heading */}
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Submission Guidelines</h3>

            {/* Tip Cards */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-4 rounded-lg border border-gray-200/50 bg-white p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-red-300/30">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(226,75,74,0.1)", color: "#E24B4A" }}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.93-2.05-2.55-3.68-4.59-4.61l-3.88 6.72 3.88 6.72c2.05-.93 3.66-2.56 4.59-4.61.33-.71.54-1.5.54-2.31 0-.82-.21-1.6-.54-2.31zM12 22c2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.06.1-4.77 8.26C10.53 21.91 11.25 22 12 22zM3.46 9c.93 2.05 2.55 3.68 4.59 4.61l3.88-6.72-3.88-6.72C5.99 2.15 4.38 3.78 3.46 5.83c-.33.71-.54 1.5-.54 2.31 0 .82.21 1.6.54 2.31z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Clear Evidence</h4>
                  <p className="text-sm text-gray-500">Ensure your photo is well-lit and clearly shows the extent of the infrastructure issue.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-gray-200/50 bg-white p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-blue-300/30">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(24,95,165,0.1)", color: "#185FA5" }}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 9V4l2.29 2.29 4.71-4.7v4.71l-4.7 4.7zM14.5 14.5L12 17l-2.5-2.5L7 17l5 5 5-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Precise Location</h4>
                  <p className="text-sm text-gray-500">Use landmarks or specific street intersections if the exact address is unknown.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-gray-200/50 bg-white p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-colors hover:border-green-300/30">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(24,95,165,0.1)", color: "#185FA5" }}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Context Matters</h4>
                  <p className="text-sm text-gray-500">Mention how the issue affects the community daily to help prioritize the response.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
