# Property Listing Generator

AI-powered property listing generator built for short-term rental platforms - inspired by Base360.ai's approach to automating property operations.

## What It Does

Input property details (type, bedrooms, location, amenities, tone) → AI generates a professional listing with title, description, highlights, and SEO tags — ready to publish on Airbnb, Booking.com, or any CMS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + React Query (useMutation) |
| Backend | FastAPI (Python) - see `/backend` |
| AI | OpenAI GPT-4o-mini via API |
| Styling | Vanilla CSS-in-JS |

## Architecture

```
Frontend (React)          Backend (FastAPI)         AI
     │                         │                     │
PropertyForm ──POST──▶  /generate-listing  ──▶  OpenAI API
     │                         │                     │
ListingResult ◀──JSON──  Structured response  ◀──  GPT-4o-mini
```

## Key React Query Concepts

**useMutation** (not useQuery) - because generating a listing is an action triggered by the user, not automatic data fetching:

```js
const { mutate, isPending, isSuccess, data } = useMutation({
  mutationFn: generateListing,
});

// Triggered on form submit:
mutate(propertyData);
```

## Running the Project

### Frontend (demo mode - no API key needed)
```bash
npm install
npm start
```

The frontend runs with a mock API that simulates OpenAI responses.

### Full Stack (with real AI)
```bash
# Backend
cd backend
pip install fastapi uvicorn openai python-dotenv
cp .env.example .env   # add your OPENAI_API_KEY
uvicorn main:app --reload

# Frontend
npm install
REACT_APP_USE_REAL_API=true npm start
```

## Project Structure

```
src/
├── components/
│   ├── PropertyForm.jsx      # Input form with amenity checkboxes and tone selector
│   └── ListingResult.jsx     # Output display with copy-to-clipboard
├── hooks/
│   └── useGenerateListing.js # React Query useMutation hook
├── api/
│   └── generateListing.js    # API call (mock + real backend)
└── App.jsx                   # Layout + state orchestration

backend/
└── main.py                   # FastAPI endpoint with OpenAI integration
```

## Why This Project

Built to demonstrate full-stack product thinking, the same approach used in PropTech platforms like The Flex's Base360.ai, where AI automates operational workflows to help property managers scale without increasing headcount.
