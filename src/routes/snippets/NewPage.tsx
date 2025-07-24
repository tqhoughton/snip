import { ValidationError } from "src/utils/errors";
import { SnippetForm } from "./SnippetForm";
import { SnippetMenu } from "./SnippetMenu";
import type { Request, Response } from "src/utils/request";

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
    <main class="w-full bg-black text-green-400 text-xl grow flex items-stretch">
      <SnippetMenu req={req} />
      <section class="grow p-8 pt-4">
        <SnippetForm initialValues={init?.values} error={init?.error} />
      </section>
    </main>
  );
};
