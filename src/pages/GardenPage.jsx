import { Link } from 'react-router-dom';
import GardenFlower from '../components/GardenFlower';
import styles from './GardenPage.module.css';

export default function GardenPage({ flowers, onWater }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>my garden</h1>
          <p className={styles.subtitle}>
            {flowers.length === 0
              ? 'Your garden is empty — share your garden link so friends can plant flowers for you!'
              : `${flowers.length} flower${flowers.length !== 1 ? 's' : ''} growing here 🌱`}
          </p>
        </div>
        <Link to="/build" className={styles.plantBtn}>draw a flower for someone</Link>
      </div>

      {flowers.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIllustration}>🪴</div>
          <p>No flowers yet. Be the first to plant one!</p>
        </div>
      ) : (
        <div className={styles.gardenGrid}>
          {flowers.map(flower => (
            <div key={flower.id} className={styles.flowerSpot}>
              <GardenFlower flower={flower} onWater={onWater} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.grass} />
    </div>
  );
}
