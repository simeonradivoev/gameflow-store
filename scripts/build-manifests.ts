import { glob, readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const files: string[] = [];
for await (const file of glob("./buckets/games/*.json")) {
  files.push(file);
}
const genresSet = new Set<string>();
const keywordsSet = new Set<string>();
const playerCountSet = new Set<string>();
const companiesSet = new Set<string>();
let gameCount = 0;

for await (const file of files) {
  const json = JSON.parse(await readFile(file, "utf8"));
  gameCount++;
  if (json.genres) {
    json.genres.forEach((g: string) => genresSet.add(g));
  }
  if (json.keywords) {
    json.keywords.forEach((k: string) => keywordsSet.add(k));
  }
  if (json.player_count) {
    playerCountSet.add(json.player_count);
  }
  if (json.companies) {
    json.companies.forEach((c: string) => companiesSet.add(c));
  }
}

if (!existsSync("./manifests")) await mkdir("./manifests");
await writeFile(
  "./manifests/filters.json",
  JSON.stringify(
    {
      genres: Array.from(genresSet),
      keywords: Array.from(keywordsSet),
      player_counts: Array.from(playerCountSet),
      companies: Array.from(companiesSet),
      game_count: gameCount,
    },
    null,
    3,
  ),
);
