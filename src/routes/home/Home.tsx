export const Home = () => {
  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-center justify-center bg-crt">
      <section class="max-w-lg bg-black p-4 border-2 border-green-400 shadow-[0_0_10px_#00ff00]">
        <h2 class="text-4xl">Welcome to Snip!</h2>
        <p class="mt-4">
          Snip is a simple app designed to make organizing and using your
          favorite code snippets easier.
        </p>
        <p class="mt-4">
          Click on <span class="uppercase">"sign in"</span> to get started!
        </p>
      </section>
    </main>
  );
};
