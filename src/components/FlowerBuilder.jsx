import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColoringCanvas from './ColoringCanvas';
import { TEMPLATES, PALETTE, ERASER_COLOR } from '../data/flowerTemplates';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import styles from './FlowerBuilder.module.css';

const buildDefaultColors = (template) => ({ ...template.defaultColors });

export default function FlowerBuilder() {
  const [templateId, setTemplateId] = useState('daisy');
  const [colors, setColors] = useState(() => buildDefaultColors(TEMPLATES[0]));
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [note, setNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState('color'); // 'color' | 'note' | 'done'
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const template = TEMPLATES.find(t => t.id === templateId);

  const handleTemplateChange = (id) => {
    setTemplateId(id);
    setColors(buildDefaultColors(TEMPLATES.find(t => t.id === id)));
  };

  const handleColor = (regionId, color) => {
    setColors(c => ({ ...c, [regionId]: color }));
  };

  const fillAllPetals = () => {
    if (!selectedColor) return;
    const updates = {};
    for (let i = 0; i < template.petalCount; i++) updates[`petal_${i}`] = selectedColor;
    setColors(c => ({ ...c, ...updates }));
  };

  const resetColors = () => setColors(buildDefaultColors(template));

  const handlePlant = async () => {
    setError('');
    setSaving(true);
    const { error: err } = await supabase.from('flowers').insert({
      template_id: templateId,
      colors,
      note: note.trim(),
      from_user_id: user.id,
      from_name: profile?.display_name || user.email.split('@')[0],
      to_email: recipient.trim().toLowerCase(),
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setStep('done');
  };

  const reset = () => {
    setStep('color');
    setColors(buildDefaultColors(template));
    setNote('');
    setRecipient('');
    setError('');
  };

  if (step === 'done') {
    return (
      <div className={styles.done}>
        <div className={styles.doneFlower}>
          <ColoringCanvas templateId={templateId} colors={colors} size={160} />
        </div>
        <h2>Your flower is planted! 🌱</h2>
        <p>It'll bloom in <strong>{recipient}</strong>'s garden.</p>
        <div className={styles.doneActions}>
          <button className={styles.btnPrimary} onClick={() => navigate('/garden')}>See my garden</button>
          <button className={styles.btnSecondary} onClick={reset}>Make another</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.builder}>
      {/* Left: canvas + template picker */}
      <div className={styles.canvasCol}>
        <div className={styles.templateRow}>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              className={`${styles.templateBtn} ${templateId === t.id ? styles.active : ''}`}
              onClick={() => handleTemplateChange(t.id)}
            >
              <ColoringCanvas templateId={t.id} colors={t.defaultColors} size={52} />
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.canvasWrap}>
          <ColoringCanvas
            templateId={templateId}
            colors={colors}
            selectedColor={selectedColor}
            onColor={step === 'color' ? handleColor : null}
            size={240}
          />
          {step === 'color' && (
            <p className={styles.canvasHint}>
              {selectedColor ? 'Click any region to color it' : 'Pick a color first'}
            </p>
          )}
        </div>

        {step === 'color' && (
          <div className={styles.canvasActions}>
            <button className={styles.actionBtn} onClick={fillAllPetals} disabled={!selectedColor}>
              fill all petals
            </button>
            <button className={styles.actionBtn} onClick={resetColors}>reset</button>
          </div>
        )}
      </div>

      {/* Right: palette or note form */}
      <div className={styles.controlsCol}>
        {step === 'color' && (
          <>
            <div className={styles.sectionLabel}>Pick a color</div>
            <div className={styles.palette}>
              {PALETTE.map(c => (
                <button
                  key={c}
                  className={`${styles.swatch} ${selectedColor === c ? styles.swatchActive : ''}`}
                  style={{ background: c }}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c}
                />
              ))}
              <button
                className={`${styles.swatch} ${styles.eraser} ${selectedColor === ERASER_COLOR ? styles.swatchActive : ''}`}
                onClick={() => setSelectedColor(ERASER_COLOR)}
                title="Eraser"
              >
                ✦
              </button>
            </div>

            <div className={styles.selectedPreview}>
              <span className={styles.selectedSwatch} style={{ background: selectedColor || 'transparent' }} />
              <span className={styles.selectedLabel}>
                {selectedColor === ERASER_COLOR ? 'Eraser' : 'Selected color'}
              </span>
            </div>

            <button className={styles.btnPrimary} onClick={() => setStep('note')}>
              Next: add a note →
            </button>
          </>
        )}

        {step === 'note' && (
          <>
            <button className={styles.backBtn} onClick={() => setStep('color')}>← back to coloring</button>

            <div className={styles.sectionLabel}>Plant for</div>
            <input
              className={styles.textInput}
              type="email"
              placeholder="friend@example.com"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            />
            <p className={styles.fieldHint}>They'll see it when they sign in with this email.</p>

            <div className={styles.sectionLabel}>Add a note (optional)</div>
            <textarea
              className={styles.noteInput}
              placeholder="Write something sweet..."
              value={note}
              onChange={e => setNote(e.target.value)}
              maxLength={120}
              rows={3}
            />
            <div className={styles.charCount}>{note.length}/120</div>

            {error && <p className={styles.fieldError}>{error}</p>}

            <button
              className={styles.btnPrimary}
              onClick={handlePlant}
              disabled={!recipient.trim() || saving}
            >
              {saving ? 'planting...' : '🌱 Plant this flower'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
