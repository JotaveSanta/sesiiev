/** Only real YouTube embed links can be shown as lessons; placeholders become a pending notice. */
export function isPlayableVideoUrl(url: string): boolean {
  return /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{6,}$/.test(url);
}