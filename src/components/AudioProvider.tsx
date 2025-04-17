import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  pauseBackgroundMusic: () => void;
  resumeBackgroundMusic: () => void;
  startAudio: () => void;
  isStarted: boolean;
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
  const [isStarted, setIsStarted] = useState(false);
  const location = useLocation();

  // Create separate audio instances for different sounds
  const [landingAudio] = useState(() => {
    const audio = new Audio('/assets/audio/audio.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  const [modalAudio] = useState(() => {
    const audio = new Audio('/assets/audio/audio2.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  const [backgroundAudio] = useState(() => {
    const audio = new Audio('/assets/audio/audio3.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      landingAudio.pause();
      modalAudio.pause();
      backgroundAudio.pause();
      landingAudio.currentTime = 0;
      modalAudio.currentTime = 0;
      backgroundAudio.currentTime = 0;
    };
  }, [landingAudio, modalAudio, backgroundAudio]);

  // Handle mute state
  useEffect(() => {
    landingAudio.muted = isMuted;
    modalAudio.muted = isMuted;
    backgroundAudio.muted = isMuted;
  }, [isMuted, landingAudio, modalAudio, backgroundAudio]);

  // Handle route changes
  useEffect(() => {
    // Stop all audio when not started
    if (!isStarted) {
      landingAudio.pause();
      modalAudio.pause();
      backgroundAudio.pause();
      return;
    }

    // Handle audio based on route
    if (location.pathname === '/') {
      backgroundAudio.pause();
      modalAudio.pause();
      if (!isMuted) {
        landingAudio.currentTime = 0;
        landingAudio.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    } else {
      landingAudio.pause();
      modalAudio.pause();
      if (!isMuted) {
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    }
  }, [location.pathname, isMuted, isStarted, landingAudio, modalAudio, backgroundAudio]);

  const startAudio = useCallback(() => {
    setIsStarted(true);
    if (!isMuted) {
      if (location.pathname === '/') {
        landingAudio.currentTime = 0;
        landingAudio.play().catch(() => {
          // Ignore autoplay errors
        });
      } else {
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    }
  }, [landingAudio, backgroundAudio, isMuted, location.pathname]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    backgroundAudio.pause();
  }, [backgroundAudio]);

  const resumeBackgroundMusic = useCallback(() => {
    if (isMuted || location.pathname === '/' || !isStarted) return;
    
    backgroundAudio.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [backgroundAudio, isMuted, location.pathname, isStarted]);

  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      pauseBackgroundMusic, 
      resumeBackgroundMusic,
      startAudio,
      isStarted
    }}>
      {children}
    </AudioContext.Provider>
  );
}