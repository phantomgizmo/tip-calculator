import { FieldValues, PathValue, UseFormSetValue } from 'react-hook-form';
import Input, { InputProps } from './Input';

import { cn } from '@/utils/utils';

type IntegerInputProps<T extends FieldValues> = Omit<InputProps<T>, 'type'> & {
  setValue: UseFormSetValue<T>;
};

const IntegerInput = <T extends FieldValues>({
  className,
  name,
  label,
  register,
  setValue,
  options,
  error,
  ...props
}: IntegerInputProps<T>) => {
  const onBlurHandler = (inputVal: string) => {
    inputVal = inputVal ? inputVal : '0';
    const numRounded = Math.round(parseFloat(inputVal));
    setValue(name, numRounded as PathValue<T, typeof name>);
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
      {...props}
    />
  );
};

export default IntegerInput;
