import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import GardenFlower from '../components/GardenFlower';
import styles from './GardenPage.module.css';

export default function GardenPage() {
  const { user, profile } = useAuth();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from('flowers')
        .select('*')
        .eq('to_email', user.email)
        .order('planted_at', { ascending: false });
      setFlowers(data ?? []);
      setLoading(false);
    };

    load();

    // Real-time: new flowers planted for you appear instantly
    const channel = supabase
      .channel('my-garden')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'flowers',
        filter: `to_email=eq.${user.email}`,
      }, (payload) => {
        setFlowers(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const handleWater = async (id) => {
    await supabase.rpc('water_flower', { flower_id: id });
  };

  const name = profile?.display_name || user?.email?.split('@')[0] || 'your';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{name}'s garden</h1>
          <p className={styles.subtitle}>
            {loading
              ? 'loading your flowers...'
              : flowers.length === 0
              ? 'no flowers yet — share your email so friends can plant for you!'
              : `${flowers.length} flower${flowers.length !== 1 ? 's' : ''} growing here 🌱`}
          </p>
        </div>
        <Link to="/build" className={styles.plantBtn}>color a flower for someone</Link>
      </div>

      <div className={styles.gardenBody}>
        {loading ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon} style={{ animation: 'none', fontSize: 48 }}>🌱</div>
          </div>
        ) : flowers.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🪴</div>
            <p>No flowers yet — be the first to plant one!</p>
          </div>
        ) : (
          <div className={styles.flowersRow}>
            {flowers.map(flower => (
              <GardenFlower
                key={flower.id}
                flower={{
                  ...flower,
                  templateId: flower.template_id,
                  from: flower.from_name,
                }}
                onWater={handleWater}
              />
            ))}
          </div>
        )}
        <div className={styles.soil} />
      </div>
    </div>
  );
}
