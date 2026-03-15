import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LLMChain } from "@langchain/classic/chains";
import { RunnableSequence } from "@langchain/core/runnables";
dotenv.config();
await personalisedPitch("Generative AI", "Javascript Developer", 100);
async function personalisedPitch(
  course: string,
  role: string,
  wordLimit: number,
) {
  const promptTemplate = new PromptTemplate({
    template:
      "Describe the importance of learning {course} for a {role}. Limit the output to {wordLimit} words.",
    inputVariables: ["course", "role", "wordLimit"],
  });

  const formattedPrompt = await promptTemplate.format({
    course,
    role,
    wordLimit,
  });
  console.log("Formatted Prompt: ", formattedPrompt);

  const llm = new ChatOpenAI({
    // model: "gpt-5.1",
    // openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });
  const outputParser = new StringOutputParser();
  //option 1- Langchain legacy chain

  //   const legacyLlmChain = new LLMChain({
  //     prompt: promptTemplate,
  //     llm,
  //     outputParser,
  //   });
  //   const answer = await legacyLlmChain.invoke({
  //     course,
  //     role,
  //     wordLimit,
  //   });
  //   console.log("Legacy LLM Chain Output: ", answer);

  //   const lcelChain = promptTemplate.pipe(llm).pipe(outputParser);
  const lcelChain = RunnableSequence.from([promptTemplate, llm, outputParser]);

  const answer = await lcelChain.invoke({
    course,
    role,
    wordLimit,
  });
  console.log("LCEL Chain Output: ", answer);
}
