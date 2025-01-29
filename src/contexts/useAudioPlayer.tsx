import { useEffect, useRef, useState } from "react";

export function useAudioPlayer(audioRef: React.RefObject<HTMLAudioElement>) {
  const [isBuffering, setIsBuffering] = useState(false);
  const lastPlaybackRate = useRef(1);
  const bufferingTimeout = useRef<number>();

  const changePlaybackRate = async (newRate: number) => {
    if (!audioRef.current) return;

    if (
      newRate <= lastPlaybackRate.current + 0.02 &&
      newRate >= lastPlaybackRate.current - 0.02
    )
      return;

    const wasPlaying = !audioRef.current.paused;
    lastPlaybackRate.current = newRate;

    try {
      const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isiOS) {
        // if the device is iOS based, handle buffering for audio rate changes
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
        // otherwise just handle it in realtime without buffering
        audioRef.current.playbackRate = newRate;
        audioRef.current.preservesPitch = false;
      }
    } catch (error) {
      console.error("Error changing playback rate:", error);
    } finally {
      setIsBuffering(false);
    }
  };

  useEffect(function cleanupBufferTimeout() {
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
