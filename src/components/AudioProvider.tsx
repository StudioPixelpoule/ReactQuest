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
    console.log('[Audio] Creating landing audio instance');
    const audio = new Audio('/assets/audio/audio.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.addEventListener('play', () => {
      console.log('[Audio] Landing audio started playing');
    });
    audio.addEventListener('pause', () => {
      console.log('[Audio] Landing audio paused');
    });
    audio.addEventListener('error', (e) => {
      console.error('[Audio] Landing audio error:', e);
    });
    return audio;
  });

  const [backgroundAudio] = useState(() => {
    console.log('[Audio] Creating background audio instance');
    const audio = new Audio('/assets/audio/audio3.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.addEventListener('play', () => {
      console.log('[Audio] Background audio started playing');
    });
    audio.addEventListener('pause', () => {
      console.log('[Audio] Background audio paused');
    });
    audio.addEventListener('error', (e) => {
      console.error('[Audio] Background audio error:', e);
    });
    return audio;
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[Audio] Cleaning up audio instances');
      console.log('[Audio] Current state:', { isStarted, isMuted, path: location.pathname });
      landingAudio.pause();
      backgroundAudio.pause();
    };
  }, [landingAudio, backgroundAudio, isStarted, isMuted, location.pathname]);

  // Handle mute state
  useEffect(() => {
    console.log('[Audio] Mute state changed:', { 
      isMuted, 
      isStarted, 
      path: location.pathname,
      landingAudioPaused: landingAudio.paused,
      backgroundAudioPaused: backgroundAudio.paused
    });

    landingAudio.muted = isMuted;
    backgroundAudio.muted = isMuted;

    // If unmuting and audio is started, resume playback
    if (!isMuted && isStarted) {
      console.log('[Audio] Attempting to resume audio after unmute');
      if (location.pathname === '/') {
        console.log('[Audio] Resuming landing audio');
        landingAudio.play().catch(error => {
          console.error('[Audio] Failed to resume landing audio:', error);
        });
      } else {
        console.log('[Audio] Resuming background audio');
        backgroundAudio.play().catch(error => {
          console.error('[Audio] Failed to resume background audio:', error);
        });
      }
    }
  }, [isMuted, landingAudio, backgroundAudio, location.pathname, isStarted]);

  // Handle route changes
  useEffect(() => {
    console.log('[Audio] Route changed:', {
      path: location.pathname,
      isStarted,
      isMuted,
      landingAudioState: {
        paused: landingAudio.paused,
        muted: landingAudio.muted,
        currentTime: landingAudio.currentTime
      },
      backgroundAudioState: {
        paused: backgroundAudio.paused,
        muted: backgroundAudio.muted,
        currentTime: backgroundAudio.currentTime
      }
    });

    // Stop all audio when not started
    if (!isStarted) {
      console.log('[Audio] System not started, pausing all audio');
      landingAudio.pause();
      backgroundAudio.pause();
      return;
    }

    // Don't play if muted
    if (isMuted) {
      console.log('[Audio] System muted, skipping audio change');
      return;
    }

    // Handle audio based on route
    if (location.pathname === '/') {
      console.log('[Audio] Switching to landing audio');
      backgroundAudio.pause();
      landingAudio.play().catch(error => {
        console.error('[Audio] Failed to play landing audio:', error);
      });
    } else {
      console.log('[Audio] Switching to background audio');
      landingAudio.pause();
      backgroundAudio.play().catch(error => {
        console.error('[Audio] Failed to play background audio:', error);
      });
    }
  }, [location.pathname, isMuted, isStarted, landingAudio, backgroundAudio]);

  const startAudio = useCallback(() => {
    console.log('[Audio] Starting audio system:', {
      currentPath: location.pathname,
      isMuted,
      landingAudioPaused: landingAudio.paused,
      backgroundAudioPaused: backgroundAudio.paused
    });
    
    setIsStarted(true);
    
    // Don't play if muted
    if (isMuted) {
      console.log('[Audio] System muted, not starting playback');
      return;
    }

    // Play appropriate audio based on current route
    if (location.pathname === '/') {
      console.log('[Audio] Starting landing audio');
      landingAudio.play().catch(error => {
        console.error('[Audio] Failed to start landing audio:', error);
      });
    } else {
      console.log('[Audio] Starting background audio');
      backgroundAudio.play().catch(error => {
        console.error('[Audio] Failed to start background audio:', error);
      });
    }
  }, [landingAudio, backgroundAudio, isMuted, location.pathname]);

  const toggleMute = useCallback(() => {
    console.log('[Audio] Toggling mute state');
    setIsMuted(prev => !prev);
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    console.log('[Audio] Pausing background music:', {
      wasPlaying: !backgroundAudio.paused,
      currentTime: backgroundAudio.currentTime
    });
    backgroundAudio.pause();
  }, [backgroundAudio]);

  const resumeBackgroundMusic = useCallback(() => {
    console.log('[Audio] Attempting to resume background music:', {
      isMuted,
      isStarted,
      path: location.pathname,
      wasPaused: backgroundAudio.paused,
      currentTime: backgroundAudio.currentTime
    });
    
    if (isMuted || location.pathname === '/' || !isStarted) {
      console.log('[Audio] Skipping resume due to conditions:', {
        isMuted,
        isLandingPage: location.pathname === '/',
        isStarted
      });
      return;
    }
    
    backgroundAudio.play().catch(error => {
      console.error('[Audio] Failed to resume background audio:', error);
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