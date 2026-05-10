import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import GardenPage from './pages/GardenPage';
import AuthPage from './pages/AuthPage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#9e7f6a', fontFamily: 'Caveat, cursive', fontSize: 24 }}>🌱 loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/garden" replace />;
  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthRoute><AuthPage /></AuthRoute>} />
        <Route path="/build" element={<ProtectedRoute><BuilderPage /></ProtectedRoute>} />
        <Route path="/garden" element={<ProtectedRoute><GardenPage /></ProtectedRoute>} />
        {/* legacy redirect */}
        <Route path="/garden/me" element={<Navigate to="/garden" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
