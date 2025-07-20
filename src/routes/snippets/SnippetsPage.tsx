import { SnippetMenu } from "./SnippetMenu";

export const SnippetsPage = () => {
  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-stretch justify-center">
      <SnippetMenu />
      <section class="grow p-4 flex items-center justify-center">
        <p>Select a snip on the left to open it in this panel.</p>
      </section>
    </main>
  );
};
