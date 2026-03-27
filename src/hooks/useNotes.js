// ─────────────────────────────────────────────────────────────
//  src/hooks/useNotes.js        — notes + topics queries
//  src/hooks/useQuiz.js         — quiz queries
//  src/hooks/usePYQs.js         — PYQ queries
//  src/hooks/useProgress.js     — progress mutations
//  src/hooks/useReviews.js      — reviews CRUD
//
//  All combined in one file — split into individual
//  files by copying each section if preferred.
// ─────────────────────────────────────────────────────────────

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

// ── Query key factory — centralised ──────────────────────────
export const keys = {
  topics:       ()             => ["topics"],
  topic:        (slug)         => ["topics", slug],
  notes:        (filters)      => ["notes", filters],
  note:         (slug)         => ["notes", "detail", slug],
  quiz:         (noteId)       => ["quiz", noteId],
  pyqs:         (filters)      => ["pyqs", filters],
  pyq:          (slug)         => ["pyqs", "detail", slug],
  reviews:      (noteId)       => ["reviews", noteId],
  progress:     ()             => ["progress"],
  noteProgress: (noteId)       => ["progress", noteId],
};

// ── Shared fetch helper with error handling ───────────────────
async function apiFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────
//  TOPICS
// ─────────────────────────────────────────────────────────────

// Fetch all topics (for home page grid)
export function useTopics() {
  return useQuery({
    queryKey: keys.topics(),
    queryFn:  () => apiFetch("/api/topics"),
    staleTime: 1000 * 60 * 10, // 10 min — topics rarely change
  });
}

// Fetch single topic with its notes
export function useTopic(slug) {
  return useQuery({
    queryKey: keys.topic(slug),
    queryFn:  () => apiFetch(`/api/topics/${slug}`),
    enabled:  !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

// ─────────────────────────────────────────────────────────────
//  NOTES
// ─────────────────────────────────────────────────────────────

// Fetch notes list with optional filters
export function useNotes(filters = {}) {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v && v !== "all")
    )
  ).toString();

  return useQuery({
    queryKey: keys.notes(filters),
    queryFn:  () => apiFetch(`/api/notes${params ? `?${params}` : ""}`),
    staleTime: 1000 * 60 * 5,
  });
}

// Fetch single note detail by slug
export function useNote(slug) {
  return useQuery({
    queryKey: keys.note(slug),
    queryFn:  () => apiFetch(`/api/notes/${slug}`),
    enabled:  !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

// ─────────────────────────────────────────────────────────────
//  QUIZ
// ─────────────────────────────────────────────────────────────

// Fetch quiz questions for a note
export function useQuiz(noteId) {
  return useQuery({
    queryKey: keys.quiz(noteId),
    queryFn:  () => apiFetch(`/api/quiz?noteId=${noteId}`),
    enabled:  !!noteId,
    staleTime: 1000 * 60 * 10,
  });
}

// Submit quiz answers
export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ noteId, answers, score }) => {
      const res = await fetch("/api/quiz/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ noteId, answers, score }),
      });
      if (!res.ok) throw new Error("Failed to submit quiz");
      return res.json();
    },
    onSuccess: (_, { noteId }) => {
      queryClient.invalidateQueries({ queryKey: keys.noteProgress(noteId) });
      queryClient.invalidateQueries({ queryKey: keys.progress() });
    },
  });
}

// ─────────────────────────────────────────────────────────────
//  PYQs
// ─────────────────────────────────────────────────────────────

// Fetch PYQ list with optional filters (university, subject, year)
export function usePYQs(filters = {}) {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v && v !== "all")
    )
  ).toString();

  return useQuery({
    queryKey: keys.pyqs(filters),
    queryFn:  () => apiFetch(`/api/pyqs${params ? `?${params}` : ""}`),
    staleTime: 1000 * 60 * 5,
  });
}

// Fetch single PYQ by slug
export function usePYQ(slug) {
  return useQuery({
    queryKey: keys.pyq(slug),
    queryFn:  () => apiFetch(`/api/pyqs/${slug}`),
    enabled:  !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

// ─────────────────────────────────────────────────────────────
//  REVIEWS
// ─────────────────────────────────────────────────────────────

// Fetch reviews for a note
export function useReviews(noteId) {
  return useQuery({
    queryKey: keys.reviews(noteId),
    queryFn:  () => apiFetch(`/api/reviews?noteId=${noteId}`),
    enabled:  !!noteId,
    staleTime: 1000 * 60 * 2,
  });
}

// Create or update a review
export function useUpsertReview(noteId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/reviews", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to submit review");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.reviews(noteId));
    },
  });
}

// Delete a review
export function useDeleteReview(noteId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId) => {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete review");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.reviews(noteId));
    },
  });
}

// ─────────────────────────────────────────────────────────────
//  PROGRESS
// ─────────────────────────────────────────────────────────────

// Fetch all progress for current user — staleTime 0 so it's always fresh
export function useProgress() {
  return useQuery({
    queryKey: keys.progress(),
    queryFn:  () => apiFetch("/api/progress"),
    staleTime: 0,
  });
}

// Mark a note as read / complete
export function useMarkComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ noteId }) => {
      const res = await fetch("/api/progress", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ noteId }),
      });
      if (!res.ok) throw new Error("Failed to update progress");
      return res.json();
    },
    // Optimistic update — mark immediately in UI
    onMutate: async ({ noteId }) => {
      await queryClient.cancelQueries(keys.noteProgress(noteId));
      const prev = queryClient.getQueryData(keys.noteProgress(noteId));
      queryClient.setQueryData(keys.noteProgress(noteId), { completed: true });
      return { prev };
    },
    onError: (_, { noteId }, ctx) => {
      queryClient.setQueryData(keys.noteProgress(noteId), ctx?.prev);
    },
    onSettled: (_, __, { noteId }) => {
      // Invalidate all progress data so every page component refreshes instantly
      queryClient.invalidateQueries({ queryKey: keys.progress() });
      queryClient.invalidateQueries({ queryKey: keys.noteProgress(noteId) });
    },
  });
}