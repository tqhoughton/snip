import assert from "assert";
import { NotFound } from "http-errors";

import type { Request } from "src/utils/request";
import { ValidationError } from "src/utils/errors";

import { SnippetForm } from "./SnippetForm";
import { SnippetMenu } from "./SnippetMenu";
import { getSnippetByPath } from "./queries";
import { Main } from "./Main";

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
    <Main>
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
    </Main>
  );
};
