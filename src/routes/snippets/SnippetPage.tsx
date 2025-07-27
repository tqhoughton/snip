import assert from "assert";
import { NotFound } from "http-errors";
import { escapeHtml } from "@kitajs/html";
import DOMPurify from "isomorphic-dompurify";
import feather from "feather-icons";

import type { Request } from "src/utils/request";
import { getSnippetByPath } from "./queries";
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

      const renderer = new marked.Renderer();

      marked.use({
        renderer: {
          link({ tokens, href, title }) {
            const text = this.parser.parseInline(tokens);
            const isInternalLink = href.startsWith("#");
            href = isInternalLink ? `#md-${href.slice(1)}` : href;
            return `<a class="md-link-${isInternalLink ? "internal" : "external"}" href="${href}">${text}</a>`;
          },
          // make sure that headers ids are consistent with generated links
          heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);

            // support custom heading IDs
            // e.g. {#my-heading-id} in the markdown text
            const headingId =
              text.match(/\{#(.*)\}/)?.[1] ||
              text.toLowerCase().replace(/[^\w]+/g, "-");
            const textWithoutId = text.replace(/\{#.*\}/, "").trim();

            return `
            <h${depth} id="md-${headingId}">
              ${textWithoutId}
            </h${depth}>`;
          },
          code(...args) {
            const text = renderer.code(...args);
            return `<div class="code-wrapper">${text}<button class="copy-button" title="Copy to clipboard">${feather.icons.clipboard.toSvg()}</button></div>`;
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
      <section class="grow p-8 pt-6 overflow-x-scroll flex flex-col">
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
              title="Delete"
              class="font-['VT323'] cursor-pointer text-green-400 hover:text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
        {!content && (
          <div class="grow max-h-60 font-mono text-red-400 flex items-center justify-center">
            <p>Snip content is empty or not supported.</p>
          </div>
        )}
        {content && (
          <article class="prose prose-slate prose-invert max-w-max p-6 bg-slate-800 border border-green-400 break-words">
            {content}
            {/* prettier-ignore */}
            <script type="text/hyperscript">
              on click from .copy-button
                set button to it
              get its parentElement
              set codeText to its innerText
              call navigator.clipboard.writeText(codeText)
              set button.innerHTML to "Copied!"
          </script>
          {/* prettier-ignore */}
          <script type="text/hyperscript">
            on load
              for a in {`<a.md-link-external[href^="http"]/>`}
                log a.href
                set a.target to "_blank"
                set a.rel to "noopener noreferrer"
              end
          </script>
        </article>
        )}
      </section>
    </Main>
  );
};
