import { useSearchParams } from 'react-router-dom';

import styles from './TabList.module.scss';
import caseImg from '../../../assets/images/case-tab.png';
import turboTruckImg from '../../../assets/images/turbo-truck.png';
import TabButton from '../../../shared/ui/TabButton';
import { useBoardStore } from '../boardStore';

export default function TabList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const uiLocked = useBoardStore((s) => s.uiLocked);
  const setGame = (game: 'truck' | 'cases') => {
    const next = new URLSearchParams(searchParams);
    next.set('game', game);
    setSearchParams(next);
  };
  return (
    <div className={styles.container}>
      <TabButton
        icon={turboTruckImg}
        text="Crash"
        onClick={() => setGame('truck')}
        active={(searchParams.get('game') || 'truck') === 'truck'}
        disabled={uiLocked}
      />
      <TabButton
        icon={caseImg}
        text="Cases"
        onClick={() => setGame('cases')}
        active={searchParams.get('game') === 'cases'}
        disabled={uiLocked}
      />
    </div>
  );
}
