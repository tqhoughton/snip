import "@kitajs/html";
import { logger } from "src/utils/logger";

export interface Props {
  error: Error;
}

export const ErrorPage = ({ error }: Props) => {
  logger.error({ error, msg: "rendering error page" });

  return (
    <main class="w-full max-w-lg flex-grow p-4 flex items-center justify-center">
      <section>
        <h2 class="text-3xl">Whoops!</h2>
        <code class="text-xl block mt-2 mb-4">
          {error.message ?? "Internal Server Error"}
        </code>
        <p>Looks like you encountered an error.</p>
        <p>
          Please reload the page or go back to the{" "}
          <a href="/" class="underline text-blue-500 hover:text-blue-700">
            Home Page
          </a>
        </p>
      </section>
    </main>
  );
};
