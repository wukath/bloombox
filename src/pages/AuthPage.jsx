import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!displayName.trim()) { setError('Please enter a display name.'); setLoading(false); return; }
        await signUp(email, password, displayName.trim());
      } else {
        await signIn(email, password);
      }
      navigate('/garden');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🌸</div>
        <h1 className={styles.title}>bloombox</h1>
        <p className={styles.sub}>
          {mode === 'signin' ? 'welcome back!' : 'plant flowers for the people you love'}
        </p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === 'signin' ? styles.tabActive : ''}`}
            onClick={() => { setMode('signin'); setError(''); }}
          >
            sign in
          </button>
          <button
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            create account
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>your name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="how should friends see you?"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>password</label>
            <input
              className={styles.input}
              type="password"
              placeholder={mode === 'signup' ? 'at least 6 characters' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? '...' : mode === 'signin' ? 'sign in' : 'create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
