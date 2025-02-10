import OpenAI from "openai";
import { generateImageOpenAi } from "./generate-image.service";

const openai = new OpenAI();

export async function interpretAndExecute(input: string): Promise<unknown> {
  try {
    // Use OpenAI to interpret the input

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that responds in JSON format.",
        },
        {
          role: "user",
          content:
            "Please provide the intent and parameters in JSON format for the following input: " +
            input,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    // Parse the intent as an object

    // Check if the content is valid JSON
    const content = completion.choices[0]?.message?.content || "{}";

    console.log("Raw content:", content);

    let intentData;
    try {
      // Parse the content as JSON
      intentData = JSON.parse(content);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return "The response is not in a valid JSON format.";
    }

    console.log("Parsed intent data:", intentData);

    const intent = intentData.intent;
    const parameters = intentData.parameters || {};

    if (intent.includes("generate") || intent.includes("image")) {
      const promptParts = [];
      if (parameters.subject) promptParts.push(parameters.subject);
      if (parameters.action) promptParts.push(parameters.action);
      if (parameters.location) promptParts.push(parameters.location);
      if (parameters.category) promptParts.push(parameters.category);
      const prompt = promptParts.join(" ");
      if (promptParts.length === 0) {
        const promptSuggestion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates detailed prompts.",
            },
            {
              role: "user",
              content: `Transform the intent "${intent}" into a detailed prompt.`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        const suggestionContent =
          promptSuggestion.choices[0]?.message?.content || "a generic image";
        promptParts.push(suggestionContent.trim());
      }

      const url = await generateImageOpenAi(prompt);

      return url;
    }
  } catch (error) {
    console.error("Error interpreting input:", error);
    return "An error occurred while processing your request.";
  }
}
