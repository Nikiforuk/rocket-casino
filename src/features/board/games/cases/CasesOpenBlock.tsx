import styles from './CasesOpenBlock.module.scss';
import caseIcon from '../../../../assets/icons/box.svg';
import { GRADIENTS } from '../../../../shared/styles/gradients';
import Button from '../../../../shared/ui/Button';

interface CasesOpenBlockProps {
  isSpinning: boolean;
  activeCase: { name: string; price: string };
  onOpen: () => void;
}

export default function CasesOpenBlock({ isSpinning, activeCase, onOpen }: CasesOpenBlockProps) {
  return (
    <div className={styles.openBlock}>
      <Button
        icon={caseIcon}
        border="none"
        background={isSpinning ? GRADIENTS.casesCommon : GRADIENTS.greenToGreen}
        height="36px"
        borderRadius="8px"
        text={isSpinning ? 'Opening...' : `Open ${activeCase.name} - ${activeCase.price}`}
        onClick={onOpen}
        disabled={isSpinning}
      />
    </div>
  );
}
