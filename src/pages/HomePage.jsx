import { Link } from 'react-router-dom';
import FlowerSVG from '../components/FlowerSVG';
import styles from './HomePage.module.css';

const DEMO_FLOWERS = [
  { config: { petalShape: 'round', petalCount: 6, petalColor: '#f4a7b9', centerColor: '#f9e07a', stemStyle: 'curved', stemColor: '#7ab87a', leafStyle: 'simple' } },
  { config: { petalShape: 'heart', petalCount: 5, petalColor: '#c9b8e8', centerColor: '#f9e07a', stemStyle: 'straight', stemColor: '#5a9a5a', leafStyle: 'pair' } },
  { config: { petalShape: 'tulip', petalCount: 7, petalColor: '#f4d49a', centerColor: '#f4a97a', stemStyle: 'wiggly', stemColor: '#7ab87a', leafStyle: 'simple' } },
  { config: { petalShape: 'pointy', petalCount: 8, petalColor: '#a8c8f0', centerColor: '#ffffff', stemStyle: 'curved', stemColor: '#4a7a4a', leafStyle: 'none' } },
  { config: { petalShape: 'frilly', petalCount: 6, petalColor: '#b8e0d4', centerColor: '#f4c04a', stemStyle: 'straight', stemColor: '#8ab88a', leafStyle: 'pair' } },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>send flowers<br/>to the people<br/>you love 🌸</h1>
          <p className={styles.heroSub}>
            Draw a custom flower, add a sweet note, and plant it in a friend's garden.
            Water each other's blooms to keep the love growing.
          </p>
          <div className={styles.heroCta}>
            <Link to="/build" className={styles.btnBig}>draw a flower</Link>
            <Link to="/garden/me" className={styles.btnOutline}>see my garden</Link>
          </div>
        </div>
        <div className={styles.heroFlowers}>
          {DEMO_FLOWERS.map((f, i) => (
            <div key={i} className={styles.demoFlower} style={{ '--i': i }}>
              <FlowerSVG config={f.config} size={100} animate />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.how}>
        <h2 className={styles.howTitle}>how it works</h2>
        <div className={styles.steps}>
          <Step icon="🎨" title="draw your flower" desc="Pick petals, colors, stem style — make something uniquely you." />
          <Step icon="✏️" title="add a note" desc="Write a tiny message on your flower's tag." />
          <Step icon="🌱" title="plant it" desc="Drop it in a friend's garden for them to find." />
          <Step icon="💧" title="water & tend" desc="Come back to water each other's flowers and watch them thrive." />
        </div>
      </section>
    </div>
  );
}

function Step({ icon, title, desc }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepIcon}>{icon}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{desc}</p>
    </div>
  );
}
