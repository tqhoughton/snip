import { SnippetMenu } from "./SnippetMenu";
import assert from "assert";
import { getSnippetByPath } from "./queries";
import type { Request } from "src/utils/request";
import { NotFound } from "http-errors";
import { Main } from "./Main";

export interface Props {
  req: Request;
  fullPath?: string;
}

export const SnippetsPage = async ({ req, fullPath }: Props) => {
  assert(req.oidc.user);

  if (!fullPath) {
    return (
      <Main>
        <SnippetMenu req={req} />
        <section class="grow p-4 flex items-center justify-center">
          <p>Select a snip on the left to open it in this panel.</p>
        </section>
      </Main>
    );
  }

  const snippet = await getSnippetByPath(req.oidc.user.sub, fullPath);
  assert(snippet, new NotFound(`Snippet with path "${fullPath}" not found.`));

  let content: string;

  switch (snippet.language) {
    case "markdown": {
      content = snippet.content;
      break;
    }
    default: {
      content = snippet.content;
    }
  }

  return (
    <Main>
      <SnippetMenu req={req} />
      {!snippet && (
        <section class="grow p-4 flex items-center justify-center">
          <p>Select a snip on the left to open it in this panel.</p>
        </section>
      )}
      {snippet && (
        <section class="grow p-8 pt-6">
          <div class="flex flex-wrap items-center mb-4">
            <h2 class="text-3xl pr-4 mr-auto">{snippet.fullPath}</h2>
            <div class="flex space-x-3">
              <a
                href={`/snips/${snippet.fullPath}?mode=edit`}
                class="text-green-400 hover:text-yellow-300 hover:underline"
              >
                Edit
              </a>
              <button
                hx-confirm="Are you sure you want to delete this snippet? This cannot be undone."
                hx-delete={`/snips/${snippet.id}`}
                hx-target="main"
                class="cursor-pointer text-green-400 hover:text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <pre class="bg-gray-800 p-4 border border-green-400 whitespace-pre-wrap break-words">
            <code>{snippet.content}</code>
          </pre>
        </section>
      )}
    </Main>
  );
};
