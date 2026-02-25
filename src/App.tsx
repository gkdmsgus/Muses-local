import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QrDemoPage from './pages/QrDemoPage';
import CheckinResultPage from './pages/CheckinResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QrDemoPage />} />
        <Route path="/checkin/result" element={<CheckinResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
