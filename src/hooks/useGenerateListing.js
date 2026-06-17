// src/hooks/useGenerateListing.js
// ─────────────────────────────────────────────────────
// React Query useMutation to generate listing
//
// Why useMutation instead of useQuery?
//  • useQuery   → for GET/reading data (can be executed during mount)
//  • useMutation → For POST / create / action (it can be executed when we want)
//
// Concepts:
//  • mutate(data)  → trigger mutation
//  • isPending     → Processing
//  • isSuccess     → successful
//  • isError       → error
//  • data          → Successful outcome
// ─────────────────────────────────────────────────────

import { useMutation } from "@tanstack/react-query";
import { generateListing } from "../api/generateListing";

export function useGenerateListing() {
  return useMutation({
    mutationFn: generateListing,
    onError: (error) => {
      console.error("Generation failed:", error);
    },
  });
}
