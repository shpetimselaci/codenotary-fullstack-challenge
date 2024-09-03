import { QueryClientProvider } from "@tanstack/react-query";
import { reactQueryClient } from "./clients/react-query";
import {
  TrpcApiBoilerplateClient,
  TrpcApiBoilerplateClientProvider,
} from "./clients/trpc-client";
import { ReactQueryDevtools } from "node_modules/@tanstack/react-query-devtools/build/lib/devtools";
import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// GitHub pages - use hash routing since server doesn't support rewrites to index.html for HTTP requests.
const hashHistory = createHashHistory();

const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <TrpcApiBoilerplateClient.Provider
      client={TrpcApiBoilerplateClientProvider}
      queryClient={reactQueryClient}
    >
      <QueryClientProvider client={reactQueryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TrpcApiBoilerplateClient.Provider>
  );
};
