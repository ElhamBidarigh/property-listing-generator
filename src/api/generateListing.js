// src/api/generateListing.js
// ─────────────────────────────────────────────────────
// در پروژه واقعی این تابع به FastAPI backend وصل میشه:
//   const res = await fetch("http://localhost:8000/generate-listing", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(propertyData)
//   });
//
// اینجا یه mock شبیه‌سازی می‌کنیم که بدون backend کار کنه
// ─────────────────────────────────────────────────────

const MOCK_RESPONSES = {
  luxury: {
    title: "Exquisite Waterfront Retreat in The Pearl",
    description:
      "Discover an unparalleled living experience in the heart of Qatar's most prestigious address. This stunning residence combines architectural brilliance with world-class amenities, offering a lifestyle that transcends ordinary living.\n\nEvery detail has been meticulously crafted to deliver the ultimate in comfort and sophistication. Floor-to-ceiling windows frame breathtaking views while premium finishes adorn every corner of this exceptional home.\n\nStep into a world where luxury meets functionality — where your daily routine is elevated to an art form, surrounded by the finest amenities Qatar has to offer.",
    highlights: [
      "Panoramic waterfront views from every room",
      "Premium smart home automation system",
      "Private parking with 24/7 concierge service",
      "Direct access to world-class dining and retail",
    ],
    seo_tags: ["luxury apartment Qatar", "The Pearl rental", "waterfront property Doha", "premium furnished apartment", "Qatar expat housing"],
  },
  professional: {
    title: "Modern 2BR Apartment — Prime Lusail Location",
    description:
      "A well-appointed apartment ideally located in Lusail City, offering everything you need for comfortable modern living. This property provides excellent value with practical amenities and convenient access to business districts.\n\nThe open-plan layout maximizes space efficiency while maintaining a welcoming atmosphere suitable for professionals and families alike. Quality fixtures and contemporary design create a pleasant living environment.\n\nWith easy access to major transport links, shopping centers, and corporate offices, this property offers an ideal base for professionals relocating to Qatar.",
    highlights: [
      "Walking distance to Lusail Metro Station",
      "High-speed fiber internet included",
      "Fully equipped modern kitchen",
      "Shared gym and swimming pool access",
    ],
    seo_tags: ["apartment Lusail City", "professional housing Qatar", "furnished rental Doha", "expat accommodation", "monthly rental Qatar"],
  },
  casual: {
    title: "Chill 2BR Flat — Great Vibes in Al Sadd",
    description:
      "Looking for a place that just feels like home? This bright and spacious apartment in Al Sadd has everything you need to settle in and get comfortable, fast.\n\nThe layout works great for roommates or a small family. Lots of natural light, a decent-sized kitchen, and bedrooms that actually give you space to breathe. Plus the neighborhood has everything within walking distance.\n\nHonestly, once you move in you won't want to leave. Great spot, great price, great vibes.",
    highlights: [
      "All utilities included — no surprise bills",
      "Pet-friendly building",
      "Chill rooftop terrace with city views",
      "5-min walk to supermarkets and cafes",
    ],
    seo_tags: ["apartment Al Sadd", "affordable rental Doha", "all inclusive flat Qatar", "pet friendly apartment", "short term rental Doha"],
  },
};

// شبیه‌سازی API call با delay واقع‌بینانه
export async function generateListing(propertyData) {
  await new Promise((r) => setTimeout(r, 1800)); // 1.8s مثل یه API call واقعی

  const tone = propertyData.tone || "professional";
  const base = MOCK_RESPONSES[tone] || MOCK_RESPONSES.professional;

  // کمی personalize بر اساس input
  return {
    ...base,
    title: base.title
      .replace("2BR", `${propertyData.bedrooms}BR`)
      .replace("Lusail", propertyData.location || "Lusail"),
    highlights: [
      ...base.highlights.slice(0, 3),
      `${propertyData.area_sqft} sqft of well-designed living space`,
    ],
  };
}
