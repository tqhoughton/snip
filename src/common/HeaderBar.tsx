import feather from "feather-icons";

export interface Props {
  isLoggedIn: boolean;
}

export const HeaderBar = ({ isLoggedIn }: Props) => {
  return (
    <header class="w-full p-4 bg-black text-green-400 font-mono text-xl border-2 border-green-400 flex items-center justify-between">
      <a href="/">
        <h1 class="text-lg md:text-3xl font-['VT323'] uppercase">Snip</h1>
      </a>
      <nav class="ml-3 font-mono">
        <ul class="flex items-center space-x-8">
          {isLoggedIn ? (
            <>
              <li>
                <a
                  href="/snips"
                  class="hover:underline lowercase flex space-x-2"
                >
                  <span class="mt-0.5">{feather.icons.scissors.toSvg()}</span>
                  <span>Snips</span>
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  class="hover:underline lowercase flex space-x-2"
                >
                  <span class="mt-0.5">{feather.icons.settings.toSvg()}</span>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="/logout">
                  <button
                    role="link"
                    class="cursor-pointer mt-1.5 [&>svg]:size-5 md:[&>svg]:size-6"
                  >
                    {feather.icons["log-out"].toSvg()}
                  </button>
                </a>
              </li>
            </>
          ) : (
            <li>
              <a
                href="/login"
                class="text-xl font-['VT323'] uppercase hover:underline"
              >
                Sign In
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
