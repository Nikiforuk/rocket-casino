import styles from './Home.module.scss';
import Header from '../features/board/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.container}>Home Page</main>
    </>
  );
}
