import { NextResponse } from "next/server";
import { interpretAndExecute } from "../../services/openai.service";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { inputMessage } = await request.json();

    // Call the interpretAndExecute function with the input message
    const response = await interpretAndExecute(inputMessage);

    // Return the response as JSON
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error processing message:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
