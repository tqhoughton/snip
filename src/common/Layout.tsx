import type express from "express";
import { PropsWithChildren } from "@kitajs/html";
import { ErrorBoundary } from "@kitajs/html/error-boundary";
import { ErrorPage } from "./ErrorPage";
import { HeaderBar } from "./HeaderBar";
import { FooterBar } from "./FooterBar";

export interface Props extends PropsWithChildren {
  title: string;
  showHeader?: boolean;
  req: express.Request;
}

export const Layout = ({ req, title, showHeader = true, children }: Props) => {
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
        </head>
        <body class="bg-yellow-50 flex flex-col min-h-full flex-grow items-center justify-center relative">
          <ErrorBoundary
            catch={(err) => (
              <ErrorPage error={err instanceof Error ? err : new Error()} />
            )}
          >
            {showHeader && (
              <HeaderBar isLoggedIn={req.oidc.isAuthenticated()} />
            )}
            {children}
            <FooterBar />
          </ErrorBoundary>
        </body>
      </html>
    </>
  );
};
