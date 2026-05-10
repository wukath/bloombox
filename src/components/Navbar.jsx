import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>bloombox</Link>
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/garden" className={`${styles.link} ${pathname === '/garden' ? styles.active : ''}`}>
              🌿 my garden
            </Link>
            <Link to="/build" className={`${styles.link} ${styles.cta} ${pathname === '/build' ? styles.ctaActive : ''}`}>
              color a flower
            </Link>
            <div className={styles.userMenu}>
              <span className={styles.userName}>{profile?.display_name || user.email.split('@')[0]}</span>
              <button className={styles.signOut} onClick={handleSignOut}>sign out</button>
            </div>
          </>
        ) : (
          <Link to="/auth" className={`${styles.link} ${styles.cta}`}>sign in</Link>
        )}
      </div>
    </nav>
  );
}
