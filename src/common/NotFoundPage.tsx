import "@kitajs/html";

export const NotFoundPage = () => {
  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl flex-grow flex items-center justify-center bg-crt">
      <section class="max-w-lg bg-black p-4 border-2 border-green-400 shadow-[0_0_10px_#00ff00]">
        <h2 class="text-4xl text-center">Hmmmmm.</h2>
        <p class="mt-4">
          Sorry, we couldn't find the requested page. Click <a class="underline" href="/">here</a> to return to the home page.
        </p>
      </section>
    </main>
  );
};
