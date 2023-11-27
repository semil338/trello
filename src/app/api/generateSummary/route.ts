import { NextRequest, NextResponse } from "next/server";
import openai from "../../../../openai";

export async function POST(request: NextRequest) {
  const { todos } = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    n: 1,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as User and say welcome to the Trello App! Limit the response to 200 characters ",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in such category such as To do, in progress and done, then tell the user to have a productive day! Here's the data : ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });
  console.log(chatCompletion.choices[0].message);

  return NextResponse.json(chatCompletion.choices[0].message);
}
