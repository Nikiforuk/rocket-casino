import styles from './Home.module.scss';
import { useBoardStore } from '../features/board/boardStore';
import BonusSystem from '../features/board/components/BonusSystem';
import Header from '../features/board/components/Header';
import Leaderboard from '../features/board/components/Leaderboard';
import RocketGame from '../features/board/components/RocketGame';
import TabList from '../features/board/components/TabList';
import Modal from '../features/modal/components/Modal';

export default function Home() {
  const { isModal } = useBoardStore();
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <TabList />
          <RocketGame />
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
