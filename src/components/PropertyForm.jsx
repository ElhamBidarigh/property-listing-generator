// src/components/PropertyForm.jsx
// Property information input form

const AMENITIES = [
  "Swimming Pool", "Gym", "Parking", "Balcony", "Sea View",
  "City View", "Smart Home", "Concierge", "Kids Play Area",
  "BBQ Area", "Pet Friendly", "Fiber Internet",
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Studio", "Penthouse", "Townhouse"];
const TONES = [
  { value: "luxury",       label: "✨ Luxury & Premium" },
  { value: "professional", label: "💼 Professional & Clear" },
  { value: "casual",       label: "😊 Friendly & Casual" },
];

export default function PropertyForm({ onSubmit, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const amenities = AMENITIES.filter((a) =>
      fd.get(`amenity_${a.replace(/\s/g, "_")}`) === "on"
    );

    onSubmit({
      property_type:    fd.get("property_type"),
      bedrooms:         parseInt(fd.get("bedrooms")),
      bathrooms:        parseInt(fd.get("bathrooms")),
      area_sqft:        parseInt(fd.get("area_sqft")),
      location:         fd.get("location"),
      amenities,
      price_per_month:  parseInt(fd.get("price_per_month")),
      tone:             fd.get("tone"),
    });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>Property Details</h2>

      {/* Property Type */}
      <div style={styles.field}>
        <label style={styles.label}>Property Type</label>
        <select name="property_type" style={styles.select} defaultValue="Apartment">
          {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Bedrooms + Bathrooms */}
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Bedrooms</label>
          <input name="bedrooms" type="number" defaultValue={2} min={0} max={10} style={styles.input} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Bathrooms</label>
          <input name="bathrooms" type="number" defaultValue={2} min={1} max={10} style={styles.input} />
        </div>
      </div>

      {/* Area + Price */}
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Area (sqft)</label>
          <input name="area_sqft" type="number" defaultValue={1200} min={200} style={styles.input} />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Price/Month (QAR)</label>
          <input name="price_per_month" type="number" defaultValue={8000} min={1000} style={styles.input} />
        </div>
      </div>

      {/* Location */}
      <div style={styles.field}>
        <label style={styles.label}>Location / Area</label>
        <input name="location" type="text" defaultValue="The Pearl, Doha" placeholder="e.g. Lusail City" style={styles.input} />
      </div>

      {/* Tone */}
      <div style={styles.field}>
        <label style={styles.label}>Writing Tone</label>
        <div style={styles.toneGroup}>
          {TONES.map((t) => (
            <label key={t.value} style={styles.toneOption}>
              <input type="radio" name="tone" value={t.value} defaultChecked={t.value === "professional"} />
              <span style={styles.toneLabel}>{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div style={styles.field}>
        <label style={styles.label}>Amenities</label>
        <div style={styles.amenitiesGrid}>
          {AMENITIES.map((a) => (
            <label key={a} style={styles.checkboxLabel}>
              <input type="checkbox" name={`amenity_${a.replace(/\s/g, "_")}`} defaultChecked={["Parking","Gym","Fiber Internet"].includes(a)} />
              <span style={{ marginLeft: 6, fontSize: 13 }}>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isLoading} style={{
        ...styles.button,
        opacity: isLoading ? 0.7 : 1,
        cursor: isLoading ? "not-allowed" : "pointer",
      }}>
        {isLoading ? (
          <span>⟳ Generating with AI…</span>
        ) : (
          <span>✨ Generate Listing</span>
        )}
      </button>
    </form>
  );
}

const styles = {
  form:         { background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.07)" },
  formTitle:    { fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" },
  field:        { marginBottom: 16, flex: 1 },
  row:          { display: "flex", gap: 16, marginBottom: 0 },
  label:        { display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" },
  input:        { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, boxSizing: "border-box", outline: "none" },
  select:       { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, background: "#fff" },
  toneGroup:    { display: "flex", flexDirection: "column", gap: 8 },
  toneOption:   { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  toneLabel:    { fontSize: 14, color: "#444" },
  amenitiesGrid:{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  checkboxLabel:{ display: "flex", alignItems: "center", fontSize: 13, color: "#444", cursor: "pointer" },
  button:       { width: "100%", padding: "13px", borderRadius: 10, background: "linear-gradient(135deg, #1E88E5, #0F3A6E)", color: "#fff", border: "none", fontSize: 15, fontWeight: 600, marginTop: 8 },
};
