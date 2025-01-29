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

import { Howl } from "howler";
import { FaToolbox } from "react-icons/fa";
import { MdEmail, MdHome, MdInfo } from "react-icons/md";
import { PiCassetteTapeFill } from "react-icons/pi";
import { songsArray } from "./utils/constants";

type PlayerStateType = "stopped" | "playing" | "paused" | undefined;

export default function App() {
  //  ------------------------------------------- //
  //              STATE/REF DELCARATIONS          //
  //  ------------------------------------------- //

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
  const webAudioTimer = useRef<number>();
  const webAudioSound = useRef<Howl>();

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

  //  ------------------------------------------- //
  //                     HOOKS                    //
  //  ------------------------------------------- //

  useEffect(
    function loadAudioOnFileChange() {
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
    },
    [currentFile],
  );

  useEffect(
    function handleVolumeChange() {
      if (HTML5Sound.current) HTML5Sound.current.volume = volume;
    },
    [volume],
  );

  useEffect(
    function handlePitchChange() {
      HTML5Sound.current!.playbackRate = playbackRate;
    },
    [playbackRate],
  );

  useEffect(
    function handleAutoPlay() {
      if (audioBuffer && HTML5Sound.current) {
        HTML5Sound.current?.play();
        setPlayerState("playing");
      }
    },
    [audioBuffer],
  );

  return (
    <div className={styles["page"]}>
      {/* <audio
        playsInline
        preload="true"
        x-webkit-airplay="allow"
        x-webkit-playsinline="true"
        webkit-playsinline="true"
        controls={false}
        loop={isLooping}
        muted={!isInBackground}
        onLoad={() => {
          if (playerState === "playing") HTML5Sound.current?.play();
        }}
        onLoadedData={() => {
          HTML5Sound.current!.playbackRate = playbackRate;
          HTML5Sound.current!.preservesPitch = false;
          setDuration(HTML5Sound.current!.duration);
          HTML5Sound.current?.play();
        }}
        onPlay={() => {
          if (!isInBackground) {
            HTML5Sound.current?.pause();
          }

          setPlayerState("playing");
        }}
        onEnded={() => {
          if (HTML5Sound.current && !isLooping) {
            setCurrentFile("");
            setPlayerState(undefined);
          }
        }}
        onPause={() => setPlayerState(currentTime === 0 ? undefined : "paused")}
        ref={HTML5Sound}
        src={currentFile}
        onTimeUpdate={() => {
          if (HTML5Sound.current) {
            setCurrentTime(HTML5Sound.current.currentTime);
          }
        }}
      /> */}

      <audio
        onTimeUpdate={() => {
          setCurrentTime(HTML5Sound.current!.currentTime);
        }}
        onLoadedData={() => {
          HTML5Sound.current!.playbackRate = playbackRate;
          HTML5Sound.current!.preservesPitch = false;
          setDuration(HTML5Sound.current!.duration);
          HTML5Sound.current?.play();
        }}
        onPlay={() => {
          if (HTML5Sound.current) {
            HTML5Sound.current!.playbackRate = playbackRate;
            HTML5Sound.current!.preservesPitch = false;
          }
        }}
        onEnded={() => {
          if (HTML5Sound.current && !isLooping) {
            setCurrentFile("");
            setPlayerState(undefined);
          }
        }}
        ref={HTML5Sound}
        src={audioBuffer}
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
                          isLooping={isLooping}
                          setIsLooping={setIsLooping}
                          isSongLoading={isSongLoading}
                          duration={duration}
                          currentTime={currentTime}
                          setCurrentTime={setCurrentTime}
                          sound={HTML5Sound}
                          currentFile={currentFile}
                          setCurrentFile={setCurrentFile}
                          volume={volume}
                          setVolume={setVolume}
                          playerState={playerState}
                          setPlayerState={setPlayerState}
                          playbackSpeed={playbackRate}
                          setPlaybackSpeed={setPlaybackRate}
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
