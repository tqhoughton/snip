import assert from "assert";
import { SnippetForm } from "./SnippetForm";
import { SnippetMenu } from "./SnippetMenu";
import type { Request } from "src/utils/request";
import { getSnippetByPath } from "./queries";
import { NotFound } from "http-errors";
import { ValidationError } from "src/utils/errors";

export interface Props {
  fullPath: string;
  req: Request;
  init?: {
    values: {
      fullPath?: string;
      content?: string;
    };
    error?: ValidationError;
  };
}

export const EditPage = async ({ req, fullPath, init }: Props) => {
  assert(req.oidc.user);

  const snippet = await getSnippetByPath(req.oidc.user.sub, fullPath);

  assert(snippet, new NotFound(`Snippet with path "${fullPath}" not found.`));

  return (
    <main class="w-full bg-black text-green-400 text-xl grow flex items-stretch">
      <SnippetMenu req={req} />
      <section class="grow p-8 pt-4">
        <SnippetForm
          id={snippet.id}
          error={init?.error}
          initialValues={
            init?.values || {
              fullPath: snippet.fullPath,
              content: snippet.content,
            }
          }
        />
      </section>
    </main>
  );
};
