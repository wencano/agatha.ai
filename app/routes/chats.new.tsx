import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { LoremIpsum } from "lorem-ipsum";
import { useEffect, useRef } from "react";

import { createChat } from "~/models/chat.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const question = formData.get("question");
  let answer = formData.get("answer");
  
  const fakeAI = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  answer = fakeAI.generateParagraphs( Math.floor(Math.random() * 10) || 1 ); // Get from AI response

  if (typeof question !== "string" || question.length === 0) {
    return json(
      { errors: { answer: null, question: "Title is required" } },
      { status: 400 },
    );
  }

  const chat = await createChat({ answer, question, userId });

  return redirect(`/chats/${chat.id}`);
};

export default function NewChatPage() {
  const actionData = useActionData<typeof action>();
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.question) {
      questionRef.current?.focus();
    } else if (actionData?.errors?.answer) {
      answerRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Query: </span>
          <input
            ref={questionRef}
            name="question"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.question ? true : undefined}
            aria-errormessage={
              actionData?.errors?.question ? "question-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.question ? (
          <div className="pt-1 text-red-700" id="question-error">
            {actionData.errors.question}
          </div>
        ) : null}
      </div>

      <div className="">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Send
        </button>
      </div>
    </Form>
  );
}
