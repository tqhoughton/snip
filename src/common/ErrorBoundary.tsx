import { PropsWithChildren } from "@kitajs/html";
import { ErrorBoundary as KitaErrorBoundary } from "@kitajs/html/error-boundary";
import { ErrorPage } from "./ErrorPage";

export const ErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <KitaErrorBoundary
      catch={(err) => (
        <ErrorPage error={err instanceof Error ? err : new Error()} />
      )}
    >
      {children}
    </KitaErrorBoundary>
  );
};
