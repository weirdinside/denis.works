import styles from "./TapePlayer.module.css";
import { useEffect, useState } from "react";
import { MdFastForward, MdPlayArrow, MdPause, MdStop } from "react-icons/md";
import Knob from "./Knob/Knob";
import { songsArray } from "../../utils/constants";
import Slider from "./Slider/Slider";

type PlayerStateType = "stopped" | "playing" | "paused";

export default function TapePlayer({
  audioPlayerRef,
  playerState,
  playbackSpeed,
  volume,
  currentFile,
  setCurrentFile,
  setVolume,
  setPlaybackSpeed,
  setPlayerState,
}: {
  audioPlayerRef: React.RefObject<HTMLAudioElement | null>;
  playbackSpeed: number;
  currentFile: string;
  setCurrentFile: (arg0: string) => void;
  volume: number;
  setVolume: (arg0: number) => void;
  playerState: PlayerStateType;
  setPlaybackSpeed: (arg0: number) => void;
  setPlayerState: (arg0: PlayerStateType) => void;
}) {
  const [cachedPlaybackSpeed, setCachedSpeed] = useState<number>(1);

  function playAudio() {
    audioPlayerRef.current!.play().catch(() => {
      setPlayerState("stopped");
    });
    audioPlayerRef.current!.playbackRate = playbackSpeed;
    audioPlayerRef.current!.volume = volume;
    setPlayerState("playing");
  }

  function pauseAudio() {
    audioPlayerRef.current!.pause();
    setPlayerState("paused");
  }

  function stopAudio() {
    audioPlayerRef.current!.pause();
    audioPlayerRef.current!.currentTime = 0;
    setPlayerState("stopped");
  }

  useEffect(
    function setCurrentVolume() {
      const currentVolume = volume;
      if (audioPlayerRef.current) {
        audioPlayerRef.current.volume = currentVolume;
      }
    },
    [volume]
  );

  useEffect(
    function setCurrentPlaybackRate() {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.preservesPitch = false;
        audioPlayerRef.current.playbackRate = playbackSpeed;
      }
    },
    [playbackSpeed, audioPlayerRef]
  );

  return (
    <div className={styles["page"]}>
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
        <ul className={styles["song-selector"]}>
          {songsArray.map((song, idx) => {
            return (
              <li key={idx} className={styles["song-selector__song"]}>
                {song.title}
              </li>
            );
          })}
        </ul>
        <div className={styles["controls"]}>
          <Slider
            setValue={setPlaybackSpeed}
            defaultValue={1}
            step={0.01}
            title={"speed"}
            value={playbackSpeed}
            min={0.75}
            max={1.5}
            showProgress={false}
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
