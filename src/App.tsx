import { Howl } from "howler";
import styles from "./App.module.css";

import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./_components/Home/Home";
import NotFound from "./_components/NotFound/NotFound";
import TapePlayer from "./_components/TapePlayer/TapePlayer";

import Button from "./_components/Button/Button";
import Works from "./_components/Works/Works";

import ProjectDENIS from "./_components/Works/ProjectDENIS/ProjectDENIS";
import TapeCanvas from "./_components/Works/ProjectDENIS/TapeCanvas/TapeCanvas";
import ProjectTheUsual from "./_components/Works/ProjectTheUsual/ProjectTheUsual";

import About from "./_components/About/About";
import Contact from "./_components/Contact/Contact";

import Press from "./_components/Works/ProjectDENIS/Press/Press";
import Readme from "./_components/Works/ProjectDENIS/Readme/Readme";
import DoesItRainThere from "./_components/Works/ProjectDENIS/pkg/DoesItRainThere";
import FloppyDisk from "./_components/Works/ProjectDENIS/pkg/FloppyDisk";
import GettingNothingDone from "./_components/Works/ProjectDENIS/pkg/GettingNothingDone";
import LittleGoose from "./_components/Works/ProjectDENIS/pkg/LittleGoose";
import LookAtTheSun from "./_components/Works/ProjectDENIS/pkg/LookAtTheSun";
import PasswordProtected from "./_components/Works/ProjectDENIS/pkg/PasswordProtected";

import { FaToolbox } from "react-icons/fa";
import { MdEmail, MdHome, MdInfo } from "react-icons/md";
import { PiCassetteTapeFill } from "react-icons/pi";

type PlayerStateType = "stopped" | "playing" | "paused" | undefined;

export default function App() {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSongLoading, setSongLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PlayerStateType>("stopped");
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<string>("");

  const audioElement = useRef<HTMLAudioElement>(null);
  const sound = useRef<Howl>();
  const timer = useRef<number>();
  const sourceNode = useRef<MediaElementAudioSourceNode>();
  const isAudioConnected = useRef<boolean>(false);

  const audioContext = useRef<AudioContext>();

  useEffect(
    function initializeHowl() {
      if (!currentFile) return;

      if (sound.current) {
        sound.current.unload();
      }

      Howler.unload();
      setSongLoading(true);
      Howler.autoSuspend = false;
      Howler.usingWebAudio = true;

      const unlockAudioContext = async () => {
        if (Howler.ctx?.state === "suspended" || "") {
          await Howler.ctx.resume();
        }
      };

      if (!audioContext.current) {
        audioContext.current = new window.AudioContext();
      }

      if (audioElement.current && !sourceNode.current) {
        try {
          sourceNode.current = audioContext.current.createMediaElementSource(
            audioElement.current,
          );
          sourceNode.current.connect(audioContext.current.destination);
        } catch (error) {
          console.warn("Audio routing setup error:", error);
        }
      }

      document.addEventListener("click", unlockAudioContext);
      document.addEventListener("touchstart", unlockAudioContext);
      document.addEventListener("keydown", unlockAudioContext);

      sound.current = new Howl({
        format: ["mp3"],
        src: [currentFile],
        html5: false,
        onload: () => {
          sound.current!.volume(volume);
          setDuration(sound.current!.duration());
          setSongLoading(false);
          setPlayerState("playing");
          sound.current!.play();
        },
        onloaderror: () => {
          setSongLoading(false);
        },
        rate: playbackSpeed,
        onplay: () => {
          if (Howler.ctx?.state === "suspended") {
            Howler.ctx.resume();
          }
          audioElement.current!.play();
          setPlayerState("playing");
          timer.current = setInterval(() => {
            setCurrentTime(sound.current!.seek());
          }, 100);
        },
        onpause: () => {
          audioElement.current!.pause();
          setPlayerState("paused");
          clearInterval(timer.current);
        },
        onstop: () => {
          audioElement.current!.pause();
          setPlayerState(undefined);
        },
        onend: () => {
          audioElement.current!.pause();
          setPlayerState(undefined);
          clearInterval(timer.current);
          setCurrentTime(duration);
        },
        preload: true,
      });

      if ("mediaSession" in navigator) {
        console.log("yes");
        navigator.mediaSession.metadata = new MediaMetadata({
          title: "tape player",
          artist: "denis biblioni",
          album: "denis.works",
        });

        navigator.mediaSession.setActionHandler("play", () => {
          if (sound.current) sound.current.play();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          if (sound.current) sound.current.pause();
        });
      }

      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (sound.current?.playing()) {
            Howler.ctx?.resume();
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        if (sound.current) {
          sound.current.unload();
        }
        if (timer.current) {
          clearInterval(timer.current);
        }
        if (sourceNode.current && isAudioConnected.current) {
          sourceNode.current.disconnect();
          isAudioConnected.current = false;
        }
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
        document.removeEventListener("click", unlockAudioContext);
        document.removeEventListener("touchstart", unlockAudioContext);
        document.removeEventListener("keydown", unlockAudioContext);
      };
    },
    [currentFile],
  );

  useEffect(
    function trackPlaybackSpeed() {
      if (sound.current) {
        sound.current.rate(playbackSpeed);
      }
    },
    [playbackSpeed],
  );

  useEffect(
    function trackVolume() {
      if (sound.current) {
        sound.current.volume(volume);
      }
    },
    [volume],
  );

  return (
    <div className={styles["page"]}>
      <audio
        ref={audioElement}
        playsInline
        preload="true"
        x-webkit-airplay="allow"
        x-webkit-playsinline="true"
        webkit-playsinline="true"
        controls={false}
        loop={true}
      ></audio>
      <div className={styles["page__overlay"]}></div>
      <div className={styles["page__content"]}>
        <div className={styles["screen"]}>
          <div className={styles["screen__overlay_dirt"]}></div>
          <div className={styles["screen__overlay_fingerprints"]}></div>
          <h3 className={styles["screen__header_title"]}>
            single voice multimedia filesystem
          </h3>
          <div className={styles["frame"]}>
            <div className={styles["frame__content"]}>
              <AnimatePresence mode="wait">
                <Routes location={location}>
                  <Route path="/" element={<Home />}>
                    <Route
                      path="/tape"
                      element={
                        <TapePlayer
                          isSongLoading={isSongLoading}
                          duration={duration}
                          currentTime={currentTime}
                          setCurrentTime={setCurrentTime}
                          sound={sound}
                          currentFile={currentFile}
                          setCurrentFile={setCurrentFile}
                          volume={volume}
                          setVolume={setVolume}
                          playerState={playerState}
                          setPlayerState={setPlayerState}
                          playbackSpeed={playbackSpeed}
                          setPlaybackSpeed={setPlaybackSpeed}
                        />
                      }
                    ></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/works" element={<Works />}>
                      <Route path="denis-ep" element={<ProjectDENIS />}>
                        <Route path="readme" element={<Readme />}></Route>
                        <Route path="press" element={<Press />}></Route>
                        <Route path="cassette" element={<TapeCanvas />}></Route>
                        <Route
                          path="01-floppy-disk"
                          element={<FloppyDisk />}
                        ></Route>
                        <Route
                          path="02-password-protected"
                          element={<PasswordProtected />}
                        ></Route>
                        <Route
                          path="03-does-it-rain-there"
                          element={<DoesItRainThere />}
                        ></Route>
                        <Route
                          path="04-little-goose"
                          element={<LittleGoose />}
                        ></Route>
                        <Route
                          path="05-getting-nothing-done"
                          element={<GettingNothingDone />}
                        ></Route>
                        <Route
                          path="06-look-at-the-sun"
                          element={<LookAtTheSun />}
                        ></Route>
                      </Route>
                      <Route
                        path="the-usual"
                        element={<ProjectTheUsual />}
                      ></Route>
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              </AnimatePresence>
            </div>
          </div>
          <h1 className={styles["screen__footer_title"]}>
            denis.works <span style={{ fontWeight: "200" }}>MKII</span>
          </h1>
        </div>
        <div className={styles["buttons"]}>
          <Button
            title="Home"
            path="home"
            icon={<MdHome />}
            size="50%"
          ></Button>
          <Button
            title="Works"
            path="works"
            icon={<FaToolbox />}
            size="50%"
          ></Button>
          <Button
            title="About"
            path="about"
            icon={<MdInfo />}
            size="50%"
          ></Button>
          <Button
            title="Contact"
            path="contact"
            icon={<MdEmail />}
            size="50%"
          ></Button>
          <Button
            title="Audio"
            path="tape"
            icon={<PiCassetteTapeFill />}
            size="50%"
          ></Button>
        </div>
      </div>
    </div>
  );
}
