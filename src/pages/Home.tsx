import styles from './Home.module.scss';
import BonusSystem from '../features/board/components/BonusSystem';
import Header from '../features/board/components/Header';
import RocketGame from '../features/board/components/RocketGame';
import TabList from '../features/board/components/TabList';

export default function Home() {
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
        </div>
      </main>
    </>
  );
}
