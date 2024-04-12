import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { TbLogout } from "react-icons/tb";

import Sidebar from "~/components/Sidebar";
import { getChatListItems } from "~/models/chat.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const chatListItems = await getChatListItems({ userId });
  return json({ chatListItems });
};

export default function ChatsPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full w-full min-h-screen flex-col ">
      <header className="flex items-center justify-between bg-black p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Agatha.AI</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            title="Logout?"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-slate-500 active:bg-slate-700"
          >
            <TbLogout />
          </button>
        </Form>
      </header>

      <main className="flex h-[calc(100vh-72px)]  dark:text-white dark:bg-[#161616] overflow-hidden bg-gray-100">
        <Sidebar data={data} />

        <div className="flex-1 min-w-[340px]  overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
