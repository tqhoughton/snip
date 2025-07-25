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
          <link rel="stylesheet" href="/public/styles/tailwind.css" />
          <script
            src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.6/dist/htmx.min.js"
            integrity="sha384-Akqfrbj/HpNVo8k11SXBb6TlBWmXXlYQrCSqEWmyKJe+hDm3Z/B2WVG4smwBkRVm"
            crossorigin="anonymous"
          />
          <script src="https://unpkg.com/hyperscript.org@0.9.14"></script>
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
