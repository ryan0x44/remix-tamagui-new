/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToString } from "react-dom/server";

if (typeof globalThis.process === 'undefined') {
  // @ts-ignore
  globalThis.process = { env: {} };
}
process.env.TAMAGUI_TARGET = "web";

import tamaguiConfig from "tamagui.config";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  let body = renderToString(
    <RemixServer
      context={remixContext}
      url={request.url}
    />
  );
  body = body.replace("__STYLES__", tamaguiConfig.getCSS());

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
