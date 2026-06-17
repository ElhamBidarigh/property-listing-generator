// src/components/ListingResult.jsx
// نمایش نتیجه generated listing

import { useState } from "react";

export default function ListingResult({ data }) {
  const [copied, setCopied] = useState(false);

  function copyAll() {
    const text = `${data.title}\n\n${data.description}\n\nHighlights:\n${data.highlights.map(h => `• ${h}`).join("\n")}\n\nTags: ${data.seo_tags.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>✨ Generated Listing</h2>
        <button onClick={copyAll} style={styles.copyBtn}>
          {copied ? "✓ Copied!" : "Copy All"}
        </button>
      </div>

      {/* Title */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>LISTING TITLE</p>
        <h3 style={styles.title}>{data.title}</h3>
      </div>

      {/* Description */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>DESCRIPTION</p>
        {data.description.split("\n\n").map((para, i) => (
          <p key={i} style={styles.paragraph}>{para}</p>
        ))}
      </div>

      {/* Highlights */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>KEY HIGHLIGHTS</p>
        <ul style={styles.highlights}>
          {data.highlights.map((h, i) => (
            <li key={i} style={styles.highlight}>
              <span style={styles.bullet}>✓</span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* SEO Tags */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>SEO TAGS</p>
        <div style={styles.tags}>
          {data.seo_tags.map((tag, i) => (
            <span key={i} style={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* Platform preview hint */}
      <div style={styles.hint}>
        💡 Ready to paste into Airbnb, Booking.com, or your CMS
      </div>
    </div>
  );
}

const styles = {
  container:    { background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" },
  header:       { background: "linear-gradient(135deg, #1E88E5, #0F3A6E)", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerTitle:  { color: "#fff", fontSize: 16, fontWeight: 700, margin: 0 },
  copyBtn:      { padding: "6px 16px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", fontSize: 13 },
  section:      { padding: "18px 24px", borderBottom: "1px solid #f0f0f0" },
  sectionLabel: { fontSize: 10, fontWeight: 700, color: "#1E88E5", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 8px" },
  title:        { fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: 0 },
  paragraph:    { fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 10px" },
  highlights:   { listStyle: "none", padding: 0, margin: 0 },
  highlight:    { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, fontSize: 14, color: "#444" },
  bullet:       { color: "#52c41a", fontWeight: 700, flexShrink: 0 },
  tags:         { display: "flex", flexWrap: "wrap", gap: 8 },
  tag:          { padding: "4px 12px", borderRadius: 20, background: "#e6f4ff", color: "#1E88E5", fontSize: 12, fontWeight: 500 },
  hint:         { padding: "12px 24px", background: "#f9f9f9", fontSize: 13, color: "#888" },
};
