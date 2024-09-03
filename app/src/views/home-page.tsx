import { TransactionsTable } from "~/components/transactions-table";

export const HomePage = () => {
  return (
    <div>
      <div className="mt-4 flex flex-wrap">
        <TransactionsTable />
      </div>
    </div>
  );
};
