export const FooterBar = () => {
  return (
    <footer class="w-full p-4 bg-black text-green-400 font-mono border-2 border-green-400 shadow-[0_0_10px_#00ff00] flex items-center justify-center">
      <nav class="font-['VT323'] text-xl flex items-center space-x-2 md:space-x-8">
        <span>&copy; 2025 Turner Houghton</span>
        <span>
          {" "}
          🦬 Powered by{" "}
          <a class="underline" target="_blank" href="https://htmx.org">
            HTMX
          </a>
        </span>
      </nav>
    </footer>
  );
};
