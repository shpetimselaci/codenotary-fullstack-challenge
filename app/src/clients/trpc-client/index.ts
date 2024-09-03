import superjson from "superjson";

import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./api-types/index.d.mts";

// Uncomment bellow line if not importing tRPC API from npm package - https://github.com/mkosir/trpc-api-boilerplate#avoid-publishing-package
// import { AppRouter } from '../api-types';

export const TrpcApiBoilerplateClient = createTRPCReact<AppRouter>();

export const TrpcApiBoilerplateClientProvider =
  TrpcApiBoilerplateClient.createClient({
    links: [httpBatchLink({ url: import.meta.env.VITE_PUBLIC_TRPC_API })],
    transformer: superjson,
  });

export * from "./types";

// export * from "./api-types";
