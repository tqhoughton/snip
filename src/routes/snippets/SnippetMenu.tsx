import type express from "express";
import assert from "assert";
import clsx from "clsx";
import { icons } from "feather-icons";

import { getSnippetsByAuthor } from "./queries";

export interface Props {
  req: express.Request<{ fullPath?: string[] }>;
}

export const SnippetMenu = async ({ req }: Props) => {
  assert(req.oidc.user);
  const sideNavWidth = req.cookies.sideNavWidth

  const snippets = await getSnippetsByAuthor(req.oidc.user.sub);
  return (
    <aside id="nav" class="border-r-2 border-green-400 font-mono min-w-60 w-60 max-w-2xl relative" style={sideNavWidth && { minWidth: sideNavWidth }}>
      <div id="nav-border" class="absolute top-0 -right-0.5 bottom-0 w-0.5 cursor-col-resize">
        {/* PROBLEM: cannot figure out how to make each event register only register if needed and orchestrate cleanup */}
        {/* TODO: figure out how to make this deregister event listeners automatically */}
        {/* <script type="text/hyperscript">
          on mousedown from #nav-border
            halt the event's default
            set global isResizing to true
          on mousemove from document
            if isResizing
              set containerRect to my.getBoundingClientRect()
              set newWidth to event.clientX - containerRect.left
              set *width of #nav to newWidth + "px"
            end
          end
          on mouseup from document
            set global isResizing to false
          end
        </script> */}
        {/* for now, use a javascript based resize.js script */}
        <script src="/public/scripts/resize.js" />
      </div>
      <nav class="p-4">
        <ul>
          <li>
            <a href="/snips/new" class="lowercase text-xl">
              <button
                role="link"
                class="bg-green-400 border-2 p-2 text-black w-full cursor-pointer flex align-center justify-center hover:text-green-400 hover:bg-black transition-all"
              >
                <div class="mr-2 mt-0.5">{icons["plus-square"].toSvg()}</div>
                Create Snip
              </button>
            </a>
          </li>
          <hr class="border-none mb-4" />
          {snippets.map((snippet) => {
            const active =
              (req.params.fullPath ?? []).join("/") === snippet.fullPath;

            return (
              <li class="max-w-full">
                <a
                  // only way to disable links is to remove the href attribute
                  {...(!active && { href: `/snips/${snippet.fullPath}` })}
                  class={clsx(
                    "hover:text-blue-500 hover:underline lowercase text-xl truncate block",
                    active && "text-purple-500 cursor-pointer underline",
                  )}
                >
                  {snippet.fullPath}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
