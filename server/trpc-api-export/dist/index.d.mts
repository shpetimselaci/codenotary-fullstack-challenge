import * as _trpc_server from '@trpc/server';
import * as express from 'express';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import superjson from 'superjson';

declare const appRouter: _trpc_server.CreateRouterInner<
  _trpc_server.RootConfig<{
    ctx: {
      req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
      res: express.Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: typeof superjson;
  }>,
  {
    transactions: _trpc_server.CreateRouterInner<
      _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
          res: express.Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: typeof superjson;
      }>,
      {
        list: _trpc_server.BuildProcedure<
          'query',
          {
            _config: _trpc_server.RootConfig<{
              ctx: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >;
                res: express.Response<any, Record<string, any>>;
              };
              meta: object;
              errorShape: _trpc_server.DefaultErrorShape;
              transformer: typeof superjson;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            _input_in: {
              limit?: number | undefined;
              offset?: number | undefined;
            };
            _input_out: {
              limit?: number | undefined;
              offset?: number | undefined;
            };
            _output_in: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
              transaction_id: string;
              created_at: string;
            }[];
            _output_out: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
              transaction_id: string;
              created_at: string;
            }[];
          },
          unknown
        >;
        add: _trpc_server.BuildProcedure<
          'mutation',
          {
            _config: _trpc_server.RootConfig<{
              ctx: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >;
                res: express.Response<any, Record<string, any>>;
              };
              meta: object;
              errorShape: _trpc_server.DefaultErrorShape;
              transformer: typeof superjson;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            _input_in: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
            };
            _input_out: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
            };
            _output_in: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
              transaction_id: string;
              created_at: string;
            };
            _output_out: {
              account_number: string;
              account_name: string;
              iban: string;
              address: string;
              amount: number;
              type: 'receiving' | 'sending';
              transaction_id: string;
              created_at: string;
            };
          },
          unknown
        >;
      }
    >;
  }
>;
type AppRouter = typeof appRouter;

type Transaction = {
  transaction_id: string;
  account_number: string;
  account_name: string;
  type: 'receiving' | 'sending';
  iban: string;
  address: string;
  amount: number;
  created_at: string;
};

export type { AppRouter, Transaction };
