import FlowerBuilder from '../components/FlowerBuilder';
import styles from './BuilderPage.module.css';

export default function BuilderPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>color a flower</h1>
        <p className={styles.sub}>Color in every petal, then plant it in someone's garden.</p>
      </div>
      <FlowerBuilder />
    </div>
  );
}
