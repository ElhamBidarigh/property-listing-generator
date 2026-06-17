// src/App.jsx — Property Listing Generator
// ─────────────────────────────────────────────────────
// Stack: React + React Query (useMutation) + OpenAI API (mocked)
// In the production project, this connects to the FastAPI backend
// ─────────────────────────────────────────────────────

import PropertyForm   from "./components/PropertyForm";
import ListingResult  from "./components/ListingResult";
import { useGenerateListing } from "./hooks/useGenerateListing";

export default function App() {
  // useMutation — to trigger an API call on demand
  const { mutate, isPending, isSuccess, isError, data, error } = useGenerateListing();

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.title}>🏠 Property Listing Generator</h1>
            <p style={styles.subtitle}>
              Powered by AI — Generate professional rental listings in seconds
            </p>
          </div>
          <div style={styles.badge}>Base360.ai Style</div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.grid}>
          {/* LEFT — Form */}
          <div>
            <PropertyForm onSubmit={mutate} isLoading={isPending} />
          </div>

          {/* RIGHT — Result */}
          <div>
            {/* Initial state */}
            {!isPending && !isSuccess && !isError && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>✨</div>
                <p style={styles.emptyTitle}>Ready to generate</p>
                <p style={styles.emptyText}>
                  Fill in the property details and click Generate.<br />
                  AI will write a professional listing optimized for<br />
                  Airbnb, Booking.com, and direct channels.
                </p>
              </div>
            )}

            {/* Loading */}
            {isPending && (
              <div style={styles.loadingState}>
                <div style={styles.spinner}>⟳</div>
                <p style={styles.loadingTitle}>Generating your listing…</p>
                <p style={styles.loadingText}>AI is crafting the perfect description</p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div style={styles.errorState}>
                <p style={{ color: "#ff4d4f", fontWeight: 600 }}>❌ Generation failed</p>
                <p style={{ color: "#888", fontSize: 13 }}>{error?.message}</p>
              </div>
            )}

            {/* Result */}
            {isSuccess && data && <ListingResult data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:          { minHeight: "100vh", background: "#f0f4f8", fontFamily: "system-ui, sans-serif" },
  header:        { background: "linear-gradient(135deg, #0F2D52, #1E88E5)", padding: "24px 0" },
  headerInner:   { maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  title:         { color: "#fff", fontSize: 24, margin: 0, fontWeight: 700 },
  subtitle:      { color: "rgba(255,255,255,0.7)", fontSize: 14, margin: "4px 0 0" },
  badge:         { background: "rgba(255,255,255,0.15)", color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 12, border: "1px solid rgba(255,255,255,0.3)" },
  body:          { maxWidth: 1100, margin: "0 auto", padding: "32px 24px" },
  grid:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  emptyState:    { background: "#fff", borderRadius: 16, padding: "60px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" },
  emptyIcon:     { fontSize: 48, marginBottom: 16 },
  emptyTitle:    { fontSize: 18, fontWeight: 600, color: "#1a1a2e", margin: "0 0 8px" },
  emptyText:     { fontSize: 14, color: "#888", lineHeight: 1.7, margin: 0 },
  loadingState:  { background: "#fff", borderRadius: 16, padding: "80px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" },
  spinner:       { fontSize: 40, animation: "spin 1s linear infinite", display: "inline-block" },
  loadingTitle:  { fontSize: 18, fontWeight: 600, color: "#1a1a2e", margin: "16px 0 8px" },
  loadingText:   { fontSize: 14, color: "#888" },
  errorState:    { background: "#fff", borderRadius: 16, padding: "40px 24px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" },
};
