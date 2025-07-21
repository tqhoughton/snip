import assert from "assert";
import type express from "express";
import { icons } from "feather-icons";
import { getSnippetsByAuthor } from "./queries";
import type { Request } from "src/utils/request";

export interface Props {
  req: Request;
}

export const SnippetMenu = async ({ req }: Props) => {
  assert(req.oidc.user);
  const snippets = await getSnippetsByAuthor(req.oidc.user.sub);
  return (
    <nav class="p-4 border-r-2 border-green-400 font-mono">
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
          return (
            <li class="truncate max-w-60">
              <a
                href={`/snips/${snippet.fullPath}`}
                class="hover:text-blue-500 hover:underline lowercase text-xl"
              >
                {snippet.fullPath}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
