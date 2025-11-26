import styles from './TabList.module.scss';
import TabButton from '../../../shared/ui/TabButton';

export default function TabList() {
  return (
    <div className={styles.container}>
      <TabButton text="🚀 Rocket" />
    </div>
  );
}
