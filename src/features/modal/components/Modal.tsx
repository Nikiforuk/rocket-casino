import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import styles from './Modal.module.scss';
import crossIcon from '../../../assets/icons/cross.svg';
import { GRADIENTS } from '../../../styles/gradients';
import type { ModalData } from '../types/modal';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { useAuthStore } from '../../auth/store/authStore';
import { useBoardStore } from '../../board/store/boardStore';
import { useNewUsername } from '../../board/hooks/useNewUsername';
import { useRefreshProfile } from '../../board/hooks/useRefreshProfile';
import { formatNumber } from '../../board/utils/numberHelpers';
import { useResetProfile } from '../hooks/useResetProfile';
import { modalSchema } from '../schemas/modalSchema';

export default function Modal() {
  const [isClosing, setIsClosing] = useState(false);
  const { handleReset } = useResetProfile();
  const username = useAuthStore((state) => state.getUsername());
  const { handleNewUsername, isLoading, errorMessage } = useNewUsername();
  const { balance, gamesPlayed, totalWagered, totalWon, setIsModal } = useBoardStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalData>({
    resolver: zodResolver(modalSchema),
    defaultValues: { username: '' },
  });

  const onSubmit = async (data: ModalData) => {
    await handleNewUsername(data.username);
  };

  const handleClick = async () => {
    await handleReset();
  };

  useRefreshProfile();

  const userStats = [
    { firstText: 'Balance', secondText: formatNumber(balance) },
    { firstText: 'Games Played', secondText: gamesPlayed },
    { firstText: 'Total Wagered', secondText: formatNumber(totalWagered) },
    { firstText: 'Total Won', secondText: formatNumber(totalWon) },
  ];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsModal(false), 240);
  };

  return (
    <div
      onClick={handleClose}
      className={`${styles.overlay} ${isClosing ? styles.overlay_closing : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.container} ${isClosing ? styles.container_closing : ''}`}
      >
        <button onClick={handleClose} className={styles.closeBtn}>
          <img src={crossIcon} className={styles.closeBtn_icon} alt="cross-icon" />
        </button>
        <div className={styles.top}>
          <h6 className={styles.top_title}>Profile Settings</h6>
          <p className={styles.top_subtitle}>Customize your profile and manage your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={true}
                labelText="Username"
                placeholder={`Your name: ${username}`}
                type="text"
                background="#1D293D"
                border="1px solid #314158"
                padding="9.5px 12px"
                borderRadius="8px"
                textStyle={{
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '-0.15px',
                  fontWeight: '400',
                }}
              />
            )}
          />
          {errors.username && <p className={styles.errorBlock_text}>{errors.username.message}</p>}
          {errorMessage && <p className={styles.errorBlock_text}>{errorMessage}</p>}
          <div className={styles.infoBlock}>
            <p className={styles.infoBlock_text}>4/20</p>
            <p className={styles.infoBlock_text}>characters</p>
            <div className={styles.stats}>
              <h4 className={styles.stats_title}>Account Stats</h4>
              <div className={styles.row}>
                {userStats.map((item) => (
                  <div key={item.firstText} className={styles.row_column}>
                    <p className={styles.row_column_firstText}>{item.firstText}</p>
                    <p className={styles.row_column_secondText}>{item.secondText}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.groupButtons}>
            <Button
              text="Save Changes"
              border="none"
              borderRadius="8px"
              height="36px"
              background={GRADIENTS.blueToPurple}
              type="submit"
              disabled={isLoading}
            />
            <Button
              text="Reset Account"
              border="none"
              borderRadius="8px"
              height="36px"
              background="#D4183D"
              type="button"
              onClick={handleClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
