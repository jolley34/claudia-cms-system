import "dotenv/config";
import { MeiliSearch } from "meilisearch";

console.log("Host:", process.env.MEILISEARCH_HOST);
console.log("API Key:", process.env.MEILI_MASTER_KEY);

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST as string,
  apiKey: process.env.MEILI_MASTER_KEY as string,
});

export default client;
