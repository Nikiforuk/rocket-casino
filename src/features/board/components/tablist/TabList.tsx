import { useSearchParams } from 'react-router-dom';

import styles from './TabList.module.scss';
import caseImg from '../../../../assets/images/case-tab.png';
import mineImg from '../../../../assets/images/mine.png';
import plinkoImg from '../../../../assets/images/plinko.png';
import turboTruckImg from '../../../../assets/images/turbo-truck.png';
import TabButton from '../../../../ui/TabButton';
import { useBoardStore } from '../../store/boardStore';
import { GameKey } from '../../types/game';

export default function TabList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const uiLocked = useBoardStore((state) => state.uiLocked);
  const setGame = (game: GameKey) => {
    const next = new URLSearchParams(searchParams);
    next.set('game', game);
    setSearchParams(next);
  };
  return (
    <div className={styles.container}>
      <TabButton
        icon={turboTruckImg}
        text="Crash"
        onClick={() => setGame(GameKey.Truck)}
        active={(searchParams.get('game') || GameKey.Truck) === GameKey.Truck}
        disabled={uiLocked}
      />
      <TabButton
        icon={caseImg}
        text="Cases"
        onClick={() => setGame(GameKey.Cases)}
        active={searchParams.get('game') === GameKey.Cases}
        disabled={uiLocked}
      />
      <TabButton
        icon={mineImg}
        text="Mines"
        onClick={() => setGame(GameKey.Mines)}
        active={searchParams.get('game') === GameKey.Mines}
        disabled={uiLocked}
      />
      <TabButton
        icon={plinkoImg}
        text="Plinko"
        onClick={() => setGame(GameKey.Plinko)}
        active={searchParams.get('game') === GameKey.Plinko}
        disabled={uiLocked}
      />
    </div>
  );
}
