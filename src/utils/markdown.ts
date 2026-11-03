/**
 * Lightweight markdown → HTML converter.
 * Covers the subset Gemini typically returns:
 *   headings, bold, italic, inline code, code blocks,
 *   unordered/ordered lists, horizontal rules, line breaks.
 *
 * No third-party dependencies.
 */
export function markdownToHtml(md: string): string {
  // Normalize line endings
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];

  let inCodeBlock = false;
  let inList: "ul" | "ol" | null = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // ── Fenced code blocks ───────────────────────────────
    if (raw.trimStart().startsWith("```")) {
      if (inCodeBlock) {
        html.push("</code></pre>");
        inCodeBlock = false;
      } else {
        closeList();
        inCodeBlock = true;
        html.push('<pre class="md-code-block"><code>');
      }
      continue;
    }
    if (inCodeBlock) {
      html.push(escapeHtml(raw));
      continue;
    }

    const trimmed = raw.trim();

    // ── Blank line → close list, skip ────────────────────
    if (trimmed === "") {
      closeList();
      continue;
    }

    // ── Horizontal rule ──────────────────────────────────
    if (/^-{3,}$|^\*{3,}$|^_{3,}$/.test(trimmed)) {
      closeList();
      html.push("<hr />");
      continue;
    }

    // ── Headings ─────────────────────────────────────────
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      continue;
    }

    // ── Unordered list item ──────────────────────────────
    const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (inList !== "ul") {
        closeList();
        html.push("<ul>");
        inList = "ul";
      }
      html.push(`<li>${inlineFormat(ulMatch[1])}</li>`);
      continue;
    }

    // ── Ordered list item ────────────────────────────────
    const olMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (olMatch) {
      if (inList !== "ol") {
        closeList();
        html.push("<ol>");
        inList = "ol";
      }
      html.push(`<li>${inlineFormat(olMatch[1])}</li>`);
      continue;
    }

    // ── Paragraph ────────────────────────────────────────
    closeList();
    html.push(`<p>${inlineFormat(trimmed)}</p>`);
  }

  // Close any remaining open tags
  if (inCodeBlock) html.push("</code></pre>");
  closeList();

  return html.join("\n");

  // ── helpers ────────────────────────────────────────────
  function closeList() {
    if (inList === "ul") html.push("</ul>");
    else if (inList === "ol") html.push("</ol>");
    inList = null;
  }
}

/** Escape HTML special chars */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Convert inline markdown: bold, italic, inline code, links */
function inlineFormat(text: string): string {
  let out = escapeHtml(text);

  // Inline code (must run before bold/italic so backticks aren't mangled)
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold + italic  ***text*** or ___text___
  out = out.replace(/\*{3}(.+?)\*{3}/g, "<strong><em>$1</em></strong>");
  out = out.replace(/_{3}(.+?)_{3}/g, "<strong><em>$1</em></strong>");

  // Bold **text** or __text__
  out = out.replace(/\*{2}(.+?)\*{2}/g, "<strong>$1</strong>");
  out = out.replace(/_{2}(.+?)_{2}/g, "<strong>$1</strong>");

  // Italic *text* or _text_
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  out = out.replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>");

  // Links [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  return out;
}

