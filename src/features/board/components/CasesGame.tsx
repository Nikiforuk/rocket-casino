import CaseItem from './CaseItem';
import CasesScreen from './CasesScreen';
import caseIcon from '../../../assets/icons/box.svg';
import { cases, emojis, rarityGuide } from '../../../shared/constants/cases';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import CaseButton from '../../../shared/ui/CaseButton';
import { useCaseReel } from '../hooks/useCaseReel';
import styles from '../styles/CasesItems.module.scss';
import layout from '../styles/CasesLayout.module.scss';
import guideStyles from '../styles/CasesRarityGuide.module.scss';
import resultStyles from '../styles/CasesResult.module.scss';
import { getCaseTypeByName } from '../utils/caseHelpers';

export default function CasesGame() {
  const {
    reelRef,
    trackRef,
    activeCase,
    iCase,
    isSpinning,
    trackOffset,
    winningItem,
    showSplash,
    reelItems,
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
      {winningItem && (
        <div className={`${resultStyles.result} ${resultStyles[`result_${winningItem.rarity}`]}`}>
          <div className={resultStyles.result_card}>
            <p className={resultStyles.result_title}>You won</p>
            <div className={`${styles.itemBox} ${styles[`rarity_${winningItem.rarity}`]}`}>
              <span className={styles.itemEmoji}>{winningItem.emoji}</span>
              <span className={styles.itemLabel}>{winningItem.name}</span>
              <span className={styles.itemLabel}>{winningItem.price}</span>
            </div>
          </div>
        </div>
      )}
      <div className={layout.openBlock}>
        <Button
          icon={caseIcon}
          border="none"
          background={isSpinning ? GRADIENTS.casesCommon : GRADIENTS.greenToGreen}
          height="36px"
          borderRadius="8px"
          text={isSpinning ? 'Opening...' : `Open ${activeCase.name} - ${activeCase.price}`}
          onClick={handleOpen}
          disabled={isSpinning}
        />
      </div>
      <div className={layout.emojis}>
        <h3 className={layout.emojis_title}>Case Contents</h3>
        <div className={layout.emojis_items}>
          <div className={layout.emojis_items}>
            {emojis
              .filter((item) => item.caseType === getCaseTypeByName(activeCase.name))
              .map((item) => (
                <CaseItem
                  key={item.id}
                  id={item.id}
                  emoji={item.emoji}
                  rarity={item.rarity}
                  caseType={item.caseType}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={guideStyles.rarityGuide}>
        <div>
          <h4 className={guideStyles.rarityGuide_title}>Rarity Guide</h4>
        </div>
        <div className={guideStyles.rarityGuide_net}>
          {rarityGuide.map((item) => (
            <div key={item.id} className={guideStyles.rarityGuide_column}>
              <div
                style={{ background: item.circleColor }}
                className={guideStyles.rarityGuide_column_circle}
              />
              <p className={guideStyles.rarityGuide_column_text}>{item.text}</p>
              <p className={guideStyles.rarityGuide_column_percents}>{item.percents}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
