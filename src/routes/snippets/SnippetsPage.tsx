import assert from "assert";
import { NotFound } from "http-errors";
import { escapeHtml } from "@kitajs/html";
import DOMPurify from "isomorphic-dompurify";

import { logger } from "src/utils/logger";
import { getSnippetByPath } from "./queries";
import type { Request } from "src/utils/request";
import { SnippetMenu } from "./SnippetMenu";
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

  let content: JSX.Element;

  switch (snippet.language) {
    case "markdown": {
      const marked = await import("marked");

      marked.use({
        renderer: {
          link({ tokens, href, title }) {
            const text = this.parser.parseInline(tokens);
            logger.info({ href, title, text });
            const isInternalLink = href.startsWith("#");
            href = isInternalLink ? `#md-${href.slice(1)}` : href;
            return `<a href="${href}">${text}</a>`;
          },
          // make sure that headers get anchor links
          heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

            return `
            <h${depth} id="md-${escapedText}">
              ${text}
            </h${depth}>`;
          },
        },
      });

      // NOTE: snippet.content MUST be sanitized before rendering since it contains user input
      content = DOMPurify.sanitize(
        marked.parse(snippet.content, { gfm: true }),
      );

      break;
    }
    default: {
      content = (
        <code class="whitespace-pre-wrap">{escapeHtml(snippet.content)}</code>
      );
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
            <h2 class="font-['VT323'] text-3xl pr-4 mr-auto">
              {snippet.fullPath}
            </h2>
            <div class="flex space-x-3">
              <a
                href={`/snips/${snippet.fullPath}?mode=edit`}
                class="font-['VT323'] text-green-400 hover:text-yellow-300 hover:underline"
              >
                Edit
              </a>
              <button
                hx-confirm="Are you sure you want to delete this snippet? This cannot be undone."
                hx-delete={`/snips/${snippet.id}`}
                hx-target="main"
                class="font-['VT323'] cursor-pointer text-green-400 hover:text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
          <article class="prose prose-slate prose-invert max-w-max bg-slate-800 p-4 border border-green-400 break-words">
            {content}
          </article>
        </section>
      )}
    </Main>
  );
};
