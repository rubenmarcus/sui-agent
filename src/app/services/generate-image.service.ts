"use server"

import { OpenAI } from "openai";

export type GenerateImageResponse = {
  url: string;
  hash: string;
};



const openai = new OpenAI();

export const generateImageOpenAi = async (
  prompt: string,
): Promise<any> => {
  console.log(prompt, 'prompt')


  // const imageGenerationResult = await openai.images.generate({
  //   prompt: prompt,
  //   model: "dall-e-3",
  //   n: 1,
  //   size: "1024x1024",
  //   response_format: "b64_json",
  //   quality: "standard",
  //   style: "vivid",
  // });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data[0].url);

  return response

  // const imageData = imageGenerationResult.data[0];
  // if (!imageData || !imageData.b64_json) {
  //   throw new Error("No image data returned in imageGenerationResult");
  // }

  // const fileBuffer = Buffer.from(imageData.b64_json, "base64");

  // const publisherUrl = "https://publisher.walrus-testnet.walrus.space"; // Replace with actual URL
  // const epochs = 1; // Set the number of epochs as needed

  // const response = await fetch(`${publisherUrl}/v1/blobs?epochs=${epochs}`, {
  //   method: "POST",
  //   body: new Blob([fileBuffer], { type: "image/jpeg" }),
  // });

  // if (!response.ok) {
  //   throw new Error(`Error uploading via WALRUS service: ${await response.text()}`);
  // }

  // const walrusResponse = await response.json();
  // let blobId;
  // if ("alreadyCertified" in walrusResponse) {
  //   blobId = walrusResponse.alreadyCertified.blobId;
  // } else if ("newlyCreated" in walrusResponse) {
  //   blobId = walrusResponse.newlyCreated.blobObject.blobId;
  // } else {
  //   throw new Error("Unhandled successful response!");
  // }

  // const aggregatorUrl = "https://aggregator.walrus-testnet.walrus.space"; // Replace with actual URL
  // const url = `${aggregatorUrl}/v1/blobs/${blobId}`;

  // return {
  //   url,
  //   hash: blobId,
  // };
};