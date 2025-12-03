import CaseItem from './CaseItem';
import CasesScreen from './CasesScreen';
import { cases } from '../../../shared/constants/cases';
import { emojis } from '../../../shared/constants/emojis';
import { rarityGuide } from '../../../shared/constants/rarityGuide';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import CaseButton from '../../../shared/ui/CaseButton';
import styles from '../components/CasesGame.module.scss';
import { useCasesReel } from '../hooks/useCasesReel';

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
  } = useCasesReel();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select a Case</h3>
      <div className={styles.groupButtons}>
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
        <div className={styles.result}>
          <div className={`${styles.itemBox} ${styles[`rarity_${winningItem.rarity}`]}`}>
            <span className={styles.itemEmoji}>{winningItem.emoji}</span>
            <span className={styles.itemLabel}>{winningItem.name}</span>
            <span className={styles.itemLabel}>{winningItem.price}</span>
          </div>
        </div>
      )}
      <div className={styles.openBlock}>
        <Button
          icon={'case'}
          border="none"
          background={isSpinning ? GRADIENTS.casesCommon : GRADIENTS.greenToGreen}
          height="36px"
          borderRadius="8px"
          text={isSpinning ? 'Opening...' : `Open ${activeCase.name} - ${activeCase.price}`}
          textStyle={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.15px',
          }}
          onClick={handleOpen}
          disabled={isSpinning}
        />
      </div>
      <div className={styles.emojis}>
        <h3 className={styles.emojis_title}>Case Contents</h3>
        <div className={styles.emojis_items}>
          {emojis
            .filter(
              (item) =>
                item.caseType ===
                (activeCase.name.startsWith('Animal')
                  ? 'animal'
                  : activeCase.name.startsWith('Space')
                    ? 'space'
                    : activeCase.name.startsWith('Food')
                      ? 'food'
                      : 'sports'),
            )
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
      <div className={styles.rarityGuide}>
        <div>
          <h4 className={styles.rarityGuide_title}>Rarity Guide</h4>
        </div>
        <div className={styles.rarityGuide_net}>
          {rarityGuide.map((item) => (
            <div key={item.id} className={styles.rarityGuide_column}>
              <div
                style={{ background: item.circleColor }}
                className={styles.rarityGuide_column_circle}
              />
              <p className={styles.rarityGuide_column_text}>{item.text}</p>
              <p className={styles.rarityGuide_column_percents}>{item.percents}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
