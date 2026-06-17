# backend/main.py
# ─────────────────────────────────────────────────────
# FastAPI backend برای Property Listing Generator
#
# In the real project, this file is executed on the server
# To run local:
#   pip install fastapi uvicorn openai python-dotenv
#   uvicorn main:app --reload
#
# Required ENV variables:
#   OPENAI_API_KEY=your_key
# ─────────────────────────────────────────────────────

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Property Listing Generator API")

# CORS — It allows the React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ── Models ────────────────────────────────────────────
class PropertyInput(BaseModel):
    property_type: str     # apartment, villa, studio
    bedrooms: int
    bathrooms: int
    area_sqft: int
    location: str
    amenities: list[str]
    price_per_month: int
    tone: str              # professional, luxury, casual

class ListingOutput(BaseModel):
    title: str
    description: str
    highlights: list[str]
    seo_tags: list[str]

# ── Endpoints ─────────────────────────────────────────
@app.post("/generate-listing", response_model=ListingOutput)
async def generate_listing(prop: PropertyInput):
    """
    دریافت اطلاعات property و تولید listing با OpenAI
    """
    amenities_str = ", ".join(prop.amenities)

    prompt = f"""
You are a professional real estate copywriter specializing in short-term rentals.

Generate a compelling property listing based on:
- Type: {prop.property_type}
- Bedrooms: {prop.bedrooms} | Bathrooms: {prop.bathrooms}
- Area: {prop.area_sqft} sqft
- Location: {prop.location}
- Amenities: {amenities_str}
- Price: {prop.price_per_month} QAR/month
- Tone: {prop.tone}

Return a JSON object with exactly these fields:
{{
  "title": "catchy title under 10 words",
  "description": "compelling 3-paragraph description",
  "highlights": ["highlight 1", "highlight 2", "highlight 3", "highlight 4"],
  "seo_tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}}

Return only valid JSON, no markdown.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            response_format={"type": "json_object"},
        )
        import json
        result = json.loads(response.choices[0].message.content)
        return ListingOutput(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}
