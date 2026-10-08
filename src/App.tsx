import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import AnomalyDetection from './pages/AnomalyDetection';
import RootCauseAnalysis from './pages/RootCauseAnalysis';
import PrescriptiveMaintenance from './pages/PrescriptiveMaintenance';
import DigitalTwin from './pages/DigitalTwin';
import WhatIfSimulation from './pages/WhatIfSimulation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="anomaly-detection" element={<AnomalyDetection />} />
        <Route path="root-cause-analysis" element={<RootCauseAnalysis />} />
        <Route path="prescriptive-maintenance" element={<PrescriptiveMaintenance />} />
        <Route path="digital-twin" element={<DigitalTwin />} />
        <Route path="what-if-simulation" element={<WhatIfSimulation />} />
      </Route>
    </Routes>
  );
}

export default App;
