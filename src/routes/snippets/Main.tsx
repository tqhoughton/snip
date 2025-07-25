import { PropsWithChildren } from "@kitajs/html";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <main class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-stretch">
      {children}
    </main>
  );
};
