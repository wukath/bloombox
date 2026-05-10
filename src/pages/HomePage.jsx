import { Link } from 'react-router-dom';
import ColoringCanvas from '../components/ColoringCanvas';
import styles from './HomePage.module.css';

const DEMO_FLOWERS = [
  {
    templateId: 'bloom',
    colors: { petal_0: '#ffb3c6', petal_1: '#ff8fab', petal_2: '#ffb3c6', petal_3: '#ff8fab', petal_4: '#ffb3c6', center: '#ffd166', stem: '#5a9a5a', leaf_0: '#8fce8f', leaf_1: '#5a9a5a' },
  },
  {
    templateId: 'daisy',
    colors: { petal_0: '#d4a5f5', petal_1: '#c9b8e8', petal_2: '#d4a5f5', petal_3: '#c9b8e8', petal_4: '#d4a5f5', petal_5: '#c9b8e8', petal_6: '#d4a5f5', center: '#f9e07a', stem: '#7ab87a', leaf_0: '#b8e0a0' },
  },
  {
    templateId: 'star',
    colors: { petal_0: '#ffd166', petal_1: '#ffca70', petal_2: '#ffd166', petal_3: '#ffca70', petal_4: '#ffd166', petal_5: '#ffca70', petal_6: '#ffd166', petal_7: '#ffca70', center: '#ff8fab', stem: '#7ab87a', leaf_0: '#8fce8f', leaf_1: '#7ab87a' },
  },
  {
    templateId: 'bloom',
    colors: { petal_0: '#a8c8f0', petal_1: '#74b9e8', petal_2: '#a8c8f0', petal_3: '#74b9e8', petal_4: '#a8c8f0', center: '#ffffff', stem: '#5a9a5a', leaf_0: '#c8f0d8', leaf_1: '#a8d8b4' },
  },
  {
    templateId: 'daisy',
    colors: { petal_0: '#b8e0a0', petal_1: '#c8f0d8', petal_2: '#b8e0a0', petal_3: '#c8f0d8', petal_4: '#b8e0a0', petal_5: '#c8f0d8', petal_6: '#b8e0a0', center: '#f4c04a', stem: '#5a9a5a', leaf_0: '#8fce8f' },
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>send flowers<br/>to the people<br/>you love 🌸</h1>
          <p className={styles.heroSub}>
            Color in a flower, add a sweet note, and plant it in a friend's garden.
            Water each other's blooms to keep the love growing.
          </p>
          <div className={styles.heroCta}>
            <Link to="/build" className={styles.btnBig}>color a flower</Link>
            <Link to="/garden/me" className={styles.btnOutline}>see my garden</Link>
          </div>
        </div>
        <div className={styles.heroFlowers}>
          {DEMO_FLOWERS.map((f, i) => (
            <div key={i} className={styles.demoFlower} style={{ '--i': i }}>
              <ColoringCanvas templateId={f.templateId} colors={f.colors} size={100} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.how}>
        <h2 className={styles.howTitle}>how it works</h2>
        <div className={styles.steps}>
          <Step icon="🎨" title="color your flower" desc="Pick a flower shape and color in every petal, leaf, and stem." />
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
