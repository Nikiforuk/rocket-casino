import styles from './TabList.module.scss';
import caseImg from '../../../assets/images/case-tab.png';
import turboTruckImg from '../../../assets/images/turbo-truck.png';
import TabButton from '../../../shared/ui/TabButton';

export default function TabList() {
  return (
    <div className={styles.container}>
      <TabButton icon={turboTruckImg} text="Rocket" />
      <TabButton icon={caseImg} text="Cases" />
    </div>
  );
}
