import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { APPLICATION_LAYOUT } from "./applicationFields";

// Brand colours (matching the site / email).
const BRAND = rgb(0, 96 / 255, 108 / 255); // #00606c
const INK = rgb(12 / 255, 51 / 255, 56 / 255); // #0c3338
const MUTED = rgb(0.42, 0.45, 0.45);

const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 48;
const LABEL_X = MARGIN;
const LABEL_W = 150;
const VALUE_X = MARGIN + LABEL_W + 10;
const VALUE_W = A4.w - VALUE_X - MARGIN;
const SIZE = 9.5;
const LINE = 13;

// The standard PDF fonts use WinAnsi (CP1252) encoding and THROW on any
// character they can't represent (arrows, emoji, Arabic/CJK, etc.). Convert
// common symbols to ASCII, keep everything WinAnsi can render, and replace the
// rest with "?" so building a PDF never fails on real-world applicant data.
const CP1252_EXTRA =
  "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
const UNSAFE = new RegExp(
  `[^\\x09\\x0A\\x0D\\x20-\\x7E\\u00A0-\\u00FF${CP1252_EXTRA}]`,
  "g"
);
function pdfSafe(s: string): string {
  return s
    .replace(/[→➔➜➡⇒]/g, "->")
    .replace(/[←⬅⇐]/g, "<-")
    .replace(UNSAFE, "?");
}

// Split a string (honouring embedded newlines) into lines that fit `maxWidth`.
function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const paragraph of pdfSafe(String(text)).split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      out.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const trial = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(trial, size) > maxWidth && line) {
        out.push(line);
        line = word;
      } else {
        line = trial;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

export async function buildApplicationPdf(
  data: Record<string, unknown>
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([A4.w, A4.h]);
  let y = A4.h - MARGIN;

  const get = (k: string) => {
    const v = data[k];
    return v == null || v === "" ? "—" : String(v);
  };

  const newPage = () => {
    page = doc.addPage([A4.w, A4.h]);
    y = A4.h - MARGIN;
  };
  const ensure = (needed: number) => {
    if (y - needed < MARGIN) newPage();
  };

  // ── Title block ──
  const name =
    pdfSafe([get("firstName"), get("surname")].filter((s) => s !== "—").join(" ")) ||
    "Applicant";
  page.drawText("HG Care — Job Application", { x: MARGIN, y: y - 4, size: 18, font: bold, color: BRAND });
  y -= 24;
  page.drawText(name, { x: MARGIN, y, size: 12, font: bold, color: INK });
  y -= 15;
  page.drawText("Submitted via hgcare.co.uk", { x: MARGIN, y, size: 9, font, color: MUTED });
  y -= 20;

  for (const block of APPLICATION_LAYOUT) {
    // Section header bar.
    ensure(28 + LINE);
    page.drawRectangle({ x: MARGIN, y: y - 18, width: A4.w - MARGIN * 2, height: 20, color: BRAND });
    page.drawText(block.section, { x: MARGIN + 8, y: y - 13, size: 10, font: bold, color: rgb(1, 1, 1) });
    y -= 30;

    for (const [key, label] of block.fields) {
      const value = get(key);
      const labelLines = wrap(label, bold, SIZE, LABEL_W);
      const valueLines = wrap(value, font, SIZE, VALUE_W);
      const rows = Math.max(labelLines.length, valueLines.length);
      const rowHeight = rows * LINE + 6;

      ensure(rowHeight);

      let ly = y;
      for (const l of labelLines) {
        page.drawText(l, { x: LABEL_X, y: ly, size: SIZE, font: bold, color: BRAND });
        ly -= LINE;
      }
      let vy = y;
      for (const l of valueLines) {
        page.drawText(l, { x: VALUE_X, y: vy, size: SIZE, font, color: INK });
        vy -= LINE;
      }
      y -= rowHeight;
    }
    y -= 6;
  }

  return doc.save();
}
