import type express from "express";
import { SnippetMenu } from "./SnippetMenu";
import assert from "assert";
import { getSnippetByPath } from "./queries";

export interface Props {
  req: express.Request;
  path?: string;
}

export const SnippetsPage = async ({ req, path }: Props) => {
  assert(req.oidc.user);

  const snippet = path && await getSnippetByPath(req.oidc.user.sub, path);

  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-stretch justify-center">
      <SnippetMenu req={req} />
      {!snippet && (
        <section class="grow p-4 flex items-center justify-center">
          <p>Select a snip on the left to open it in this panel.</p>
        </section>
      )}
      {snippet && (
        <section class="grow p-8 pt-6">
          <h2 class="text-3xl mb-4">{snippet.fullPath}</h2>
          <pre class="bg-gray-800 p-4 rounded border border-green-400 whitespace-pre-wrap break-words">
            <code>
              {snippet.content}
            </code>
          </pre>
        </section>
      )}
    </main>
  );
};
