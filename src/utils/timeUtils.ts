import { DateTime } from "luxon";

export function formatRelativeTime(dateString: string): string {
  const date = DateTime.fromISO(dateString);
  const now = DateTime.now();

  return date.toRelative({ base: now }) ?? "just now";
}
