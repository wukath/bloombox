import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerSVG from './FlowerSVG';
import {
  PETAL_SHAPES, PETAL_COUNTS, STEM_STYLES, LEAF_STYLES,
  PETAL_COLORS, CENTER_COLORS, STEM_COLORS,
} from '../data/flowerParts';
import styles from './FlowerBuilder.module.css';

const DEFAULT_CONFIG = {
  petalShape: 'round',
  petalCount: 6,
  petalColor: '#f4a7b9',
  centerColor: '#f9e07a',
  stemStyle: 'straight',
  stemColor: '#7ab87a',
  leafStyle: 'simple',
};

export default function FlowerBuilder({ onPlant }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [note, setNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState('build'); // 'build' | 'note' | 'done'
  const navigate = useNavigate();

  const set = (key, val) => setConfig(c => ({ ...c, [key]: val }));

  const handlePlant = () => {
    const flower = { id: Date.now(), config, note, from: 'you', plantedAt: new Date().toISOString() };
    onPlant(recipient, flower);
    setStep('done');
  };

  if (step === 'done') {
    return (
      <div className={styles.done}>
        <div className={styles.doneFlower}>
          <FlowerSVG config={config} size={160} animate />
        </div>
        <h2>Your flower is planted! 🌱</h2>
        <p>It's growing in {recipient || 'their'}'s garden.</p>
        <div className={styles.doneActions}>
          <button className={styles.btnPrimary} onClick={() => navigate('/garden/me')}>See my garden</button>
          <button className={styles.btnSecondary} onClick={() => { setStep('build'); setConfig(DEFAULT_CONFIG); setNote(''); setRecipient(''); }}>
            Make another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.builder}>
      <div className={styles.preview}>
        <div className={styles.previewInner}>
          <FlowerSVG config={config} size={200} animate />
        </div>
        <p className={styles.previewHint}>Your flower</p>
      </div>

      <div className={styles.controls}>
        {step === 'build' && (
          <>
            <Section label="Petal shape">
              <div className={styles.shapeGrid}>
                {PETAL_SHAPES.map(s => (
                  <button
                    key={s.id}
                    className={`${styles.shapeBtn} ${config.petalShape === s.id ? styles.active : ''}`}
                    onClick={() => set('petalShape', s.id)}
                    title={s.label}
                  >
                    <span>{s.emoji}</span>
                    <span className={styles.shapeBtnLabel}>{s.label}</span>
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Petal count">
              <div className={styles.countRow}>
                {PETAL_COUNTS.map(n => (
                  <button
                    key={n}
                    className={`${styles.countBtn} ${config.petalCount === n ? styles.active : ''}`}
                    onClick={() => set('petalCount', n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Petal color">
              <ColorPicker colors={PETAL_COLORS} value={config.petalColor} onChange={v => set('petalColor', v)} />
            </Section>

            <Section label="Center color">
              <ColorPicker colors={CENTER_COLORS} value={config.centerColor} onChange={v => set('centerColor', v)} />
            </Section>

            <Section label="Stem">
              <div className={styles.chipRow}>
                {STEM_STYLES.map(s => (
                  <button
                    key={s.id}
                    className={`${styles.chip} ${config.stemStyle === s.id ? styles.active : ''}`}
                    onClick={() => set('stemStyle', s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Stem color">
              <ColorPicker colors={STEM_COLORS} value={config.stemColor} onChange={v => set('stemColor', v)} />
            </Section>

            <Section label="Leaves">
              <div className={styles.chipRow}>
                {LEAF_STYLES.map(s => (
                  <button
                    key={s.id}
                    className={`${styles.chip} ${config.leafStyle === s.id ? styles.active : ''}`}
                    onClick={() => set('leafStyle', s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </Section>

            <button className={styles.btnPrimary} onClick={() => setStep('note')}>
              Next: add a note →
            </button>
          </>
        )}

        {step === 'note' && (
          <>
            <button className={styles.backBtn} onClick={() => setStep('build')}>← back</button>
            <Section label="Plant for">
              <input
                className={styles.textInput}
                placeholder="Enter a username or email..."
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </Section>
            <Section label="Add a note (optional)">
              <textarea
                className={styles.noteInput}
                placeholder="Write something sweet..."
                value={note}
                onChange={e => setNote(e.target.value)}
                maxLength={120}
                rows={3}
              />
              <div className={styles.charCount}>{note.length}/120</div>
            </Section>
            <button
              className={styles.btnPrimary}
              onClick={handlePlant}
              disabled={!recipient.trim()}
            >
              🌱 Plant this flower
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      {children}
    </div>
  );
}

function ColorPicker({ colors, value, onChange }) {
  return (
    <div className={styles.colorRow}>
      {colors.map(c => (
        <button
          key={c}
          className={`${styles.colorSwatch} ${value === c ? styles.active : ''}`}
          style={{ background: c }}
          onClick={() => onChange(c)}
          aria-label={c}
        />
      ))}
    </div>
  );
}
