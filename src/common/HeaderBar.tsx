import feather from "feather-icons";

export interface Props {
  isLoggedIn: boolean;
}

export const HeaderBar = ({ isLoggedIn }: Props) => {
  return (
    <header class="w-full p-4 bg-black text-green-400 font-mono text-xl border-2 border-green-400 shadow-[0_0_10px_#00ff00] flex items-center justify-between">
      <a href="/">
        <h1 class="text-lg md:text-3xl font-['VT323'] uppercase">Snip</h1>
      </a>
      <nav class="ml-3 flex items-center space-x-3 md:space-x-8 font-mono">
        {isLoggedIn ? (
          <>
            <a href="/snippets" class="hover:underline lowercase">
              Snippets
            </a>
            <a href="/settings" class="hover:underline lowercase">
              Settings
            </a>
            <a href="/logout">
              <button role="link" class="mt-1 [&>svg]:size-5 md:[&>svg]:size-6">
                {feather.icons["log-out"].toSvg()}
              </button>
            </a>
          </>
        ) : (
          <a
            href="/login"
            class="text-xl font-['VT323'] uppercase hover:underline"
          >
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
};
