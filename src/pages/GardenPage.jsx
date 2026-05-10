import { Link } from 'react-router-dom';
import GardenFlower from '../components/GardenFlower';
import styles from './GardenPage.module.css';

export default function GardenPage({ flowers, onWater }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>my garden</h1>
          <p className={styles.subtitle}>
            {flowers.length === 0
              ? 'Share your link so friends can plant flowers for you!'
              : `${flowers.length} flower${flowers.length !== 1 ? 's' : ''} growing here 🌱`}
          </p>
        </div>
        <Link to="/build" className={styles.plantBtn}>color a flower for someone</Link>
      </div>

      <div className={styles.gardenBody}>
        {flowers.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🪴</div>
            <p>No flowers yet — be the first to plant one!</p>
          </div>
        ) : (
          <div className={styles.flowersRow}>
            {flowers.map(flower => (
              <GardenFlower key={flower.id} flower={flower} onWater={onWater} />
            ))}
          </div>
        )}
        <div className={styles.soil} />
      </div>
    </div>
  );
}
