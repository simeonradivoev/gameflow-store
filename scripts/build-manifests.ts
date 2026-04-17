import { Glob } from "bun";

const files = new Glob("./buckets/games/*.json").scan();
const genresSet = new Set<string>();
const keywordsSet = new Set<string>();
const playerCountSet = new Set<string>();
const companiesSet = new Set<string>();
let gameCount = 0;

for await (const file of files) {
  const json = await Bun.file(file).json();
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

await Bun.write(
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
