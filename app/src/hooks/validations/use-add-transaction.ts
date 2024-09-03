import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddTransactionInput } from "~/clients/trpc-client";
import { addTransactionSchema } from "~/clients/trpc-client/api-types/index.mjs";

export const useAddTransactionForm = ({
  onSubmit,
}: {
  onSubmit: (e: AddTransactionInput) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      account_number: "",
      account_name: "",
      iban: "",
      address: "",
      amount: 0,
      type: "sending" as AddTransactionInput["type"],
    },
  });

  const handleSubmit = form.handleSubmit((e) => {
    onSubmit(e);
    form.reset({
      account_number: "",
      account_name: "",
      iban: "",
      address: "",
      amount: 0,
      type: "sending" as AddTransactionInput["type"],
    });
  });

  return { ...form, onSubmit: handleSubmit };
};
