export function getStoredValue<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed == null ? null : (parsed as T);
  } catch (_e) {
    return null;
  }
}
