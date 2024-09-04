import { useAddTransactionMutation } from "~/hooks/trpc/use-add-transaction-mutation";
import { useTransactions } from "~/hooks/trpc/use-transaction";
import { AddTransaction } from "./add-transaction";
import { Button } from "~/shell/button";

export const TransactionsTable = () => {
  const {
    transactions,
    isInitialLoading,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useTransactions();

  const mutation = useAddTransactionMutation();
  return (
    <>
      <table className=" w-full rounded-lg text-md table-auto border-collapse p-2 border border-b mb-1 border-slate-500 ">
        <thead>
          <tr>
            <th className="border rounded-md border-slate-600">Id</th>
            <th className="border rounded-md border-slate-600">Account nr</th>
            <th className="border rounded-md border-slate-600">Account name</th>
            <th className="border rounded-md border-slate-600">IBAN</th>
            <th className="border rounded-md border-slate-600">Type</th>
            <th className="border rounded-md border-slate-600">Amount</th>
            <th className="border rounded-md border-slate-600">Address</th>
            <th className="border rounded-md border-slate-600">Created At</th>
          </tr>
        </thead>
        <tbody>
          <AddTransaction mutation={mutation} />

          {isInitialLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            <>
              {(transactions || []).map((transaction) => (
                <tr className="hover:bg-slate-300" key={transaction._id}>
                  <td className="border-b px-2 py-1">{transaction._id}</td>
                  <td className="border-b px-2 py-1">
                    {transaction.account_number}
                  </td>
                  <td className="border-b px-2 py-1">
                    {transaction.account_name}
                  </td>
                  <td className="border-b px-2 py-1">{transaction.iban}</td>
                  <td className="border-b px-2 py-1">{transaction.type}</td>
                  <td className="border-b px-2 py-1">{transaction.amount}</td>
                  <td className="border-b px-2 py-1">{transaction.address}</td>
                  <td className="border-b px-2 py-1">
                    {transaction.created_at}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="flex flex-col m-auto">
        <Button
          size="sm"
          disabled={isLoading || !hasNextPage}
          onClick={() => fetchNextPage({ pageParam: next })}
        >
          Load more
        </Button>
        <span className="text-[0.5rem]">
          (db wont load based off SQL CURSOR...)
        </span>
      </div>
    </>
  );
};
