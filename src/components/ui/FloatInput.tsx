import { FieldValues, PathValue, UseFormSetValue } from 'react-hook-form';
import Input, { InputProps } from './Input';

import { cn } from '@/utils/utils';

type FloatInputProps<T extends FieldValues> = Omit<InputProps<T>, 'type'> & {
  setValue: UseFormSetValue<T>;
};

const FloatInput = <T extends FieldValues>({
  className,
  name,
  label,
  register,
  setValue,
  options,
  error,
  ...props
}: FloatInputProps<T>) => {
  const onBlurHandler = (inputVal: string) => {
    inputVal = inputVal ? inputVal : '0';
    const numWithDecimal = Math.round(parseFloat(inputVal) * 100) / 100;
    setValue(name, numWithDecimal as PathValue<T, typeof name>, {
      shouldDirty: true
    });
  };

  const { onBlur } = register(name, options);

  return (
    <Input<T>
      className={cn('', className)}
      name={name}
      type="number"
      label={label}
      register={register}
      options={options}
      onBlur={(e) => {
        onBlurHandler(e.target.value);
        onBlur(e);
      }}
      error={error}
      step="0.01"
      {...props}
    />
  );
};

export default FloatInput;
