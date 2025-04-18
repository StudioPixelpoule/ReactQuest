import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { AudioProvider } from '@/components/AudioProvider';
import { AssistantWidget } from '@/components/AssistantWidget';
import LandingPage from '@/pages/LandingPage';
import Hub from '@/pages/Hub';
import Quest from '@/pages/Quest';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import { ThemeProvider } from '@/components/theme-provider';
import { FUTURE_FLAGS } from '@/lib/utils/router-flags';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router future={FUTURE_FLAGS}>
        <AudioProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/quest/:id" element={<Quest />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
          <Routes>
            <Route path="/" element={null} />
            <Route path="*" element={<AssistantWidget />} />
          </Routes>
          <Toaster />
        </AudioProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;