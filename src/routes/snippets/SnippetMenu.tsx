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
  const snippets = await getSnippetsByAuthor(req.oidc.user.sub);
  return (
    <aside class="p-4 border-r-2 border-green-400 font-mono">
      <nav>
        <ul class="min-w-60">
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
              <li class="max-w-60">
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
