export const FooterBar = () => {
  return (
    <footer class="w-full p-4 bg-black text-green-400 font-mono border-2 border-green-400 flex items-center justify-center">
      <nav class="font-['VT323'] text-xl flex items-center space-x-2 md:space-x-8">
        <span>&copy; 2025 Turner Houghton</span>
        <span>
          Code hosted on{" "}
          <a
            class="underline"
            target="_blank"
            title="github.com"
            href="https://github.com/tqhoughton/snip"
          >
            GitHub
          </a>
        </span>
        <span>
          {" "}
          🦬 Powered by{" "}
          <a
            class="underline"
            target="_blank"
            title="htmx.org"
            href="https://htmx.org"
          >
            HTMX
          </a>
        </span>
      </nav>
    </footer>
  );
};
