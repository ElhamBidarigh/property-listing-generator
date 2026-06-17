// src/hooks/useGenerateListing.js
// ─────────────────────────────────────────────────────
// React Query useMutation برای generate listing
//
// چرا useMutation به جای useQuery؟
//  • useQuery   → برای GET / خواندن داده (اجرا میشه موقع mount)
//  • useMutation → برای POST / ایجاد / action (اجرا میشه وقتی ما بخوایم)
//
// مفاهیم:
//  • mutate(data)  → trigger کردن mutation
//  • isPending     → در حال پردازش
//  • isSuccess     → موفق
//  • isError       → خطا
//  • data          → نتیجه موفق
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
