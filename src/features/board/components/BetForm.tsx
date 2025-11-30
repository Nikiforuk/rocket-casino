import { Controller, useForm } from 'react-hook-form';

import styles from './TruckGame.module.scss';
import { GRADIENTS } from '../../../shared/styles/gradients';
import type { TruckGameData } from '../../../shared/types/board';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import { useAuthStore } from '../../auth/authStore';
import { useBoardStore } from '../boardStore';

type GameState = 'idle' | 'accelerating' | 'moving' | 'crashed' | 'escaped';

interface BetFormProps {
  gameState: GameState;
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
  const { session } = useAuthStore();
  const { balance } = useBoardStore();
  const { control, handleSubmit, setValue } = useForm<TruckGameData>({
    defaultValues: { amount: '' },
  });

  const handleFormSubmit = async (data: TruckGameData) => {
    if (gameState === 'crashed' || gameState === 'escaped') {
      onReset();
      return;
    }

    if (gameState === 'moving' || gameState === 'accelerating') {
      await onSubmit(0);
      return;
    }

    const amount = Number(data.amount);
    await onSubmit(amount);
  };

  const handleFormSubmitWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(handleFormSubmit)();
    console.log(session);
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
              onChange={(e) => {
                let val = e.target.value.replace(/^0+(?=\d)/, '');
                field.onChange(val);
              }}
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
              disabled={gameState !== 'idle'}
            />
          )}
        />
        <div className={`${styles.form_start} ${isCashOutActive ? styles.form_start_glow : ''}`}>
          <Button
            type="submit"
            border="1px solid rgba(49, 65, 88, 0.1)"
            height="36px"
            background={isCashOutActive ? GRADIENTS.greenToGreen : 'rgba(193, 193, 193, 1)'}
            text={buttonText}
            borderRadius="8px"
            disabled={isBetting && gameState === 'idle'}
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: isCashOutActive ? 'white' : undefined,
            }}
          />
        </div>
      </div>
      <div className={styles.form_groupButtons}>
        {[10, 50, 100, 500].map((v) => (
          <Button
            key={v}
            type="button"
            text={`$${v}`}
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            borderRadius="4px"
            border="1px solid rgba(49, 65, 88, 0.1)"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
            onClick={() => setValue('amount', String(v))}
            disabled={gameState !== 'idle'}
          />
        ))}
        <Button
          type="button"
          text="Max"
          height="36px"
          background="rgba(15, 23, 43, 0.2)"
          borderRadius="4px"
          border="1px solid rgba(49, 65, 88, 0.1)"
          textStyle={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.15px',
            fontWeight: 500,
            color: '#90A1B9',
          }}
          onClick={() => setValue('amount', String(Math.floor(balance)))}
          disabled={gameState !== 'idle'}
        />
      </div>
    </form>
  );
}
