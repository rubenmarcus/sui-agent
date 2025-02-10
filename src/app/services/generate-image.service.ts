"use server";

import { OpenAI } from "openai";



const openai = new OpenAI();

export const generateImageOpenAi = async (prompt: string):  Promise<unknown> => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  return response;
};
