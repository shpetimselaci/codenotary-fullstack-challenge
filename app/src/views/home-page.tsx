import { useMemo } from "react";
import { TrpcApiBoilerplateClient } from "~/clients/trpc-client";
import { Button } from "~/shell/button";

export const HomePage = () => {
  const { data, fetchNextPage, hasNextPage } =
    TrpcApiBoilerplateClient.transactions.list.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: 0,
      }
    );

  const transactions = useMemo(() => {
    console.warn(data?.pages);
    return (data?.pages || []).flatMap((page) => page.items);
  }, [data?.pages.length]);

  return (
    <div>
      <h3>Account transactions</h3>
      <div className="mt-4 flex flex-wrap">
        <table className=" w-full rounded-lg text-sm table-auto border-collapse p-2 border border-b mb-1 border-slate-500 ">
          <thead>
            <tr>
              <th className="border rounded-md border-slate-600">Id</th>
              <th className="border rounded-md border-slate-600">Account nr</th>
              <th className="border rounded-md border-slate-600">
                Account name
              </th>
              <th className="border rounded-md border-slate-600">IBAN</th>
              <th className="border rounded-md border-slate-600">Type</th>
              <th className="border rounded-md border-slate-600">Amount</th>
              <th className="border rounded-md border-slate-600">Address</th>
              <th className="border rounded-md border-slate-600">Created At</th>
            </tr>
          </thead>

          <tbody>
            {!data?.pages ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              <>
                {(transactions || []).map((transaction) => (
                  <tr
                    className="hover:bg-slate-300"
                    key={transaction.transaction_id}
                  >
                    <td className="border-b px-2 py-1">
                      {transaction.transaction_id}
                    </td>
                    <td className="border-b px-2 py-1">
                      {transaction.account_number}
                    </td>
                    <td className="border-b px-2 py-1">
                      {transaction.account_name}
                    </td>
                    <td className="border-b px-2 py-1">{transaction.iban}</td>
                    <td className="border-b px-2 py-1">{transaction.type}</td>
                    <td className="border-b px-2 py-1">{transaction.amount}</td>
                    <td className="border-b px-2 py-1">
                      {transaction.address}
                    </td>
                    <td className="border-b px-2 py-1">
                      {transaction.created_at}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </Button>
      </div>
    </div>
  );
};
