import type { LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { TamaguiProvider } from "@tamagui/web";
import tamaguiConfig from "../tamagui.config";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TamaguiProvider config={tamaguiConfig}>
          <Outlet />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (typeof window.process === 'undefined') {
                globalThis.process = { env: {} };
              }
              process.env.TAMAGUI_TARGET = \"web\";
              `,
            }}
          />
        </TamaguiProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
