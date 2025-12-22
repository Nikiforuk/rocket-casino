import styles from './PlinkoLaunch.module.scss';
import { GRADIENTS } from '../../../../styles/gradients';
import Button from '../../../../ui/Button';

interface Props {
  onDrop: () => void;
  onReset: () => void;
  disabledDrop?: boolean;
  controlsLocked?: boolean;
  ballsCount: number;
  setBalls: (c: number) => void;
  risk: 'Low' | 'Medium' | 'High';
  increaseRisk: () => void;
  decreaseRisk: () => void;
  lines: number;
  setLines: (l: number) => void;
  bet: number;
}

export default function PlinkoLaunch({
  onDrop,
  onReset,
  disabledDrop,
  controlsLocked,
  ballsCount,
  setBalls,
  risk,
  increaseRisk,
  decreaseRisk,
  lines,
  setLines,
  bet,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.panelTitle}>BALLS</div>
        <div className={styles.grid}>
          {[1, 2, 5, 10].map((c) => (
            <button
              key={c}
              className={`${styles.gridItem} ${ballsCount === c ? styles.active : ''}`}
              type="button"
              onClick={() => setBalls(c)}
              disabled={controlsLocked}
            >
              <div className={styles.gridItem_primary}>{c}</div>
              <div className={styles.gridItem_secondary}>{`$${(bet * c).toFixed(2)}`}</div>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.panelTitle}>LINES</div>
        <div className={styles.grid}>
          {[8, 9, 10, 11, 12, 13, 14, 15, 16].map((l) => (
            <button
              key={l}
              className={`${styles.gridItem} ${lines === l ? styles.active : ''}`}
              type="button"
              onClick={() => setLines(l)}
              disabled={controlsLocked}
            >
              <div className={styles.gridItem_primary}>{l}</div>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.panelTitle}>RISK</div>
        <div className={styles.row}>
          <Button
            type="button"
            width="100px"
            border="none"
            borderRadius="6px"
            height="30px"
            background={GRADIENTS.casesCommon}
            text="-"
            onClick={decreaseRisk}
            disabled={controlsLocked}
          />
          <div className={styles.value}>{risk}</div>
          <Button
            type="button"
            width="100px"
            border="none"
            borderRadius="6px"
            height="30px"
            background={GRADIENTS.casesCommon}
            text="+"
            onClick={increaseRisk}
            disabled={controlsLocked}
          />
        </div>
      </div>
      <Button
        border="1px solid rgba(49, 65, 88, 0.1)"
        type="button"
        height="44px"
        background={GRADIENTS.casesGold}
        borderRadius="8px"
        text={`Drop ${ballsCount} Ball${ballsCount > 1 ? 's' : ''} ($${(bet * ballsCount).toFixed(2)})`}
        textStyle={{ color: 'black' }}
        onClick={onDrop}
        disabled={disabledDrop}
      />
      <Button
        border="1px solid rgba(49, 65, 88, 0.2)"
        type="button"
        height="44px"
        background={GRADIENTS.casesCommon}
        text="Reset balance"
        borderRadius="8px"
        onClick={onReset}
      />
    </div>
  );
}
