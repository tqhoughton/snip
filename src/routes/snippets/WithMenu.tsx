import { SnippetMenu } from "./SnippetMenu";
import type { Request } from "src/utils/request";

export const WithMenu = ({
  req,
  children,
}: {
  req: Request;
  children: JSX.Element;
}) => {
  return (
    <div class="font-['VT323'] w-full bg-black text-green-400 text-xl grow flex items-stretch justify-center">
      <SnippetMenu req={req} />
      {children}
    </div>
  );
};
