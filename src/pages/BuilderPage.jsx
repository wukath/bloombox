import FlowerBuilder from '../components/FlowerBuilder';
import styles from './BuilderPage.module.css';

export default function BuilderPage({ onPlant }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>draw a flower</h1>
        <p className={styles.sub}>Customize every petal, then plant it in someone's garden.</p>
      </div>
      <FlowerBuilder onPlant={onPlant} />
    </div>
  );
}
