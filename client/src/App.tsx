import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import AIChat from './pages/AIChat';
import AudioChat from './pages/AudioChat';
import SummaryTips from './pages/SummaryTips';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/chat" replace />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="audio" element={<AudioChat />} />
            <Route path="tips" element={<SummaryTips />} />
          </Route>
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
