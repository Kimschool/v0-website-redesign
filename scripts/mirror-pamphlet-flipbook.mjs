import fs from "node:fs";
import path from "node:path";
import http from "node:http";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        res.setEncoding("utf8");
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function downloadFile(url, outPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const file = fs.createWriteStream(outPath);
    http
      .get(url, (res) => {
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

const base = "http://weavus.main.jp/doc/flipbooks/pamphlet";
const langs = ["ja", "zh", "ko"];
const outRoot = path.join(process.cwd(), "public", "flipbooks", "pamphlet");

for (const lang of langs) {
  const manifestUrl = `${base}/${lang}/manifest.json`;
  console.log(`Fetching manifest: ${manifestUrl}`);
  const raw = await fetchText(manifestUrl);
  const manifest = JSON.parse(raw);
  if (!manifest?.pages || !Array.isArray(manifest.pages)) {
    throw new Error(`Unexpected manifest format for ${lang}`);
  }

  const outDir = path.join(outRoot, lang);
  fs.mkdirSync(outDir, { recursive: true });
  const manifestOutPath = path.join(outDir, "manifest.json");
  fs.writeFileSync(manifestOutPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Saved: ${manifestOutPath}`);

  for (const filename of manifest.pages) {
    const fileUrl = `${base}/${lang}/${filename}`;
    const outPath = path.join(outDir, filename);
    if (fs.existsSync(outPath)) continue;
    console.log(`Downloading: ${fileUrl}`);
    await downloadFile(fileUrl, outPath);
  }
}

console.log("Done.");

