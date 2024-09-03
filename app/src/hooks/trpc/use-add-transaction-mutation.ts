import {
  AddTransactionInput,
  TrpcApiBoilerplateClient,
} from "~/clients/trpc-client";

export const useAddTransactionMutation = () => {
  const utils = TrpcApiBoilerplateClient.useUtils();
  const mutation = TrpcApiBoilerplateClient.transactions.add.useMutation({
    onSuccess: async (mutationData) => {
      await utils.transactions.list.cancel();

      utils.transactions.list.setInfiniteData(
        { limit: 10 },
        (data) => {
          if (!data) {
            return {
              pages: [],
              pageParams: [],
            };
          }
          return {
            ...data,
            pages: [
              {
                ...data.pages[0],
                items: [mutationData, ...data.pages[0].items],
              },
              ...data.pages.slice(1),
            ],
          };
        },
        {}
      );
    },
  });

  const handleSubmit = (values: AddTransactionInput) => {
    mutation.mutate(values);
  };
  return { ...mutation, handleSubmit };
};
