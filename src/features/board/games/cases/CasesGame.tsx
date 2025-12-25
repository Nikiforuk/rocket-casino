import CaseButton from './CaseButton';
import CasesEmogies from './CasesEmogies';
import layout from './CasesGame.module.scss';
import CasesOpenBlock from './CasesOpenBlock';
import CasesRarityGuide from './CasesRarityGuide';
import CasesResult from './CasesResult';
import CasesScreen from './CasesScreen';
import { cases } from './constants/cases';
import { useCaseReel } from './hooks/useCaseReel';

export default function CasesGame() {
  const {
    reelRef,
    trackRef,
    activeCase,
    iCase,
    isSpinning,
    trackOffset,
    showSplash,
    reelItems,
    winningItem,
    handleSelectCase,
    handleOpen,
  } = useCaseReel();

  return (
    <div className={layout.container}>
      <h3 className={layout.title}>Select a Case</h3>
      <div className={layout.groupButtons}>
        {cases.map((item, idx) => (
          <CaseButton
            onClick={() => handleSelectCase(idx)}
            key={item.id}
            icon={item.icon}
            text={item.name}
            price={item.price}
            active={idx === iCase}
            disabled={isSpinning}
          />
        ))}
      </div>
      <CasesScreen
        showSplash={showSplash}
        items={reelItems}
        offset={trackOffset}
        reelRef={reelRef}
        trackRef={trackRef}
      />
      <CasesEmogies activeCase={activeCase} />
      <CasesOpenBlock isSpinning={isSpinning} activeCase={activeCase} onOpen={handleOpen} />
      <CasesResult winningItem={winningItem} />
      <CasesRarityGuide />
    </div>
  );
}
