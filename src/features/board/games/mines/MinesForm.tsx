import { Controller, useForm } from 'react-hook-form';

import styles from './MinesForm.module.scss';
import { GRADIENTS } from '../../../../shared/styles/gradients';
import type { MinesGameData } from '../../../../shared/types/mines';
import Button from '../../../../shared/ui/Button';
import Input from '../../../../shared/ui/Input';

export default function MinesForm() {
  const { control } = useForm<MinesGameData>({
    defaultValues: { amount: '' },
  });
  const miniBtns = [{ label: '10' }, { label: '50' }, { label: '100' }, { label: '500' }];
  const minesBtn = [
    { label: '10' },
    { label: '50' },
    { label: '100' },
    { label: '500' },
    { label: '500' },
  ];
  return (
    <form className={styles.container}>
      <p className={styles.label}>Bet Amount</p>
      <div className={styles.inner}>
        <div className={styles.fieldBox}>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Input
                {...field}
                label={false}
                placeholder="10"
                type="text"
                width="100%"
                value={field.value}
                onChange={() => console.log('bet')}
                background="rgba(15, 23, 43, 0.5)"
                border="1px solid rgba(15, 23, 43, 0.1)"
                padding="8px 12px"
                borderRadius="8px"
                textStyle={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-0.15px',
                  fontWeight: '400',
                }}
                disabled={false}
              />
            )}
          />
        </div>
        <div className={styles.miniBtns}>
          {miniBtns.map((btn) => (
            <Button
              key={btn.label}
              type="button"
              text={`$${btn.label}`}
              height="38px"
              background="rgba(15, 23, 43, 0.5)"
              borderRadius="4px"
              border="1px solid rgba(49, 65, 88, 0.1)"
              disabled={false}
              onClick={() => console.log()}
            />
          ))}
        </div>
      </div>
      <div className={styles.mines}>
        <div className={styles.mines_groupLabels}>
          <p className={styles.mines_text}>Mines:</p>
          <b className={styles.mines_num}>1</b>
        </div>
        <div className={styles.mines_btns}>
          {minesBtn.map((btn) => (
            <Button
              key={btn.label}
              type="button"
              text={btn.label}
              width="46px"
              height="37px"
              background="rgba(15, 23, 43, 0.5)"
              borderRadius="4px"
              border="1px solid rgba(49, 65, 88, 0.1)"
              disabled={false}
              onClick={() => console.log()}
            />
          ))}
        </div>
        <Button
          type="submit"
          border="1px solid rgba(49, 65, 88, 0.1)"
          height="36px"
          background={GRADIENTS.greenToGreen}
          text={'$ Start Game'}
          borderRadius="8px"
          disabled={false}
        />
      </div>
    </form>
  );
}
