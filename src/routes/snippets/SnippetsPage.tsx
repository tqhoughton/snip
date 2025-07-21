import { SnippetMenu } from "./SnippetMenu";
import assert from "assert";
import { getSnippetByPath } from "./queries";
import type { Request } from "src/utils/request";

export interface Props {
  req: Request;
  path?: string;
}

export const SnippetsPage = async ({ req, path }: Props) => {
  assert(req.oidc.user);

  const snippet = path && (await getSnippetByPath(req.oidc.user.sub, path));

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
          <div class="flex items-center mb-4">
            <h2 class="text-3xl mr-auto">{snippet.fullPath}</h2>
            <div>
              <a
                href={`/snips/${snippet.fullPath}?mode=edit`}
                class="text-green-400 hover:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <button
                hx-confirm="Are you sure you want to delete this snippet? This cannot be undone."
                hx-delete={`/snips/${snippet.fullPath}`}
                class="cursor-pointer ml-4 text-green-400 hover:text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <pre class="bg-gray-800 p-4 rounded border border-green-400 whitespace-pre-wrap break-words">
            <code>{snippet.content}</code>
          </pre>
        </section>
      )}
    </main>
  );
};
