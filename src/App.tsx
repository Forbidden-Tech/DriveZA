import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import SellCar from './pages/SellCar';
import Layout from './Layout';

// @ts-ignore - TypeScript has issues detecting the default export
import CarDetails from './pages/CarDetails';

function AppContent() {
  const location = useLocation();
  const currentPageName = location.pathname === '/' ? 'Home' : location.pathname.slice(1).split('?')[0];

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/SellCar" element={<SellCar />} />
        <Route path="/CarDetails" element={<CarDetails />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
