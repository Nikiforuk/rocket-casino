import styles from './Board.module.scss';
import { useBoardStore } from '../features/board/boardStore';
import CasesGame from '../features/board/components/CasesGame';
import Header from '../features/board/components/Header';
import TabList from '../features/board/components/TabList';
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
          <CasesGame />
        </div>
        {/* <div className={styles.content}>
          <BonusSystem />
          <Leaderboard />
        </div> */}
        {isModal ? <Modal /> : null}
      </main>
    </>
  );
}
