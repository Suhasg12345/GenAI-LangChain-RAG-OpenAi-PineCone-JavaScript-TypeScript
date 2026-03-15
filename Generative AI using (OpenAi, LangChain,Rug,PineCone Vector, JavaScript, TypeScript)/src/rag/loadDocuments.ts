import { Document } from "@langchain/core/documents";
import { crawlLangchainDocsUrls } from "./crawlDocuments";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import cliProgress from "cli-progress";

const progressBar = new cliProgress.SingleBar({});
export async function loadDocument(): Promise<Document[]> {
  const langchainDocsUrls = await crawlLangchainDocsUrls();
  console.log(
    `Staring document download, ${langchainDocsUrls.length} total Document.`,
  );

  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
  );
  const rawDocuments: Document[] = [];
  for (const url of langchainDocsUrls) {
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();
    rawDocuments.push(...docs);
    progressBar.increment();
  }
  progressBar.stop();
  console.log(`${rawDocuments.length} Document loaded`);

  return rawDocuments;
}
// const rawDocuments = await loadDocument();
// console.log(rawDocuments.slice(0, 4));
