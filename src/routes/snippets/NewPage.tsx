import { ValidationError } from "src/utils/errors";
import { SnippetForm } from "./SnippetForm";
import { SnippetMenu } from "./SnippetMenu";
import type { Request } from "src/utils/request";
import { Main } from "./Main";

export interface Props {
  req: Request;
  init?: {
    values: {
      fullPath?: string;
      content?: string;
    };
    error?: ValidationError;
  };
}

export const NewPage = ({ req, init }: Props) => {
  return (
    <Main>
      <SnippetMenu req={req} />
      <section class="grow p-8 pt-4">
        <SnippetForm initialValues={init?.values} error={init?.error} />
      </section>
    </Main>
  );
};
