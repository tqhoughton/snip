import "@kitajs/html";
import { logger } from "src/utils/logger";

export interface Props {
  error: Error;
}

export const ErrorPage = ({ error }: Props) => {
  logger.error({ error, msg: "rendering error page" });

  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-center justify-center bg-crt">
      <section class="max-w-lg bg-black p-4 border-2 border-green-400 shadow-[0_0_10px_#00ff00]">
        <h2 class="text-4xl text-center">Oops.</h2>
        <code class="text-xl block mt-2 mb-4">
          Error: {error.message ?? "Internal Server Error"}
        </code>
        <p class="mt-4">
          Looks like you ran into an error. Don't worry, it happens to the best
          of us! Click{" "}
          <a class="underline" href="/">
            here
          </a>{" "}
          to return to the home page.
        </p>
      </section>
    </main>
  );
};
