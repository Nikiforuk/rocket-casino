import styles from './Home.module.scss';
import Header from '../features/board/components/Header';
import RocketGame from '../features/board/components/RocketGame';
import TabList from '../features/board/components/TabList';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <TabList />
        <RocketGame />
      </main>
    </>
  );
}
