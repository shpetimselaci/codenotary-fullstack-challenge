import { Input } from "~/shell/input";
import { Controller } from "react-hook-form";
import { useAddTransactionForm } from "~/hooks/validations/use-add-transaction";
import { Button } from "../button";

export const AddTransactionForm = ({
  isLoading,
  onSubmit,
  control,
}: Pick<ReturnType<typeof useAddTransactionForm>, "control"> & {
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  return (
    <tr className="h-20 mb-auto">
      <td className="border-b pl-1 pr-0.5">
        <Button size="sm" disabled={isLoading} onClick={onSubmit}>
          Add Transaction
        </Button>
      </td>
      <td className="border-b p-0.5">
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Account nr"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="account_number"
        />
      </td>

      <td className="border-b p-0.5">
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Account name"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
            />
          )}
          name="account_name"
        />
      </td>
      <td className="border-b p-0.5">
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="IBAN"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
            />
          )}
          name="iban"
        />
      </td>

      <td className="border-b p-0.5">
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Type"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
            />
          )}
          name="type"
        />
      </td>
      <td className="border-b p-0.5">
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Amount"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
            />
          )}
          name="amount"
        />
      </td>
      <td className="border-b p-0.5">
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              placeholder="Address"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
            />
          )}
          name="address"
        />
      </td>
      <td className="border-b pl-0.5 pr-1">
        <Input placeholder="Autogenerated" disabled />
      </td>
    </tr>
  );
};
