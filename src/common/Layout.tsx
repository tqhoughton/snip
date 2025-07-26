import { PropsWithChildren } from "@kitajs/html";
import { Suspense } from "@kitajs/html/suspense";
import type { Request } from "src/utils/request";

import { ErrorPage } from "./ErrorPage";
import { HeaderBar } from "./HeaderBar";
import { FooterBar } from "./FooterBar";
import { Loading } from "./Loading";
import { ErrorBoundary } from "./ErrorBoundary";

export interface Props extends PropsWithChildren {
  rid: string | number;
  title: string;
  showHeader?: boolean;
  req: Request;
}

export const Layout = ({
  rid,
  req,
  title,
  showHeader = true,
  children,
}: Props) => {
  return (
    <>
      {"<!doctype html>"}
      <html class="h-full overflow-y-scroll overflow-x-hidden">
        <head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/public/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/public/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/public/favicon-16x16.png"
          />
          <link rel="manifest" href="/public/site.webmanifest" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/a11y-dark.min.css"
          />
          <link rel="stylesheet" href="/public/styles/tailwind.css" />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/htmx/2.0.6/htmx.min.js"
            integrity="sha512-fzOjdYXF0WrjlPAGWmlpHv2PnJ1m7yP8QdWj1ORoM7Bc4xmKcDRBOXSOZ4Wedia0mjtGzXQX1f1Ah1HDHAWywg=="
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/hyperscript/0.9.14/_hyperscript.min.js"
            integrity="sha512-l43sZzpnAddmYhJyfPrgv46XhJvA95gsA28/+eW4XZLSekQ8wlP68i9f22KGkRjY0HNiZrLc5MXGo4z/tM2QNA=="
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
            integrity="sha512-EBLzUL8XLl+va/zAsmXwS7Z2B1F9HUHkZwyS/VKwh3S7T/U0nF4BaU29EP/ZSf6zgiIxYAnKLu6bJ8dqpmX5uw=="
            crossorigin="anonymous"
          />
          <script>hljs.highlightAll();</script>
        </head>
        <body class="bg-black flex flex-col min-h-full grow items-center justify-center">
          <ErrorBoundary>
            {showHeader && (
              <HeaderBar isLoggedIn={req.oidc.isAuthenticated()} />
            )}
            <Suspense rid={rid} fallback={<Loading />}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Suspense>
            <FooterBar />
          </ErrorBoundary>
        </body>
      </html>
    </>
  );
};
