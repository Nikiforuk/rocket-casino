import styles from './TabList.module.scss';
import turboTruckImg from '../../../assets/images/turbo-truck.png';
import TabButton from '../../../shared/ui/TabButton';

export default function TabList() {
  return (
    <div className={styles.container}>
      <TabButton icon={turboTruckImg} text="TurboTruck" />
    </div>
  );
}
