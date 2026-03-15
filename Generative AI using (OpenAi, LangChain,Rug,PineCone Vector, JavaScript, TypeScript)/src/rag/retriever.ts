import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";
dotenv.config();

export async function createRetriever(): Promise<VectorStoreRetriever> {
  const embeddingLLM = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index("langchain-docs");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeIndex,
  });
  return vectorStore.asRetriever();
}
// //test code

// const retriever = await createRetriever();
// const results = await retriever.invoke("What is Langchain?");
// console.log(results);
