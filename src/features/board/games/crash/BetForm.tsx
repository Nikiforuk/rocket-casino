import type { ChangeEvent } from 'react';

import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';

import styles from './TruckGame.module.scss';
import { quickBtns } from '../../../../shared/constants/truck';
import { GRADIENTS } from '../../../../shared/styles/gradients';
import { EGameState, type TruckGameData } from '../../../../shared/types/truck';
import Button from '../../../../shared/ui/Button';
import Input from '../../../../shared/ui/Input';
import { useBoardStore } from '../../boardStore';

interface BetFormProps {
  gameState: EGameState;
  isBetting: boolean;
  isCashOutActive: boolean;
  buttonText: string;
  onSubmit: (amount: number) => Promise<boolean>;
  onReset: () => void;
}

export default function BetForm({
  gameState,
  isBetting,
  isCashOutActive,
  buttonText,
  onSubmit,
  onReset,
}: BetFormProps) {
  const { balance } = useBoardStore();
  const { control, handleSubmit, setValue } = useForm<TruckGameData>({
    defaultValues: { amount: '' },
  });

  const handleFormSubmit = async (data: TruckGameData) => {
    if (gameState === EGameState.Crashed || gameState === EGameState.Escaped) {
      onReset();
      return;
    }

    if (gameState === EGameState.Moving || gameState === EGameState.Accelerating) {
      await onSubmit(0);
      return;
    }

    await onSubmit(Number(data.amount));
  };

  const handleFormSubmitWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(handleFormSubmit)();
  };

  const handleReplaceSymbols = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TruckGameData, 'amount'>,
  ) => {
    let val = e.target.value.replace(/\D+/g, '');

    val = val.replace(/^0+(?=\d)/, '');

    field.onChange(val);
  };

  const handleQuickButton = (value: number | 'max') => {
    if (value === 'max') {
      setValue('amount', String(Math.floor(balance)));
    } else {
      setValue('amount', String(value));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmitWrapper}>
      <p className={styles.form_text}>Bet Amount</p>
      <div className={styles.form_box}>
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Your bet"
              type="text"
              value={field.value}
              onChange={(e) => handleReplaceSymbols(e, field)}
              background="rgba(15, 23, 43, 0.3)"
              border="1px solid rgba(15, 23, 43, 0.1)"
              padding="8px 12px"
              borderRadius="8px"
              textStyle={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.15px',
                fontWeight: '400',
              }}
              disabled={gameState !== EGameState.Idle}
            />
          )}
        />
        <div className={`${styles.form_start} ${isCashOutActive ? styles.form_start_glow : ''}`}>
          <Button
            type="submit"
            border="1px solid rgba(49, 65, 88, 0.1)"
            height="36px"
            background={isCashOutActive ? GRADIENTS.greenToGreen : 'rgba(15, 23, 43, 0.5)'}
            text={buttonText}
            borderRadius="8px"
            disabled={isBetting && gameState === EGameState.Idle}
          />
        </div>
      </div>
      <div className={styles.form_groupButtons}>
        {quickBtns.map((btn) => (
          <Button
            key={btn.label}
            type="button"
            text={`${btn.label}`}
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            borderRadius="4px"
            border="1px solid rgba(49, 65, 88, 0.1)"
            disabled={gameState !== EGameState.Idle}
            onClick={() => handleQuickButton(btn.value)}
          />
        ))}
      </div>
    </form>
  );
}
