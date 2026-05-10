import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>bloombox</Link>
      <div className={styles.links}>
        <Link to="/garden/me" className={`${styles.link} ${pathname.startsWith('/garden') ? styles.active : ''}`}>
          🌿 my garden
        </Link>
        <Link to="/build" className={`${styles.link} ${styles.cta} ${pathname === '/build' ? styles.ctaActive : ''}`}>
          draw a flower
        </Link>
      </div>
    </nav>
  );
}
