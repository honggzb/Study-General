import { Button, Card, Title } from "@mantine/core";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type QueryErrorBoundaryProps = {
  children: ReactNode;
};
export const QueryErrorBoundary = ({ children }: QueryErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Card withBorder radius={"md"} shadow="md" m="sm">
          <Title>Oups</Title>
          There was an error!
          <div>
            <Button color="red" onClick={() => resetErrorBoundary()}>
              Try again
            </Button>
          </div>
        </Card>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
