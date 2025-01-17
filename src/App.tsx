import styles from "./App.module.css";

import { AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

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

type PlayerStateType = "stopped" | "playing" | "paused";

function LocationProvider({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

function RoutesWithAnimation({
  audioPlayerRef,

  playbackSpeed,
  volume,
  currentFile,

  setCurrentFile,
  setVolume,
  setPlaybackSpeed,
  setPlayerState,
  playerState,
}: {
  audioPlayerRef: React.RefObject<HTMLAudioElement | null>;

  playbackSpeed: number;
  volume: number;
  currentFile: string;
  setCurrentFile: (arg0: string) => void;
  setVolume: (arg0: number) => void;
  setPlaybackSpeed: (arg0: number) => void;
  setPlayerState: (arg0: PlayerStateType) => void;
  playerState: PlayerStateType;
}) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Home />}>
          <Route
            path="/tape"
            element={
              <TapePlayer
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                volume={volume}
                setVolume={setVolume}
                playerState={playerState}
                setPlayerState={setPlayerState}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                audioPlayerRef={audioPlayerRef}
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
              <Route path="01-floppy-disk" element={<FloppyDisk />}></Route>
              <Route
                path="02-password-protected"
                element={<PasswordProtected />}
              ></Route>
              <Route
                path="03-does-it-rain-there"
                element={<DoesItRainThere />}
              ></Route>
              <Route path="04-little-goose" element={<LittleGoose />}></Route>
              <Route
                path="05-getting-nothing-done"
                element={<GettingNothingDone />}
              ></Route>
              <Route
                path="06-look-at-the-sun"
                element={<LookAtTheSun />}
              ></Route>
            </Route>
            <Route path="the-usual" element={<ProjectTheUsual />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [playerState, setPlayerState] = useState<PlayerStateType>("stopped");
  const [volume, setVolume] = useState<number>(1);

  const [currentFile, setCurrentFile] = useState<string>("");

  return (
    <div className={styles["page"]}>
      <audio
        onLoadedData={() => {
          audioPlayerRef.current?.play();
        }}
        onEnded={() => {
          setPlayerState("stopped");
        }}
        onPlay={() => {
          setPlayerState("playing");
        }}
        onPause={() => {
          setPlayerState("paused");
        }}
        ref={audioPlayerRef}
        src={currentFile}
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
              <LocationProvider>
                <RoutesWithAnimation
                  currentFile={currentFile}
                  setCurrentFile={setCurrentFile}
                  volume={volume}
                  setVolume={setVolume}
                  playerState={playerState}
                  setPlayerState={setPlayerState}
                  playbackSpeed={playbackSpeed}
                  setPlaybackSpeed={setPlaybackSpeed}
                  audioPlayerRef={audioPlayerRef}
                />
              </LocationProvider>
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
