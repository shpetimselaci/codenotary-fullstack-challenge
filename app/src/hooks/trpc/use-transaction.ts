import { useMemo } from "react";
import { TrpcApiBoilerplateClient } from "~/clients/trpc-client";

export const useTransactions = () => {
  const query = TrpcApiBoilerplateClient.transactions.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialCursor: 0,
    }
  );

  const transactions = useMemo(() => {
    return (query.data?.pages || []).flatMap((page) => page.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.dataUpdatedAt]);

  return {
    ...query,
    transactions,
  };
};
