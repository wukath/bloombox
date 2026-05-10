import { useState } from 'react';
import ColoringCanvas from './ColoringCanvas';
import styles from './GardenFlower.module.css';

export default function GardenFlower({ flower, onWater }) {
  const [watered, setWatered] = useState(false);

  const handleWater = () => {
    setWatered(true);
    onWater?.(flower.id);
    setTimeout(() => setWatered(false), 1800);
  };

  return (
    <div className={`${styles.wrapper} ${watered ? styles.watered : ''}`}>
      <div className={styles.flower}>
        <ColoringCanvas
          templateId={flower.templateId || 'daisy'}
          colors={flower.colors || {}}
          size={120}
        />
      </div>

      {flower.note && (
        <div className={styles.tag}>
          <span className={styles.tagNote}>{flower.note}</span>
        </div>
      )}

      <div className={styles.meta}>
        <span className={styles.from}>from {flower.from}</span>
        <button className={styles.waterBtn} onClick={handleWater} title="Water">
          {watered ? '✨' : '💧'}
        </button>
      </div>
    </div>
  );
}
