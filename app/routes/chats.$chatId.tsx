import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteChat, getChat } from "~/models/chat.server";
import { requireUserId } from "~/session.server";


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.chatId, "chatId not found");

  const chat = await getChat({ id: params.chatId, userId });
  if (!chat) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ chat });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.chatId, "chatId not found");

  await deleteChat({ id: params.chatId, userId });

  return redirect("/chats");
};

export default function ChatDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="pt-10 pb-10">
      
      <div
        className="w-full text-token-text-primary"
        dir="auto"
        data-testid="conversation-turn-2"
      >
          <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
            <div
              className="flex flex-1 text-base mx-auto gap-3 juice:gap-4 juice:md:gap-6 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group"
            >
              <div className="flex-shrink-0 flex flex-col relative items-end">
                <div>
                  <div className="pt-0.5">
                    <div
                      className="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full"
                    >
                      <div className="relative flex">
                        <img
                          alt="User"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          width="24"
                          height="24"
                          decoding="async"
                          data-nimg="1"
                          className="rounded-sm"
                          src="https://s.gravatar.com/avatar/ba6f9a90c12524f860e4eb35a3e9818f?s=480&amp;r=pg&amp;d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fu.png"
                          style={{color: "transparent"}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full flex-col">
                <div className="font-semibold select-none">You</div>
                <div className="flex-col gap-1 md:gap-3">
                  <div className="flex flex-grow flex-col max-w-full">
                    <div
                      data-message-author-role="user"
                      data-message-id="aaa2688b-0573-45ce-a864-c48b8cc77b3b"
                      dir="auto"
                      className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto"
                    >
                      <div className="">
                        {data.chat.question}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex gap-3 empty:hidden juice:justify-end">
                    <div
                      className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible"
                    >
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div
        className="w-full text-token-text-primary"
        dir="auto"
        data-testid="conversation-turn-2"
      >
          <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
            <div
              className="flex flex-1 text-base mx-auto gap-3 juice:gap-4 juice:md:gap-6 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group"
            >
              <div className="flex-shrink-0 flex flex-col relative items-end">
                <div>
                  <div className="pt-0.5">
                    <div
                      className="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full"
                    >
                      <div className="relative flex">
                        <img src="/chatgpt-log.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full flex-col">
                <div className="font-semibold select-none">Agatha</div>
                <div className="flex-col gap-1 md:gap-3">
                  <div className="flex flex-grow flex-col max-w-full">
                    <div
                      data-message-author-role="user"
                      data-message-id="aaa2688b-0573-45ce-a864-c48b8cc77b3b"
                      dir="auto"
                      className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto"
                    >
                      <div className="">
                        {(data.chat.answer||'').split("\n").map((ln,i)=>(<p key={i} className="mb-2">{ln}</p>))}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

      
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Chat not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
