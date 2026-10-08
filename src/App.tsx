import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import AnomalyDetection from './pages/AnomalyDetection';
import RootCauseAnalysis from './pages/RootCauseAnalysis';
import PrescriptiveMaintenance from './pages/PrescriptiveMaintenance';
import DigitalTwin from './pages/DigitalTwin';
import WhatIfSimulation from './pages/WhatIfSimulation';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="anomaly-detection" element={<AnomalyDetection />} />
        <Route path="root-cause" element={<RootCauseAnalysis />} />
        <Route path="maintenance" element={<PrescriptiveMaintenance />} />
        <Route path="digital-twin" element={<DigitalTwin />} />
        <Route path="simulation" element={<WhatIfSimulation />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
