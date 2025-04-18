import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePlayerStore } from '@/lib/store';

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
  const { xp } = usePlayerStore();

  // Create separate audio instances for different sounds
  const [landingAudio] = useState(() => {
    console.log('[Audio] Creating landing audio instance');
    const audio = new Audio('/assets/audio/audio.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  const [modalAudio] = useState(() => {
    console.log('[Audio] Creating modal audio instance');
    const audio = new Audio('/assets/audio/audio2.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  const [backgroundAudio] = useState(() => {
    console.log('[Audio] Creating background audio instance');
    const audio = new Audio('/assets/audio/audio3.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[Audio] Cleaning up audio instances');
      landingAudio.pause();
      modalAudio.pause();
      backgroundAudio.pause();
    };
  }, [landingAudio, modalAudio, backgroundAudio]);

  // Handle mute state
  useEffect(() => {
    landingAudio.muted = isMuted;
    modalAudio.muted = isMuted;
    backgroundAudio.muted = isMuted;
  }, [isMuted, landingAudio, modalAudio, backgroundAudio]);

  // Handle route changes and audio transitions
  useEffect(() => {
    if (!isStarted || isMuted) return;

    const stopAllAudio = () => {
      landingAudio.pause();
      modalAudio.pause();
      backgroundAudio.pause();
    };

    const playAudio = async (audio: HTMLAudioElement) => {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (error) {
        console.error('[Audio] Playback error:', error);
      }
    };

    // Add a small delay between stopping and starting audio
    const switchAudio = async (audio: HTMLAudioElement) => {
      stopAllAudio();
      await new Promise(resolve => setTimeout(resolve, 100));
      await playAudio(audio);
    };

    if (location.pathname === '/') {
      switchAudio(landingAudio);
    } else if (xp === 0) {
      switchAudio(modalAudio);
    } else {
      switchAudio(backgroundAudio);
    }

    return () => {
      stopAllAudio();
    };
  }, [location.pathname, isMuted, isStarted, xp, landingAudio, modalAudio, backgroundAudio]);

  const startAudio = useCallback(() => {
    console.log('[Audio] Starting audio system');
    setIsStarted(true);
    
    if (!isMuted && location.pathname === '/') {
      landingAudio.play().catch(error => {
        console.error('[Audio] Failed to start landing audio:', error);
      });
    }
  }, [landingAudio, isMuted, location.pathname]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    backgroundAudio.pause();
    modalAudio.currentTime = 0;
    modalAudio.play().catch(error => {
      console.error('[Audio] Failed to play modal audio:', error);
    });
  }, [modalAudio, backgroundAudio]);

  const resumeBackgroundMusic = useCallback(() => {
    modalAudio.pause();
    if (!isMuted && location.pathname !== '/' && isStarted) {
      backgroundAudio.currentTime = 0;
      backgroundAudio.play().catch(error => {
        console.error('[Audio] Failed to resume background audio:', error);
      });
    }
  }, [modalAudio, backgroundAudio, isMuted, location.pathname, isStarted]);

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