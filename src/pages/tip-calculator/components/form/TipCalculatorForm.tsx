import { useEffect } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import ButtonSelect from '@/components/ui/ButtonSelect';
import FloatInput from '@/components/ui/FloatInput';
import IntegerInput from '@/components/ui/IntegerInput';

import { cn } from '@/utils/utils';

import styles from './TipCalculatorForm.module.css';

interface TipCalculatorFormSchema {
  bill: number;
  tipPercent: number;
  tipAmount: number;
  numPeople: number;
  total: number;
}

const defaultValues: TipCalculatorFormSchema = {
  bill: 0,
  tipPercent: 0,
  tipAmount: 0,
  numPeople: 0,
  total: 0
};

const tipOptions = [
  { label: '5%', value: 5 },
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
  { label: '25%', value: 25 },
  { label: '50%', value: 50 }
];

const TipCalculatorForm = () => {
  const form = useForm<TipCalculatorFormSchema>({
    defaultValues: defaultValues,
    mode: 'onBlur'
  });

  const bill = form.watch('bill');
  const tipPercent = form.watch('tipPercent');
  const numPeople = form.watch('numPeople');
  const tipAmount = form.watch('tipAmount');
  const total = form.watch('total');

  const billValidation = {
    valueAsNumber: true,
    required: 'Bill cannot be empty',
    validate: (value: number) => value !== 0 || 'Bill cannot be 0'
  };

  const numPeopleValidation = {
    valueAsNumber: true,
    required: 'Cannot be empty',
    validate: (value: number) => value !== 0 || "Can't be zero"
  };

  const onSubmit = (data: TipCalculatorFormSchema) => {
    console.log(data);
  };

  const onReset = () => {
    form.reset(defaultValues);
  };

  useEffect(() => {
    form.setValue(
      'tipAmount',
      numPeople ? (bill / numPeople) * (tipPercent / 100) : 0
    );
    form.setValue(
      'total',
      numPeople ? bill / numPeople + (bill / numPeople) * (tipPercent / 100) : 0
    );
  }, [bill, tipPercent, numPeople, form]);

  console.log(form.formState.isDirty);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 md:gap-6"
      >
        <div className={cn(styles.wrapper, 'py-4')}>
          <FloatInput<TipCalculatorFormSchema>
            name="bill"
            icon={
              <span className="h-3.5 w-3.5 bg-[url('@/assets/icon-dollar.svg')] bg-contain bg-center bg-no-repeat"></span>
            }
            className={cn(
              'focus-within:outline-primary focus-within:outline-2',
              form.formState.errors.bill && styles.shake,
              form.formState.errors.bill &&
                'focus-within:outline-error outline-error outline-2'
            )}
            inputClassName={styles['no-spinner-input']}
            label="Bill"
            register={form.register}
            defaultValue={bill}
            options={billValidation}
            setValue={form.setValue}
            max={100}
            error={form.formState.errors.bill?.message}
          />
          <ButtonSelect<TipCalculatorFormSchema>
            name="tipPercent"
            label="Select Tip %"
            buttonOptions={tipOptions}
            enableCustomValue
          />
          <IntegerInput<TipCalculatorFormSchema>
            name="numPeople"
            icon={
              <span className="h-3.5 w-3.5 bg-[url('@/assets/icon-person.svg')] bg-contain bg-center bg-no-repeat"></span>
            }
            className={cn(
              'focus-within:outline-primary focus-within:outline-2',
              form.formState.errors.numPeople && styles.shake,
              form.formState.errors.numPeople &&
                'focus-within:outline-error outline-error outline-2'
            )}
            inputClassName={styles['no-spinner-input']}
            label="Number of People"
            register={form.register}
            defaultValue={numPeople}
            options={numPeopleValidation}
            setValue={form.setValue}
            error={form.formState.errors.numPeople?.message}
          />
        </div>
        <div className={cn(styles.wrapper, 'bg-secondary rounded-lg p-6')}>
          <div className="flex justify-between">
            <div>
              <p className="text-grey-50 text-xs">Tip Amount</p>
              <p className="text-grey-400 text-[0.6rem]">/ person</p>
            </div>
            <p className="text-primary self-center text-3xl">
              ${tipAmount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-grey-50 text-xs">Total</p>
              <p className="text-grey-400 text-[0.6rem]">/ person</p>
            </div>
            <p className="text-primary self-center text-3xl">
              ${total.toFixed(2)}
            </p>
          </div>
          <button
            className={cn(
              'text-secondary mt-auto rounded-sm bg-green-400 py-2',
              'hover:cursor-pointer hover:bg-green-200',
              'disabled:bg-disabled disabled:font-color-disabled disabled:cursor-auto'
            )}
            type="reset"
            onClick={() => onReset()}
            disabled={!form.formState.isDirty}
          >
            RESET
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TipCalculatorForm;
