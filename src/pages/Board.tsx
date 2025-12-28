import { Suspense, lazy } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './Board.module.scss';
import { useRefreshProfile } from '../features/board/hooks/useRefreshProfile';
import CasinoLoader from '../features/board/loaders/CasinoLoader';
import { GameKey, isGameKey } from '../features/board/types/game';
import { useModalStore } from '../features/modal/store/modalStore';

const BonusSystem = lazy(() => import('../features/board/components/bonus/BonusSystem'));
const Header = lazy(() => import('../features/board/components/layout/Header'));
const Leaderboard = lazy(() => import('../features/board/components/leaderboard/Leaderboard'));
const TabList = lazy(() => import('../features/board/components/tablist/TabList'));
const CasesGame = lazy(() => import('../features/board/games/cases/CasesGame'));
const TruckGame = lazy(() => import('../features/board/games/crash/TruckGame'));
const MinesGame = lazy(() => import('../features/board/games/mines/MinesGame'));
const PlinkoGame = lazy(() => import('../features/board/games/plinko/PlinkoGame'));
const Modal = lazy(() => import('../features/modal/components/Modal'));

function GameContent({ game }: { game: GameKey }) {
  switch (game) {
    case GameKey.Cases:
      return <CasesGame />;
    case GameKey.Mines:
      return <MinesGame />;
    case GameKey.Plinko:
      return <PlinkoGame />;
    case GameKey.Truck:
    default:
      return <TruckGame />;
  }
}

export default function Board() {
  const isModal = useModalStore((state) => state.isOpen);
  useRefreshProfile();
  const [searchParams] = useSearchParams();
  const gameParam = searchParams.get('game');
  const game: GameKey = isGameKey(gameParam) ? gameParam : GameKey.Truck;

  const isMines = game === GameKey.Mines;
  const isPlinko = game === GameKey.Plinko;

  const gameContainerStyle = isMines
    ? styles.containerMines
    : isPlinko
      ? styles.containerPlinko
      : '';

  const containerClass = `${styles.container} ${gameContainerStyle}`;

  return (
    <>
      <Suspense fallback={<CasinoLoader variant="header" />}>
        <Header />
      </Suspense>
      <main className={containerClass}>
        <div className={styles.content}>
          <Suspense fallback={<CasinoLoader variant="tabList" />}>
            <TabList />
          </Suspense>
          <Suspense fallback={<CasinoLoader variant="game" />}>
            <GameContent game={game} />
          </Suspense>
        </div>
        <div className={styles.content}>
          <Suspense fallback={<CasinoLoader variant="bonus" />}>
            <BonusSystem />
          </Suspense>

          <Suspense fallback={<CasinoLoader variant="leaderboard" />}>
            <Leaderboard />
          </Suspense>
        </div>
        {isModal && (
          <Suspense fallback={<CasinoLoader variant="modal" />}>
            <Modal />
          </Suspense>
        )}
      </main>
    </>
  );
}
