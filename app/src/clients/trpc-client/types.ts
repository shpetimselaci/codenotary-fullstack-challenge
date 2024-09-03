import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./api-types/index.d.mts";

// Not using tRPC API as npm package - https://github.com/mkosir/trpc-api-boilerplate#avoid-publishing-package
// import { AppRouter } from './api-types';

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;
export type Transactions = RouterOutput["transactions"]["list"]["items"];
export type Transaction = Transactions[0];

export type AddTransactionInput = RouterInput["transactions"]["add"];
