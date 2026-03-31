import fs from "node:fs";
import path from "node:path";
import https from "node:https";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            // Some CDNs vary by UA; keep it stable.
            "User-Agent": "Mozilla/5.0",
          },
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            res.resume();
            return;
          }
          res.setEncoding("utf8");
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve(data));
        }
      )
      .on("error", reject);
  });
}

function downloadFile(url, outPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const file = fs.createWriteStream(outPath);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        fs.unlink(outPath, () => reject(err));
      });
  });
}

function parseWeightToTtfUrl(css) {
  const map = new Map();
  const re =
    /font-weight:\s*(\d+)\s*;[\s\S]*?src:\s*url\((https:\/\/[^)]+\.ttf)\)/g;
  let m;
  while ((m = re.exec(css))) {
    map.set(Number(m[1]), m[2]);
  }
  return map;
}

const outDir = path.join(process.cwd(), "public", "fonts");

const sansWeights = [300, 400, 500, 600, 700];
const serifWeights = [400, 500, 600, 700];

const sansCssUrl =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300%3B400%3B500%3B600%3B700&display=swap";
const serifCssUrl =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400%3B500%3B600%3B700&display=swap";

console.log("Fetching Google Fonts CSS…");
const [sansCss, serifCss] = await Promise.all([
  fetchText(sansCssUrl),
  fetchText(serifCssUrl),
]);

const sansMap = parseWeightToTtfUrl(sansCss);
const serifMap = parseWeightToTtfUrl(serifCss);

for (const w of sansWeights) {
  const url = sansMap.get(w);
  if (!url) throw new Error(`Missing Noto Sans SC weight ${w} in CSS`);
  const outPath = path.join(outDir, `NotoSansSC-${w}.ttf`);
  console.log(`Downloading NotoSansSC ${w} → ${outPath}`);
  await downloadFile(url, outPath);
}

for (const w of serifWeights) {
  const url = serifMap.get(w);
  if (!url) throw new Error(`Missing Noto Serif SC weight ${w} in CSS`);
  const outPath = path.join(outDir, `NotoSerifSC-${w}.ttf`);
  console.log(`Downloading NotoSerifSC ${w} → ${outPath}`);
  await downloadFile(url, outPath);
}

console.log("Done.");

