import styles from './Board.module.scss';
import { useBoardStore } from '../features/board/boardStore';
import BonusSystem from '../features/board/components/BonusSystem';
import Header from '../features/board/components/Header';
import Leaderboard from '../features/board/components/Leaderboard';
import TabList from '../features/board/components/TabList';
import TruckGame from '../features/board/components/TruckGame';
import { useRefreshProfile } from '../features/board/hooks/useRefreshProfile';
import Modal from '../features/modal/components/Modal';

export default function Board() {
  const { isModal } = useBoardStore();
  useRefreshProfile();
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <TabList />
          <TruckGame />
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
