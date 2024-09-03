import { trpcApiBoilerplateClient } from "clients/trpc-client";

export const HomePage = () => {
  const { data: transcations } =
    trpcApiBoilerplateClient.transactions.list.useQuery({
      limit: 100,
      offset: 0,
    });

  return (
    <div>
      <h3>👤 Users</h3>
      <div className="mt-4 flex flex-wrap">
        {!transcations ? (
          <div>Loading...</div>
        ) : (
          transcations.map((transaction) => (
            <code>{JSON.stringify(transaction)}</code>
          ))
        )}
      </div>
    </div>
  );
};
