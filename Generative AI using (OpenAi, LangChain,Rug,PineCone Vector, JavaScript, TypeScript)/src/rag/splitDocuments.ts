import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { loadDocument } from "./loadDocuments";

export async function splitDocuments(
  rawDocuments: Document[],
): Promise<Document[]> {
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const documentChunks = await splitter.splitDocuments(rawDocuments);
  console.log(
    `${rawDocuments.length} documents split into ${documentChunks.length} chunks`,
  );

  return documentChunks;
}
// const rawDocuments = await loadDocument();
// await splitDocuments(rawDocuments);
