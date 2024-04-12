import { json } from "@remix-run/node";

import { apiGetChatListItems } from "~/models/chat.server";
// import { requireUserId } from "~/session.server";

export const loader = async () => {
  // const userId = await requireUserId(request);
  const chatListItems = await apiGetChatListItems();
  return json({ chatListItems });
};