import { useState } from 'react';
import ColoringCanvas from './ColoringCanvas';
import styles from './GardenFlower.module.css';

export default function GardenFlower({ flower, onWater }) {
  const [showNote, setShowNote] = useState(false);
  const [watered, setWatered] = useState(false);

  const handleWater = () => {
    setWatered(true);
    onWater?.(flower.id);
    setTimeout(() => setWatered(false), 1800);
  };

  return (
    <div className={`${styles.wrapper} ${watered ? styles.watered : ''}`}>
      <div className={styles.flowerWrap} onClick={() => flower.note && setShowNote(v => !v)}>
        <ColoringCanvas
          templateId={flower.templateId || 'daisy'}
          colors={flower.colors || {}}
          size={110}
        />
      </div>

      <div className={styles.meta}>
        <span className={styles.from}>from {flower.from}</span>
        <button className={styles.waterBtn} onClick={handleWater} title="Water this flower">
          {watered ? '✨' : '💧'}
        </button>
      </div>

      {showNote && flower.note && (
        <div className={styles.noteTag}>
          <div className={styles.notePaper}>
            <p>{flower.note}</p>
            <span className={styles.noteFrom}>— {flower.from}</span>
          </div>
        </div>
      )}
    </div>
  );
}
