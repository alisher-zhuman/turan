import { Suspense, type ReactNode } from "react";
import { Loader } from "@/shared/ui/loader";

interface Props {
  children: ReactNode;
}

export const WithSuspense = ({ children }: Props) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);
