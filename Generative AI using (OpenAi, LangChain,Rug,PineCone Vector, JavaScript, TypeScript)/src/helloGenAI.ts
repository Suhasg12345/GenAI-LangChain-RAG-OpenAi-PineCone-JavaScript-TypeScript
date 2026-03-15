import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

const llm = new ChatOpenAI({
  modelName: "gpt-5.1",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const response = await llm.invoke("Tell Me about Youself and model details");

console.log(response);
