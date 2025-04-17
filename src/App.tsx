import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { AudioProvider } from '@/components/AudioProvider';
import LandingPage from '@/pages/LandingPage';
import Hub from '@/pages/Hub';
import Quest from '@/pages/Quest';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
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
          <Toaster />
        </AudioProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;