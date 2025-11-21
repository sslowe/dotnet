import { allPosts } from "content-collections";

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toISOString().split('T')[0];
}

// FIX: toSorted not working on cloudflare
export const sortedPosts = allPosts.sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export type Posts = typeof allPosts;