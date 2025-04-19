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
  const [isStarting, setIsStarting] = useState(false);
  const location = useLocation();
  const { xp } = usePlayerStore();

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
    
    audio.addEventListener('ended', () => {
      console.log('[Audio] Landing audio ended naturally');
      if (!audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('[Audio] Failed to restart landing audio:', error);
        });
      }
    });

    audio.addEventListener('seeking', () => {
      console.log('[Audio] Landing audio seeking to:', audio.currentTime);
    });
    
    audio.addEventListener('error', (e) => {
      const mediaError = (e.target as HTMLAudioElement).error;
      console.error('[Audio] Landing audio error:', {
        code: mediaError?.code,
        message: mediaError?.message,
        details: e
      });
    });
    
    return audio;
  });

  const [modalAudio] = useState(() => {
    console.log('[Audio] Creating modal audio instance');
    const audio = new Audio('/assets/audio/audio2.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    
    audio.addEventListener('play', () => {
      console.log('[Audio] Modal audio started playing');
    });
    
    audio.addEventListener('pause', () => {
      console.log('[Audio] Modal audio paused');
    });
    
    audio.addEventListener('ended', () => {
      console.log('[Audio] Modal audio ended naturally');
      if (!audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('[Audio] Failed to restart modal audio:', error);
        });
      }
    });

    audio.addEventListener('seeking', () => {
      console.log('[Audio] Modal audio seeking to:', audio.currentTime);
    });
    
    audio.addEventListener('error', (e) => {
      const mediaError = (e.target as HTMLAudioElement).error;
      console.error('[Audio] Modal audio error:', {
        code: mediaError?.code,
        message: mediaError?.message,
        details: e
      });
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
    
    audio.addEventListener('ended', () => {
      console.log('[Audio] Background audio ended naturally');
      if (!audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('[Audio] Failed to restart background audio:', error);
        });
      }
    });

    audio.addEventListener('seeking', () => {
      console.log('[Audio] Background audio seeking to:', audio.currentTime);
    });
    
    audio.addEventListener('error', (e) => {
      const mediaError = (e.target as HTMLAudioElement).error;
      console.error('[Audio] Background audio error:', {
        code: mediaError?.code,
        message: mediaError?.message,
        details: e
      });

      // Attempt to reload the audio if there's a network error
      if (mediaError?.code === MediaError.MEDIA_ERR_NETWORK) {
        console.log('[Audio] Network error detected, attempting to reload audio');
        audio.load();
      }
    });
    
    return audio;
  });

  // Safe audio play function
  const safePlayAudio = useCallback(async (audio: HTMLAudioElement, resetTime = false) => {
    if (!audio.paused) {
      console.log('[Audio] Audio already playing, skipping play request');
      return;
    }

    if (resetTime) {
      audio.currentTime = 0;
    }

    try {
      await audio.play();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('[Audio] Play request was aborted, this is expected during quick transitions');
        } else if (error.name === 'NotAllowedError') {
          console.log('[Audio] Play request was not allowed, waiting for user interaction');
        } else if (error.name === 'NotSupportedError') {
          console.error('[Audio] Audio format not supported or file not found');
        } else {
          console.error('[Audio] Failed to play audio:', error);
        }
      }
    }
  }, []);

  // Safe audio pause function
  const safePauseAudio = useCallback((audio: HTMLAudioElement) => {
    if (audio.paused) {
      console.log('[Audio] Audio already paused, skipping pause request');
      return;
    }
    audio.pause();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[Audio] Cleaning up audio instances');
      safePauseAudio(landingAudio);
      safePauseAudio(modalAudio);
      safePauseAudio(backgroundAudio);
    };
  }, [landingAudio, modalAudio, backgroundAudio, safePauseAudio]);

  // Handle mute state
  useEffect(() => {
    console.log('[Audio] Mute state changed:', { isMuted, isStarted });

    landingAudio.muted = isMuted;
    modalAudio.muted = isMuted;
    backgroundAudio.muted = isMuted;

    // If unmuting and audio is started, resume playback
    if (!isMuted && isStarted && !isStarting) {
      console.log('[Audio] Attempting to resume audio after unmute');
      if (location.pathname === '/') {
        safePlayAudio(landingAudio);
      } else {
        safePlayAudio(backgroundAudio);
      }
    }
  }, [isMuted, landingAudio, modalAudio, backgroundAudio, location.pathname, isStarted, isStarting, safePlayAudio]);

  // Handle route changes
  useEffect(() => {
    if (!isStarted || isMuted || isStarting) {
      console.log('[Audio] Skipping route change audio update:', { isStarted, isMuted, isStarting });
      return;
    }

    console.log('[Audio] Route changed:', { path: location.pathname });

    // Handle audio based on route
    if (location.pathname === '/') {
      console.log('[Audio] Switching to landing audio');
      safePauseAudio(backgroundAudio);
      safePauseAudio(modalAudio);
      safePlayAudio(landingAudio, true);
    } else {
      console.log('[Audio] Switching to background audio');
      safePauseAudio(landingAudio);
      safePauseAudio(modalAudio);
      
      const isFinished = !isNaN(backgroundAudio.duration) && 
                       (backgroundAudio.currentTime >= backgroundAudio.duration - 0.5 || 
                        backgroundAudio.currentTime === 0);
      
      safePlayAudio(backgroundAudio, isFinished);
    }
  }, [location.pathname, isMuted, isStarted, isStarting, landingAudio, modalAudio, backgroundAudio, safePlayAudio, safePauseAudio]);

  const startAudio = useCallback(async () => {
    if (isStarted || isStarting) {
      console.log('[Audio] Audio system already started or starting, skipping');
      return;
    }

    console.log('[Audio] Starting audio system');
    setIsStarting(true);

    try {
      // Don't play if muted
      if (!isMuted) {
        if (location.pathname === '/') {
          await safePlayAudio(landingAudio, true);
        } else {
          await safePlayAudio(backgroundAudio, true);
        }
      }
      
      setIsStarted(true);
    } finally {
      setIsStarting(false);
    }
  }, [landingAudio, backgroundAudio, isMuted, location.pathname, isStarted, isStarting, safePlayAudio]);

  const toggleMute = useCallback(() => {
    console.log('[Audio] Toggling mute state');
    setIsMuted(prev => !prev);
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    if (!isStarted || isStarting) return;

    console.log('[Audio] Pausing background music');
    safePauseAudio(backgroundAudio);
    
    if (modalAudio.paused) {
      safePlayAudio(modalAudio, true);
    }
  }, [modalAudio, backgroundAudio, isStarted, isStarting, safePlayAudio, safePauseAudio]);

  const resumeBackgroundMusic = useCallback(() => {
    if (!isStarted || isStarting || isMuted || location.pathname === '/') {
      console.log('[Audio] Skipping resume due to conditions:', {
        isMuted,
        isLandingPage: location.pathname === '/',
        isStarted,
        isStarting
      });
      return;
    }
    
    console.log('[Audio] Resuming background music');
    safePauseAudio(modalAudio);
    
    const isFinished = !isNaN(backgroundAudio.duration) && 
                     (backgroundAudio.currentTime >= backgroundAudio.duration - 0.5 || 
                      backgroundAudio.currentTime === 0);
    
    safePlayAudio(backgroundAudio, isFinished);
  }, [modalAudio, backgroundAudio, isMuted, location.pathname, isStarted, isStarting, safePlayAudio, safePauseAudio]);

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