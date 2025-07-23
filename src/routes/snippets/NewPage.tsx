import { SnippetMenu } from "./SnippetMenu";
import type { Request } from "src/utils/request";

export interface Props {
  req: Request;
}

export const NewPage = ({ req }: Props) => {
  return (
    <main class="w-full bg-black text-green-400 text-xl grow flex items-stretch">
      <SnippetMenu req={req} />
      <section class="grow p-8 pt-6">
        <form hx-post="/snips">
          <div class="mb-4">
            <label>
              <span class="text-2xl font-['VT323'] block mb-2">Path:</span>
              <input
                minlength={1}
                name="fullPath"
                type="text"
                class="font-mono w-full p-2 bg-gray-800 text-green-400 placeholder-gray-600 border border-green-400"
                placeholder="my/folder/my-snippet"
              />
            </label>
          </div>
          <div class="mb-4">
            <label>
              <span class="text-2xl font-['VT323'] block mb-2">
                Content (markdown):
              </span>
              <textarea
                minlength={1}
                name="content"
                class="font-mono w-full p-2 bg-gray-800 text-green-400 placeholder-gray-600 border border-green-400"
                rows="16"
                placeholder="Enter snippet content"
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            class="text-2xl font-['VT323'] bg-green-400 text-black font-bold py-2 px-4 hover:bg-green-500 transition-colors"
          >
            Create Snip
          </button>
        </form>
      </section>
    </main>
  );
};
