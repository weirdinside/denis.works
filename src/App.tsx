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
import { songsArray } from "./utils/constants";

type PlayerStateType = "stopped" | "playing" | "paused" | undefined;

export default function App() {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isSongLoading, setSongLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [audioBuffer, setAudioBuffer] = useState<string>("");
  const [playerState, setPlayerState] = useState<PlayerStateType>("stopped");
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentFile, setCurrentFile] = useState<string>("");

  const sound = useRef<HTMLAudioElement>(null);

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

  useEffect(
    function loadAudioOnFileChange() {
      if (!currentFile)
        // get blobUrl

        // set proper behaviors for audio tag
        sound.current!.playbackRate = playbackSpeed;
      sound.current!.preservesPitch = false;

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
    },
    [currentFile],
  );

  useEffect(
    function handleVolumeChange() {
      if (sound.current) sound.current.volume = volume;
    },
    [volume],
  );

  useEffect(
    function handlePitchChange() {
      sound.current!.playbackRate = playbackSpeed;
    },
    [playbackSpeed],
  );

  useEffect(
    function handleAutoPlay() {
      if (audioBuffer && sound.current) {
        sound.current?.play();
        setPlayerState("playing");
      }
    },
    [audioBuffer],
  );

  return (
    <div className={styles["page"]}>
      <audio
        onTimeUpdate={() => {
          setCurrentTime(sound.current!.currentTime);
        }}
        onLoadedData={() => {
          sound.current!.playbackRate = playbackSpeed;
          sound.current!.preservesPitch = false;
          setDuration(sound.current!.duration);
          sound.current?.play();
        }}
        onPlay={() => {
          if (sound.current) {
            sound.current!.playbackRate = playbackSpeed;
            sound.current!.preservesPitch = false;
          }
        }}
        ref={sound}
        src={audioBuffer}
        playsInline
        preload="true"
        x-webkit-airplay="allow"
        x-webkit-playsinline="true"
        webkit-playsinline="true"
        controls={false}
        loop={false}
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
