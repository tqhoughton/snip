import feather from "feather-icons";

export interface Props {
  isLoggedIn: boolean;
}

export const HeaderBar = ({ isLoggedIn }: Props) => {
  return (
    <header class="w-full p-4 bg-black text-green-400 font-mono text-xl border-2 border-green-400 flex items-center justify-between relative">
      <a href="/" title="Home">
        <h1 class="text-4xl hover:text-green-500 transition-all font-['VT323'] uppercase leading-none">
          Snip
        </h1>
      </a>
      <nav class="ml-3 font-mono">
        <ul class="flex items-center space-x-8">
          {isLoggedIn ? (
            <>
              <li>
                <a
                  href="/snips"
                  title="Snips"
                  class="hover:underline hover:text-blue-500 transition-all lowercase flex space-x-2"
                >
                  <span class="mt-0.5">{feather.icons.scissors.toSvg()}</span>
                  <span>Snips</span>
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  class="hover:underline hover:text-blue-500 transition-all lowercase flex space-x-2"
                >
                  <span class="mt-0.5">{feather.icons.settings.toSvg()}</span>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="/logout"
                  title="Log out"
                  class="cursor-pointer hover:text-yellow-300 transition-all mt-1.5 [&>svg]:size-5 md:[&>svg]:size-6"
                >
                  {feather.icons["log-out"].toSvg()}
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
