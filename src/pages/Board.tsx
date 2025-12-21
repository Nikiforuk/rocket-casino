import { useSearchParams } from 'react-router-dom';

import styles from './Board.module.scss';
import { useBoardStore } from '../features/board/boardStore';
import BonusSystem from '../features/board/components/bonus/BonusSystem';
import Header from '../features/board/components/layout/Header';
import Leaderboard from '../features/board/components/leaderboard/Leaderboard';
import TabList from '../features/board/components/tablist/TabList';
import CasesGame from '../features/board/games/cases/CasesGame';
import TruckGame from '../features/board/games/crash/TruckGame';
import MinesGame from '../features/board/games/mines/MinesGame';
import { useRefreshProfile } from '../features/board/hooks/useRefreshProfile';
import Modal from '../features/modal/components/Modal';

export default function Board() {
  const { isModal } = useBoardStore();
  useRefreshProfile();
  const [searchParams] = useSearchParams();
  const game = searchParams.get('game') || 'truck' || 'mines';
  return (
    <>
      <Header />
      <main className={`${styles.container} ${game === 'mines' ? styles.containerMines : ''}`}>
        <div className={styles.content}>
          <TabList />
          {game === 'cases' ? (
            <CasesGame />
          ) : game === 'mines' ? (
            <MinesGame />
          ) : game === 'truck' ? (
            <TruckGame />
          ) : (
            <TruckGame />
          )}
        </div>
        <div className={styles.content}>
          <BonusSystem />
          <Leaderboard />
        </div>
        {isModal ? <Modal /> : null}
      </main>
    </>
  );
}
