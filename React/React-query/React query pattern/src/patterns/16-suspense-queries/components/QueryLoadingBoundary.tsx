import { Card, Skeleton } from "@mantine/core";
import { ReactNode } from "@tanstack/react-router";
import { Suspense } from "react";
import { Layout } from "./Layout";

type QueryLoadingBoundaryProps = {
  children: ReactNode;
};

export const QueryLoadingBoundary = ({
  children,
}: QueryLoadingBoundaryProps) => {
  return (
    <Suspense
      fallback={
        <Layout>
          <Card withBorder radius={"md"} shadow="md" m="sm" mt={72}>
            <div className="grid gap-2">
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </div>
          </Card>
        </Layout>
      }
    >
      {children}
    </Suspense>
  );
};
