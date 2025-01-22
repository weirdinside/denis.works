import { useEffect, useRef, useState } from "react";

export function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement>) {
  const [isBuffering, setIsBuffering] = useState(false);
  const lastPlaybackRate = useRef(1);
  const bufferingTimeout = useRef<number>();

  const changePlaybackRate = async (newRate: number) => {
    if (!audioRef.current) return;

    const wasPlaying = !audioRef.current.paused;
    lastPlaybackRate.current = newRate;

    try {
      const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isiOS) {
        setIsBuffering(true);
        if (wasPlaying) {
          audioRef.current.pause();
        }

        await new Promise((resolve) => {
          bufferingTimeout.current = window.setTimeout(resolve, 400);
        });

        audioRef.current.playbackRate = newRate;
        audioRef.current.preservesPitch = false;

        if (wasPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        }
      } else {
        audioRef.current.playbackRate = newRate;
        audioRef.current.preservesPitch = false;
      }
    } catch (error) {
      console.error("Error changing playback rate:", error);
    } finally {
      setIsBuffering(false);
    }
  };

  useEffect(() => {
    return () => {
      if (bufferingTimeout.current) {
        clearTimeout(bufferingTimeout.current);
      }
    };
  }, []);

  return {
    isBuffering,
    changePlaybackRate,
    lastPlaybackRate: lastPlaybackRate.current,
  };
}
