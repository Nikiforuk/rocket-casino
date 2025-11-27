import styles from './RocketGame.module.scss';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';

export default function RocketGame() {
  return (
    <div className={styles.container}>
      <div className={styles.screen} />
      <form className={styles.form}>
        <p className={styles.form_text}>Bet Amount</p>
        <div className={styles.form_box}>
          <Input
            placeholder="10"
            type="text"
            name="rocket-game"
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
          />
          <div className={styles.form_start}>
            <Button
              border="1px solid rgba(49, 65, 88, 0.1)"
              type="button"
              height="36px"
              background="rgba(193, 193, 193, 1)"
              text="Start"
              borderRadius="8px"
              textStyle={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.15px',
                fontWeight: 500,
              }}
            />
          </div>
        </div>
        <div className={styles.form_groupButtons}>
          <Button
            border="1px solid rgba(49, 65, 88, 0.1)"
            type="button"
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            text="$10"
            borderRadius="4px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
          />
          <Button
            border="1px solid rgba(49, 65, 88, 0.1)"
            type="button"
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            text="$50"
            borderRadius="4px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
          />
          <Button
            border="1px solid rgba(49, 65, 88, 0.1)"
            type="button"
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            text="$100"
            borderRadius="4px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
          />
          <Button
            border="1px solid rgba(49, 65, 88, 0.1)"
            type="button"
            height="36px"
            background="rgba(15, 23, 43, 0.2)"
            text="$500"
            borderRadius="4px"
            textStyle={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.15px',
              fontWeight: 500,
              color: '#90A1B9',
            }}
          />
        </div>
      </form>
    </div>
  );
}
