import {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions
} from 'react-hook-form';

import { cn } from '@/utils/utils';

// type InputProps<T extends FieldValues> = {
//   name: Path<T>;
//   type: React.InputHTMLAttributes<HTMLInputElement>['type'];
//   label?: string;
//   register: UseFormRegister<T>;
//   options?: RegisterOptions<T, Path<T>> | undefined;
//   value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
//   onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
//   error?: string;
// };

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  inputClassName?: string | undefined;
  icon?: React.ReactNode;
  label?: string;
  options?: RegisterOptions<T, Path<T>> | undefined;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  className,
  inputClassName,
  name,
  register,
  icon,
  label,
  options,
  value,
  onChange,
  error,
  type,
  ...props
}: InputProps<T>) => {
  return (
    <div className="flex flex-col gap-2 text-lg">
      {label && (
        <div className="flex justify-between text-xs">
          <label htmlFor={name} className="text-grey-500">
            {label}
          </label>
          {error && <span className="text-error">{error}</span>}
        </div>
      )}
      <div
        className={cn(
          'bg-background m-0 flex items-center rounded-sm px-3 py-1',
          className
        )}
      >
        {icon}
        <input
          className={cn(
            'grow text-end hover:cursor-pointer focus:outline-none',
            inputClassName
          )}
          id={name}
          type={type}
          {...register(name, options)}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;

export type { InputProps };
