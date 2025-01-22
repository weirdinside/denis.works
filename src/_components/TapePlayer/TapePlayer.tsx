import { RefObject, useEffect, useRef, useState } from "react";
import { MdFastForward, MdPause, MdPlayArrow, MdStop } from "react-icons/md";
import { songsArray } from "../../utils/constants";
import Slider from "./Slider/Slider";
import styles from "./TapePlayer.module.css";
import { useAudioPlayer } from "../../contexts/useAudioPlayer";

type PlayerStateType = "stopped" | "playing" | "paused" | undefined;

export default function TapePlayer({
  sound,
  playerState,
  playbackSpeed,
  volume,
  duration,
  currentTime,
  setCurrentTime,
  currentFile,
  isSongLoading,
  setCurrentFile,
  setVolume,
  setPlaybackSpeed,
  setPlayerState,
}: {
  duration: number;
  isSongLoading: boolean;
  currentTime: number;
  setCurrentTime: (arg0: number) => void;
  sound: RefObject<HTMLAudioElement>;
  playbackSpeed: number;
  currentFile: string;
  setCurrentFile: (arg0: string) => void;
  volume: number;
  setVolume: (arg0: number) => void;
  playerState: PlayerStateType;
  setPlaybackSpeed: (arg0: number) => void;
  setPlayerState: (arg0: PlayerStateType) => void;
}) {
  document.title = "denis.works - audio player";

  const [cachedPlaybackSpeed, setCachedPlaybackSpeed] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>();
  const songListRef = useRef<HTMLUListElement>(null);
  const messageTimeoutRef = useRef<number>();
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const { isBuffering, changePlaybackRate } = useAudioPlayer(sound);

  function formatSecondsToMinutes(timeInSeconds: number) {
    const leftoverSeconds = String((timeInSeconds % 60).toFixed(0));
    return `${Math.floor(timeInSeconds / 60)}:${
      leftoverSeconds.length === 1 ? `0${leftoverSeconds}` : leftoverSeconds
    }`;
  }

  async function handleRateChange(rate: number) {
    await changePlaybackRate(rate);
    if (sound.current) setPlaybackSpeed(rate);
  }

  function setMessage(message: string) {
    if (errorMessage) return;
    setErrorMessage(message);
    if (songListRef.current) songListRef.current.scrollTop = 0;
    messageTimeoutRef.current = setTimeout(() => {
      setErrorMessage(undefined);
    }, 2000);
  }

  function handleFFwd() {
    if (currentFile === "" || currentFile === undefined) {
      setMessage("select a song");
    } else {
      setCachedPlaybackSpeed(playbackSpeed);
      sound.current!.playbackRate = 3;
    }
  }

  function handleCancelFFwd() {
    sound.current!.playbackRate = cachedPlaybackSpeed;
  }

  function handlePlay() {
    if (sound.current && sound.current.playbackRate === 3)
      sound.current.playbackRate = playbackSpeed;
    if (!sound.current?.paused) return;
    if (currentFile === "" || currentFile === undefined) {
      setMessage("select a song");
    } else {
      sound.current.play();
      setPlayerState("playing");
    }
  }

  function handlePause() {
    if (currentFile === "" || currentFile === undefined) {
      setMessage("select a song");
    } else {
      setPlayerState("paused");
      sound.current!.pause();
    }
  }

  function handleStop() {
    setCurrentTime(0);
    setPlayerState("stopped");
    setCurrentFile("");
  }

  function handleSeek(time: number) {
    if (currentFile === "" || currentFile === undefined) {
      setMessage("select a song");
    } else {
      if (sound.current) {
        sound.current.currentTime = time;
      }
    }
  }

  useEffect(function spacebarEventListener() {
    function handleSpacebar(e: KeyboardEvent) {
      const isPlaying = !sound.current?.paused;
      if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        if (isPlaying) handlePause();
        if (!isPlaying) handlePlay();
      }
    }

    window.addEventListener("keyup", handleSpacebar);

    return () => {
      window.removeEventListener("keyup", handleSpacebar);
    };
  }, []);

  return (
    <div className={styles["page"]}>
      <div
        className={`${styles["page__loading"]} ${
          (isSongLoading || isBuffering) && styles["active"]
        }`}
      >
        loading ...{" "}
      </div>
      <div className={styles["tape-player"]}>
        <header className={styles["tape-player__header"]}>
          <h1 className={styles["header__logo"]}>
            audio <br /> player
          </h1>
          <p className={styles["header__text"]}>
            DW_AUDIO_DEVICE <br />
            DEVELOPED BY AB <br />
            LU: 01192025___ <br />
            PID: 03225_LP-2
          </p>
        </header>

        <ul
          ref={songListRef}
          style={errorMessage ? { overflowY: "hidden" } : {}}
          className={styles["song-selector"]}
        >
          <div
            className={`${styles["message-overlay"]} ${
              errorMessage && styles["active"]
            }`}
          >
            {errorMessage}
          </div>
          {songsArray.map((song, idx) => {
            return (
              <li
                onClick={() => {
                  if (currentFile === song.url) return;
                  if (sound.current) {
                    sound.current.src = "";
                    sound.current.pause;
                    setPlayerState("stopped");
                    sound.current.currentTime = 0;
                  }
                  setCurrentFile(song.url);
                }}
                key={idx}
                className={`${styles["song-selector__song"]} ${
                  currentFile === song.url && styles["active"]
                }`}
              >
                {song.title}
              </li>
            );
          })}
        </ul>
        <div className={styles["controls"]}>
          <div className={styles["buttons"]}>
            <button
              onClick={() => {
                handlePause();
              }}
              className={`${styles["button"]} ${styles["pause"]} ${
                playerState === "paused" && styles["active"]
              }`}
            >
              <MdPause size={21} />
            </button>
            <button
              onClick={() => {
                handlePlay();
              }}
              className={`${styles["button"]}  ${styles["play"]} ${
                playerState === "playing" && styles["active"]
              }`}
            >
              <MdPlayArrow size={21} />
            </button>
            <button
              onClick={() => {
                handleStop();
              }}
              className={`${styles["button"]} ${styles["stop"]}`}
            >
              <MdStop size={21} />
            </button>
            <button
              onPointerDown={handleFFwd}
              onPointerUp={handleCancelFFwd}
              onPointerCancel={handleCancelFFwd}
              className={`${styles["button"]} ${styles["ff"]}`}
            >
              <MdFastForward size={21} />
            </button>
          </div>
          <Slider
            setValue={handleRateChange}
            defaultValue={1}
            step={0.01}
            title={"speed"}
            value={playbackSpeed}
            min={0.5}
            max={1.75}
            showProgress={false}
            setValueOnMouseUp={isiOS}
          />
          <Slider
            setValue={handleSeek}
            defaultValue={1}
            step={0.01}
            title={"seek"}
            interpolationFunction={formatSecondsToMinutes}
            value={currentTime}
            min={0}
            max={duration ? duration : 0}
            showProgress={false}
            setValueOnMouseUp={true}
          />
          <Slider
            setValue={setVolume}
            defaultValue={1}
            step={0.05}
            title={"volume"}
            value={volume}
            min={0}
            max={1}
            showProgress={true}
          />
        </div>
      </div>
    </div>
  );
}
