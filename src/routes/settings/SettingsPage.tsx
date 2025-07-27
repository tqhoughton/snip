import feather from "feather-icons";

export const SettingsPage = () => {
  return (
    <main class="font-mono w-full bg-black text-green-400 text-xl grow flex bg-crt p-12">
      <section class="mx-auto w-full max-w-4xl bg-black p-6 border-2 border-green-400 shadow-[0_0_10px_#00ff00]">
        <h2 class="font-[VT323] text-4xl mb-6">Settings</h2>
        <p class="mb-6">
          Snip does not store any user data except for the snips you create and
          the external IDs submitted by your authentication provider.
        </p>
        <p class="mb-6">
          Click{" "}
          <button
            hx-confirm="Are you sure you want to delete your account? This action cannot be undone."
            hx-delete="/settings/account"
            class="text-red-400 underline cursor-pointer"
            title="Delete account"
          >
            here
          </button>{" "}
          to delete your account. This is{" "}
          <span class="font-bold text-red-400 uppercase">not reversible</span>{" "}
          and will delete{" "}
          <span class="font-bold text-red-400 uppercase">all</span> snips
          associated with your account.
        </p>
        <p class="mb-6">
          If you contact us asking for this action to be reversed, you will be
          met with scorn and ridicule, and your request will be denied.
        </p>
        <p class="mb-6">
          The following libraries were used to build this application:
        </p>
        <ul class="list-disc pl-6">
          <li>
            <a
              href="https://expressjs.com"
              target="_blank"
              class="underline"
              title="expressjs.com"
            >
              Express.js
            </a>
          </li>
          <li>
            <a
              href="https://kitajs.org"
              target="_blank"
              class="underline"
              title="kitajs.org"
            >
              KitaJS
            </a>
          </li>
          <li>
            <a
              href="https://orm.drizzle.team"
              target="_blank"
              class="underline"
              title="Drizzle ORM"
            >
              Drizzle ORM
            </a>
          </li>
          <li>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              class="underline"
              title="tailwindcss.com"
            >
              TailwindCSS
            </a>
          </li>
          <li>
            <a
              href="https://htmx.org"
              target="_blank"
              class="underline"
              title="htmx.org"
            >
              HTMX
            </a>
          </li>
          <li>
            <a
              href="https://hyperscript.org"
              target="_blank"
              class="underline"
              title="hyperscript.org"
            >
              Hyperscript
            </a>
          </li>
          <li>
            <a
              href="https://feathericons.com"
              target="_blank"
              class="underline"
              title="feathericons.com"
            >
              Feather Icons
            </a>
          </li>
          <li>
            <a
              href="https://marked.js.org"
              target="_blank"
              class="underline"
              title="marked.js.org"
            >
              Marked.js
            </a>
          </li>
          <li>
            <a
              href="
https://highlightjs.org"
              target="_blank"
              class="underline"
              title="highlightjs.org"
            >
              Highlight.js
            </a>
          </li>
          <li>
            <a
              href="
https://dompurify.js.org"
              target="_blank"
              class="underline"
              title="dompurify.js.org"
            >
              DOMPurify
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};
