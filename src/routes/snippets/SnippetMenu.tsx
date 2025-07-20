import { icons } from "feather-icons";

export const SnippetMenu = () => {
  return (
    <nav class="p-4 min-w-xs border-r-2 border-green-400 font-mono">
      <ul>
        <li>
          <a href="/snips/new" class="hover:underline lowercase text-xl">
            <button
              role="link"
              class="cursor-pointer flex align-center justify-center"
            >
              <div class="mr-2">{icons["plus-square"].toSvg()}</div>
              Create Snip
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};
