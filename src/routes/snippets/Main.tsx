import { PropsWithChildren } from "@kitajs/html";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main class="font-mono w-full bg-black text-green-400 text-xl grow flex items-stretch">
      {children}
    </main>
  );
};
