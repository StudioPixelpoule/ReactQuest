import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAssetPath } from '@/lib/utils/assets';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  pauseBackgroundMusic: () => void;
  resumeBackgroundMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState(new Audio(getAssetPath('src/assets/audio/audio3.mp3')));
  const location = useLocation();

  // Initial setup of audio - runs only once
  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;

    // Only start playing if not on landing page
    if (location.pathname !== '/') {
      audio.play().catch(() => {
        console.log('Autoplay prevented by browser policy');
      });
    }

    // Cleanup on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // Empty dependency array - runs once on mount

  // Handle mute state
  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted, audio]);

  // Handle route changes
  useEffect(() => {
    if (location.pathname === '/') {
      audio.pause();
    } else if (!isMuted) {
      audio.play().catch(() => {
        console.log('Autoplay prevented by browser policy');
      });
    }
  }, [location.pathname, isMuted, audio]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const pauseBackgroundMusic = () => {
    audio.pause();
  };

  const resumeBackgroundMusic = () => {
    if (!isMuted && location.pathname !== '/') {
      audio.play().catch(() => {
        console.log('Autoplay prevented by browser policy');
      });
    }
  };

  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      pauseBackgroundMusic, 
      resumeBackgroundMusic 
    }}>
      {children}
    </AudioContext.Provider>
  );
}