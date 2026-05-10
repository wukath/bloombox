import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import GardenPage from './pages/GardenPage';

const SEED_FLOWERS = [
  {
    id: 1,
    from: 'maya',
    note: 'just thinking of you 🌷',
    plantedAt: '2024-03-01',
    config: { petalShape: 'heart', petalCount: 5, petalColor: '#e8a0d0', centerColor: '#f9e07a', stemStyle: 'curved', stemColor: '#7ab87a', leafStyle: 'simple' },
  },
  {
    id: 2,
    from: 'tom',
    note: 'thanks for everything!!',
    plantedAt: '2024-03-03',
    config: { petalShape: 'round', petalCount: 8, petalColor: '#a8c8f0', centerColor: '#ffffff', stemStyle: 'straight', stemColor: '#5a9a5a', leafStyle: 'pair' },
  },
  {
    id: 3,
    from: 'jess',
    note: '',
    plantedAt: '2024-03-05',
    config: { petalShape: 'tulip', petalCount: 6, petalColor: '#f4d49a', centerColor: '#f4a97a', stemStyle: 'wiggly', stemColor: '#8ab88a', leafStyle: 'none' },
  },
];

export default function App() {
  const [myFlowers, setMyFlowers] = useState(SEED_FLOWERS);

  const handlePlant = (recipient, flower) => {
    if (recipient === 'me' || recipient === 'myself') {
      setMyFlowers(f => [flower, ...f]);
    }
  };

  const handleWater = (id) => {
    console.log('watered flower', id);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<BuilderPage onPlant={handlePlant} />} />
        <Route path="/garden/me" element={<GardenPage flowers={myFlowers} onWater={handleWater} />} />
      </Routes>
    </BrowserRouter>
  );
}
