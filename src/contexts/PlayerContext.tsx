import React, { createContext, useRef, useState, useEffect } from "react";
import { songsArray } from "../utils/constants";

type PlayerProviderProps = {
  children: React.ReactNode;
};

type PlayerStateType = "stopped" | "playing" | "paused" | undefined;

type PlayerContextType = {
  playbackRate: number;
  setPlaybackRate: (arg0: number) => void;
  isSongLoading: boolean;
  setSongLoading: (arg0: boolean) => void;
  duration: number;
  setDuration: (arg0: number) => void;
  audioBuffer: string;
  setAudioBuffer: (arg0: string) => void;
  playerState: PlayerStateType;
  setPlayerState: (arg0: PlayerStateType) => void;
  volume: number;
  setVolume: (arg0: number) => void;
  currentTime: number;
  setCurrentTime: (arg0: number) => void;
  currentFile: string;
  setCurrentFile: (arg0: string) => void;
  isLooping: boolean;
  setIsLooping: (arg0: boolean) => void;
  isInBackground: boolean;
  setIsInBackground: (arg0: boolean) => void;
  HTML5Sound: React.RefObject<HTMLAudioElement> | undefined;
  webAudioTimer: React.MutableRefObject<number | undefined> | undefined;
  webAudioSound: React.MutableRefObject<Howl | undefined> | undefined;
};

const defaultContext: PlayerContextType = {
  playbackRate: 1,
  setPlaybackRate: () => {},
  isSongLoading: false,
  setSongLoading: () => {},
  duration: 0,
  setDuration: () => {},
  audioBuffer: "",
  setAudioBuffer: () => {},
  playerState: undefined,
  setPlayerState: () => {},
  volume: 1,
  setVolume: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  currentFile: "",
  setCurrentFile: () => {},
  isLooping: false,
  setIsLooping: () => {},
  isInBackground: false,
  setIsInBackground: () => {},
  HTML5Sound: undefined,
  webAudioTimer: undefined,
  webAudioSound: undefined,
};

export const PlayerContext = createContext<PlayerContextType>(defaultContext);

export function AudioProvider({ children }: PlayerProviderProps) {
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isSongLoading, setSongLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [audioBuffer, setAudioBuffer] = useState<string>("");
  const [playerState, setPlayerState] = useState<PlayerStateType>("stopped");
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isInBackground, setIsInBackground] = useState<boolean>(false); // checks if browser is minimized

  const HTML5Sound = useRef<HTMLAudioElement>(null);
  const webAudioTimer = useRef<number | undefined>();
  const webAudioSound = useRef<Howl | undefined>();

  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  //  ------------------------------------------- //
  //                 AUDIO FUNCTIONS              //
  //  ------------------------------------------- //

  function handlePlay() {
    try {
      if (HTML5Sound.current && webAudioSound.current) {
        HTML5Sound.current.play();
        webAudioSound.current!.play();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handlePause() {
    if (HTML5Sound.current) HTML5Sound.current.pause();
    if (webAudioSound.current) webAudioSound.current.pause();
  }

  function handleStop() {
    handlePause();
    setCurrentTime(0);
    if (HTML5Sound.current) HTML5Sound.current.currentTime = 0;
    if (webAudioSound.current) {
      webAudioSound.current.seek(0);
      webAudioSound.current.stop();
    }
    setPlayerState(undefined);
  }

  // converts audio file to blobURL (forcing a preload - for use with HTML5)
  async function fetchAudioAsBlobURL() {
    try {
      setSongLoading(true);
      const response = await fetch(currentFile);
      if (!response.ok) throw new Error("Failed to fetch audio file");
      const blob = await response.blob();

      return URL.createObjectURL(blob);
    } catch (err) {
      console.error("Error loading audio:", err);
      return "";
    } finally {
      setSongLoading(false);
    }
  }

  async function loadAudio() {
    const blob = await fetchAudioAsBlobURL();
    setAudioBuffer(blob);
  }

  // converts audio file to buffer (forcing a preload - for use with audioctx)
  async function fetchAudioAsBuffer(audioUrl: string) {
    const audioContext = new AudioContext();
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
  }

  useEffect(
    function initializeHowl() {
      if (!currentFile) {
        setAudioBuffer("");
        setPlayerState(undefined);
        setCurrentTime(0);
        setDuration(0);
        return;
      }

      // set proper behaviors for audio tag
      HTML5Sound.current!.playbackRate = playbackRate;
      HTML5Sound.current!.preservesPitch = false;

      if (currentFile) {
        const currentSong = songsArray.filter(
          (song) => song.url === currentFile,
        );

        navigator.mediaSession.metadata = new MediaMetadata({
          album: "biblioni music player",
          artist: "denis biblioni",
          title: `${currentSong[0].title}`,
          artwork: [{ src: "", sizes: "96x96", type: "image/jpeg" }],
        });
      }

      loadAudio();

      Howler.autoSuspend = false;
      if (webAudioSound.current) {
        webAudioSound.current.stop();
        webAudioSound.current.unload();
      }

      if (isInBackground && HTML5Sound.current) {
        console.log("HTML5Sound (background)");
        Howler.unload(); // unload any previous instance of howler
        if (playerState === "playing") {
          HTML5Sound.current.play(); // if the player was playing before, convert
        }
        HTML5Sound.current.preservesPitch = false; //
        HTML5Sound.current.currentTime = currentTime;
      } else if (!isInBackground) {
        HTML5Sound.current!.pause();
        console.log("Web Audio (sound)");
        webAudioSound.current = new Howl({
          src: [currentFile],
          format: ["mp3"],
          onload: () => {
            if (webAudioSound.current) {
              webAudioSound.current!.seek(currentTime);
              if (playerState === "playing") webAudioSound.current!.play();
            }
          },
          rate: playbackRate,
          onplay: () => {
            setDuration(webAudioSound.current!.duration());
            setPlayerState("playing");
            webAudioTimer.current = setInterval(() => {
              if (webAudioSound.current) {
                setCurrentTime(webAudioSound.current.seek());
              }
            }, 100);
          },
          onpause: () => {
            setPlayerState("paused");
            clearInterval(webAudioTimer.current);
          },
          onstop: () => {
            setPlayerState(undefined);
          },
          onseek: () => {},
          onend: () => {
            setPlayerState(undefined);
            clearInterval(webAudioTimer.current);
            setCurrentTime(webAudioSound.current!.seek());
          },
          loop: true,
          preload: true,
        });
      }
      return () => {
        Howler.unload();
        if (webAudioSound.current) {
          webAudioSound.current = undefined;
        }
        if (webAudioTimer.current) {
          clearInterval(webAudioTimer.current);
        }
      };
    },
    [isInBackground, currentFile],
  );

  useEffect(
    function updatePlaybackRate() {
      if (HTML5Sound.current && !isInBackground) {
        HTML5Sound.current.preservesPitch = false;
        HTML5Sound.current.playbackRate = playbackRate;
      }
    },
    [playbackRate],
  );

  useEffect(function setMinimizeListener() {
    function checkIfWindowInBackground() {
      setIsInBackground(document.hidden);
    }
    document.addEventListener("visibilitychange", checkIfWindowInBackground);
    return () => {
      document.removeEventListener(
        "visibilitychange",
        checkIfWindowInBackground,
      );
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playbackRate: 1,
        setPlaybackRate,
        isSongLoading,
        setSongLoading,
        duration,
        setDuration,
        audioBuffer,
        setAudioBuffer,
        playerState,
        setPlayerState,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        currentFile,
        setCurrentFile,
        isLooping,
        setIsLooping,
        isInBackground,
        setIsInBackground,
        HTML5Sound,
        webAudioTimer,
        webAudioSound,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
  //   if the device is not iOS, some of these are moot
}
