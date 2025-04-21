import { FieldValues, Path, useFormContext, PathValue } from 'react-hook-form';

import { cn } from '@/utils/utils';

interface ButtonSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  buttonOptions: { label: string; value: T[Path<T>] }[];
  enableCustomValue?: boolean;
  error?: string;
}

const ButtonSelect = <T extends FieldValues>({
  name,
  label,
  buttonOptions,
  enableCustomValue,
  error
}: ButtonSelectProps<T>) => {
  const { register, setValue, watch } = useFormContext<T>();
  const selectedValue = watch(name);

  const handleSelect = (value: string) => {
    if (!value) return;
    setValue(name, value as PathValue<T, typeof name>, { shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-[0.7rem]">
        {label && (
          <label htmlFor={name} className="text-grey-500">
            {label}
          </label>
        )}
        {error && <span>{error}</span>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {buttonOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={cn(
              'bg-secondary text-grey-50 cursor-pointer rounded-sm p-2',
              'hover:bg-green-200 hover:text-green-900',
              'active:bg-green-400 active:text-green-900',
              option.value === selectedValue && 'bg-green-400 text-green-900'
            )}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
        {enableCustomValue && (
          <input
            className={cn(
              'bg-background rounded-sm px-3 py-0.5 text-end hover:cursor-pointer',
              'focus:outline-primary focus:outline-2'
            )}
            placeholder="Custom"
            onBlur={(e) => handleSelect(e.target.value as T[Path<T>])}
          />
        )}
      </div>

      <input type="hidden" {...register(name)} />
    </div>
  );
};

export default ButtonSelect;
