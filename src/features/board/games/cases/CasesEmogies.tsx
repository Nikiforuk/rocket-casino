import CaseEmoji from './CaseEmoji';
import styles from './CasesEmogies.module.scss';
import { emojis } from '../../../../shared/constants/cases';
import { getCaseTypeByName } from '../../utils/caseHelpers';

interface CasesEmogiesProps {
  activeCase: { name: string };
}

export default function CasesEmogies({ activeCase }: CasesEmogiesProps) {
  return (
    <div className={styles.emojis}>
      <h3 className={styles.emojis_title}>Case Contents</h3>
      <div className={styles.emojis_items}>
        <div className={styles.emojis_items}>
          {emojis
            .filter((item) => item.caseType === getCaseTypeByName(activeCase.name))
            .slice(0, 16)
            .map((item) => (
              <CaseEmoji
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
  );
}
