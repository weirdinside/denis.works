import styles from "./TapePlayer.module.css";
import { useEffect, useState } from "react";
import { MdFastForward, MdPlayArrow, MdPause, MdStop } from "react-icons/md";
import Knob from "./Knob/Knob";
import { songsArray } from "../../utils/constants";

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
    [volume],
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
          <div className={styles["controls__container"]}>
            <div className={styles["knobs"]}>
              <div className={styles["knob__container"]}>
                <div className={styles["knob"]}>
                  <Knob
                    startAngle={-140}
                    endAngle={140}
                    startValue={0.5}
                    endValue={1.5}
                    defaultValue={1}
                    snap={true}
                    step={0.01}
                    value={playbackSpeed}
                    setValue={setPlaybackSpeed}
                  ></Knob>
                </div>
                <label
                  className={styles["knob__label"]}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  speed <br /> <span>{Math.round(playbackSpeed * 100)}%</span>
                </label>
              </div>
              <div className={styles["knob__container"]}>
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
                <label
                  className={styles["knob__label"]}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  volume <br />
                  {Math.round(volume * 100)}%
                </label>
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
        <div className={styles["song-selector"]}>
          {songsArray.map((song, idx) => {
            return (
              <div
                key={idx}
                onTouchEnd={() => {
                  setCurrentFile(song.url);
                }}
                onMouseUp={() => {
                  setCurrentFile(song.url);
                }}
                className={`${styles["song-selector__block"]} ${
                  song.url === currentFile && styles["active"]
                }`}
              >
                {song.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
