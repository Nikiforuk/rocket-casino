import { Suspense, lazy } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './Board.module.scss';
const BonusSystem = lazy(() => import('../features/board/components/bonus/BonusSystem'));
const Header = lazy(() => import('../features/board/components/layout/Header'));
const Leaderboard = lazy(() => import('../features/board/components/leaderboard/Leaderboard'));
const TabList = lazy(() => import('../features/board/components/tablist/TabList'));
const CasesGame = lazy(() => import('../features/board/games/cases/CasesGame'));
const TruckGame = lazy(() => import('../features/board/games/crash/TruckGame'));
const MinesGame = lazy(() => import('../features/board/games/mines/MinesGame'));
import PlinkoGame from '../features/board/games/plinko/PlinkoGame';
import { useRefreshProfile } from '../features/board/hooks/useRefreshProfile';
import { GameKey, isGameKey } from '../features/board/types/game';
const Modal = lazy(() => import('../features/modal/components/Modal'));
import { useModalStore } from '../features/modal/store/modalStore';

export default function Board() {
  const isModal = useModalStore((state) => state.isOpen);
  useRefreshProfile();
  const [searchParams] = useSearchParams();
  const gameParam = searchParams.get('game');
  const game: GameKey = isGameKey(gameParam) ? gameParam : GameKey.Truck;
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main
        className={`${styles.container} ${
          game === GameKey.Mines
            ? styles.containerMines
            : game === GameKey.Plinko
              ? styles.containerPlinko
              : ''
        }`}
      >
        <div className={styles.content}>
          <Suspense fallback={null}>
            <TabList />
          </Suspense>
          <Suspense fallback={null}>
            {game === GameKey.Cases ? (
              <CasesGame />
            ) : game === GameKey.Mines ? (
              <MinesGame />
            ) : game === GameKey.Truck ? (
              <TruckGame />
            ) : game === GameKey.Plinko ? (
              <PlinkoGame />
            ) : (
              <TruckGame />
            )}
          </Suspense>
        </div>
        <div className={styles.content}>
          <Suspense fallback={null}>
            <BonusSystem />
          </Suspense>
          <Suspense fallback={null}>
            <Leaderboard />
          </Suspense>
        </div>
        {isModal ? (
          <Suspense fallback={null}>
            <Modal />
          </Suspense>
        ) : null}
      </main>
    </>
  );
}
