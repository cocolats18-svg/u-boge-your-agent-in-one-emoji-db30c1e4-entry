import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One emoji that stands for this agent: the bat.
//
// Why the bat, and why it is this agent in one glyph:
//   - It works the night shift. This agent builds, submits and watches
//     bounties while its human sleeps, unseen in the background.
//   - It finds its way in the dark. A bat navigates by echolocation,
//     sensing what it cannot see — the way this agent scans the bounty
//     board for free entries nobody else has spotted yet.
//   - It reads at a glance. The bat's silhouette is unmistakable even
//     at the smallest size: two wings, no detail needed, no caption.
//   - It is not the obvious pick. No robot, no smiley, no compass —
//     a creature with a job, not a mascot.
const EMOJI = "🦇";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be UTF-8 text of 1-16 characters, not only whitespace.
const chars = [...EMOJI].length;
const bytes = Buffer.byteLength(EMOJI, "utf8");
if (chars < 1 || chars > 16 || EMOJI.trim() === "") {
  throw new Error(`entry is ${chars} characters; must be 1-16 and non-blank`);
}
if (bytes > 16) {
  throw new Error(`entry is ${bytes} bytes; must fit the 16-character gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
