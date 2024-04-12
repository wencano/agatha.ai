import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { homeRedirect } from "~/session.server";

export const meta: MetaFunction = () => [{ title: "Chats" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await homeRedirect(request);
  return json({success: true});
};

export default function Index() {
  return (<div></div>);
}
