import { Button } from '@/components/ui/button';
import { useAudio } from '@/components/AudioProvider';
import { Volume2, VolumeX } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function AudioToggle() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isMuted ? 'Activer le son' : 'Couper le son'}</p>
      </TooltipContent>
    </Tooltip>
  );
}