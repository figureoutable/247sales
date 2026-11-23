const BRAND_SUFFIX = " | Figures";
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;
/** Words a shortened title or description should not end on. */
const TRAILING = /(\s+(for|in|of|the|a|an|to|and|or|with|on|your|how|what|why)(\s+UK)?|[\s,;:–—-]+)$/i;

function tidyEnd(text: string): string {
  let out = text;
  while (TRAILING.test(out)) out = out.replace(TRAILING, "");
  return out;
}

/**
 * Title for Google (the on-page headline is untouched).
 * Google cuts titles at about 60 characters, so we drop the brand or the
 * part after a colon when a title would be cut off mid-word.
 */
export function seoTitle(title: string): string | { absolute: string } {
  const t = title.trim();
  if ((t + BRAND_SUFFIX).length <= MAX_TITLE) return t; // layout adds " | Figures"
  if (t.length <= MAX_TITLE) return { absolute: t };
  const head = t.split(/:\s| [–—-] /)[0].trim();
  if (head.length >= 20 && head.length <= MAX_TITLE) {
    return (head + BRAND_SUFFIX).length <= MAX_TITLE ? head : { absolute: head };
  }
  const cut = t.slice(0, MAX_TITLE + 1);
  return { absolute: tidyEnd(cut.slice(0, cut.lastIndexOf(" "))) };
}

/** Description for Google, kept under about 160 characters and ended on a clean break. */
export function seoDescription(text?: string | null): string | undefined {
  if (!text) return undefined;
  const t = text.trim();
  if (t.length <= MAX_DESCRIPTION) return t;
  const cut = t.slice(0, MAX_DESCRIPTION + 1);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd >= 90) return cut.slice(0, sentenceEnd + 1);
  return tidyEnd(cut.slice(0, cut.lastIndexOf(" "))) + "…";
}
