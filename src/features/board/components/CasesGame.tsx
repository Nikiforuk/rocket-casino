import CaseItem from './CaseItem';
import CasesScreen from './CasesScreen';
import { cases } from '../../../shared/constants/cases';
import { emojis } from '../../../shared/constants/emojis';
import { rarityGuide } from '../../../shared/constants/rarityGuide';
import { GRADIENTS } from '../../../shared/styles/gradients';
import Button from '../../../shared/ui/Button';
import CaseButton from '../../../shared/ui/CaseButton';
import styles from '../components/CasesGame.module.scss';

export default function CasesGame() {
  const handleClick = () => {};

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Select a Case</h3>
      <div className={styles.groupButtons}>
        {cases.map((item) => (
          <CaseButton
            onClick={handleClick}
            key={item.id}
            icon={item.icon}
            text={item.name}
            price={item.price}
          />
        ))}
      </div>
      <CasesScreen />
      <div className={styles.openBlock}>
        <Button
          border="none"
          background={GRADIENTS.greenToDarkGreen}
          height="48px"
          borderRadius="8px"
          icon={'case'}
          text="Open Animal Case - $50"
        />
      </div>
      <div className={styles.emojis}>
        <h3 className={styles.emojis_title}>Case Contents</h3>
        <div className={styles.emojis_items}>
          {emojis.map((item) => (
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
