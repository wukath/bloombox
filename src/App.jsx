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
    templateId: 'bloom',
    colors: {
      petal_0: '#ffb3c6', petal_1: '#ff8fab', petal_2: '#ffb3c6',
      petal_3: '#ff8fab', petal_4: '#ffb3c6',
      center: '#ffd166', stem: '#5a9a5a', leaf_0: '#8fce8f', leaf_1: '#5a9a5a',
    },
  },
  {
    id: 2,
    from: 'tom',
    note: 'thanks for everything!!',
    plantedAt: '2024-03-03',
    templateId: 'daisy',
    colors: {
      petal_0: '#a8c8f0', petal_1: '#74b9e8', petal_2: '#a8c8f0',
      petal_3: '#74b9e8', petal_4: '#a8c8f0', petal_5: '#74b9e8', petal_6: '#a8c8f0',
      center: '#f9e07a', stem: '#7ab87a', leaf_0: '#b8e0a0',
    },
  },
  {
    id: 3,
    from: 'jess',
    note: '',
    plantedAt: '2024-03-05',
    templateId: 'star',
    colors: {
      petal_0: '#d4a5f5', petal_1: '#c9b8e8', petal_2: '#d4a5f5', petal_3: '#c9b8e8',
      petal_4: '#d4a5f5', petal_5: '#c9b8e8', petal_6: '#d4a5f5', petal_7: '#c9b8e8',
      center: '#ffd166', stem: '#7ab87a', leaf_0: '#8fce8f', leaf_1: '#7ab87a',
    },
  },
];

export default function App() {
  const [myFlowers, setMyFlowers] = useState(SEED_FLOWERS);

  const handlePlant = (recipient, flower) => {
    if (recipient === 'me' || recipient === 'myself') {
      setMyFlowers(f => [flower, ...f]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<BuilderPage onPlant={handlePlant} />} />
        <Route path="/garden/me" element={<GardenPage flowers={myFlowers} onWater={(id) => console.log('watered', id)} />} />
      </Routes>
    </BrowserRouter>
  );
}
