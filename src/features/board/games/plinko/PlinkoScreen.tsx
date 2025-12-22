import type { RefObject } from 'react';

import styles from './PlinkoScreen.module.scss';

interface Props {
  winnings: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function PlinkoScreen({ winnings, canvasRef }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Winnings: ${winnings.toFixed(2)}</div>
      <div className={styles.board}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
