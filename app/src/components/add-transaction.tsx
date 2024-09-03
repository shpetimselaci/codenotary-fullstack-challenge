import { useAddTransactionMutation } from "~/hooks/trpc/use-add-transaction-mutation";
import { useAddTransactionForm } from "~/hooks/validations/use-add-transaction";
import { AddTransactionForm } from "~/shell/forms/add-transaction-form";

export const AddTransaction = ({
  mutation,
}: {
  mutation: ReturnType<typeof useAddTransactionMutation>;
}) => {
  const { control, onSubmit } = useAddTransactionForm({
    onSubmit: mutation.handleSubmit,
  });

  return (
    <AddTransactionForm
      control={control}
      onSubmit={onSubmit}
      isLoading={mutation.isLoading}
    />
  );
};
