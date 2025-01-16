import styles from "./TapePlayer.module.css";
import { useEffect, useState, useRef } from "react";
import { MdFastForward, MdPlayArrow, MdPause, MdStop } from "react-icons/md";
import Knob from "./Knob/Knob";

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
  currentTime,
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
  currentTime: number;
}) {
  const [cachedPlaybackSpeed, setCachedSpeed] = useState<number>(1);
  const [cachedVolume, setCachedVolume] = useState<number>(1);
  const [speedRotation, setSpeedRotation] = useState<number>(0);

  function playAudio() {
    audioPlayerRef.current!.play();
    audioPlayerRef.current!.playbackRate = playbackSpeed;
    audioPlayerRef.current!.volume = volume;
    setPlayerState("playing");
  }

  function pauseAudio() {
    audioPlayerRef.current!.pause();
    setPlayerState("paused");
  }

  function stopAudio() {
    setPlayerState("stopped");
    audioPlayerRef.current!.pause();
    audioPlayerRef.current!.currentTime = 0;
  }

  useEffect(
    function setCurrentVolume() {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.volume = volume;
      }
    },
    [volume, audioPlayerRef],
  );

  useEffect(
    function setCurrentPlaybackRate() {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.preservesPitch = false;
        audioPlayerRef.current.playbackRate = playbackSpeed;
      }
    },
    [playbackSpeed, audioPlayerRef],
  );

  return (
    <div className={styles["page"]}>
      <div className={styles["page__content"]}>
        <div className={styles["page__header"]}>
          <h1 className={styles["header__title"]}>
            AUDIO PLAYER
            <span className={styles["page__header_sub"]}>
              PROTOTYPE = TAPE_PLAYER
              <br />
              VERSION = DNSWRKS_1.0.1
              <br />
              DEVELOPER = AB@WI_2025
            </span>
          </h1>

          <div className={styles["header__knobs"]}>
            <label
              className={styles["header__detail"]}
              style={{ display: "flex", flexDirection: "column" }}
            >
              speed {Math.round(playbackSpeed * 100)}%
            </label>
            <label
              className={styles["header__detail"]}
              style={{ display: "flex", flexDirection: "column" }}
            >
              volume {Math.round(volume * 100)}%
            </label>
          </div>
        </div>

        <div className={styles["page__content_player"]}>
          <div className={styles["tape__visual"]}>
            <div className={styles["tape__main"]}></div>

            <div
              className={`${styles["tape__reel"]} ${styles["left"]} ${
                playerState === "playing" && styles["playing"]
              }`}
            ></div>
            <div
              className={`${styles["tape__reel"]} ${styles["right"]} ${
                playerState === "playing" && styles["playing"]
              }`}
            ></div>
          </div>
          <div className={styles["knobs"]}>
            <div className={styles["knob"]}>
              <Knob
                startAngle={-140}
                endAngle={140}
                startValue={0.5}
                endValue={1.5}
                defaultValue={playbackSpeed}
                snap={true}
                step={0.01}
                value={playbackSpeed}
                setValue={setPlaybackSpeed}
              ></Knob>
            </div>
            <div className={styles["knob"]}>
              <Knob
                startAngle={-140}
                endAngle={140}
                startValue={0}
                endValue={1}
                defaultValue={volume}
                snap={true}
                step={0.05}
                value={volume}
                setValue={setVolume}
              ></Knob>
            </div>
          </div>
          <div className={styles["player__buttons"]}>
            <button
              className={`${styles["button"]} ${styles["play"]} ${
                playerState === "playing" && styles["active"]
              }`}
              onClick={playAudio}
            >
              <MdPlayArrow size={25} />
            </button>
            <button
              className={`${styles["button"]} ${styles["pause"]} ${
                playerState === "paused" && styles["active"]
              }`}
              onClick={pauseAudio}
            >
              <MdPause size={25} />
            </button>
            <button
              className={`${styles["button"]} ${styles["stop"]}`}
              onClick={stopAudio}
            >
              <MdStop size={25} />
            </button>
            <button
              className={`${styles["button"]} ${styles["ff"]}`}
              onTouchStart={() => {
                setCachedSpeed(playbackSpeed);
                setPlaybackSpeed(2);
                playAudio();
              }}
              onTouchEnd={() => {
                setPlaybackSpeed(cachedPlaybackSpeed);
              }}
              onMouseDown={() => {
                setCachedSpeed(playbackSpeed);

                setPlaybackSpeed(2);
                playAudio();
              }}
              onMouseUp={() => {
                setPlaybackSpeed(cachedPlaybackSpeed);
              }}
            >
              <MdFastForward size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
