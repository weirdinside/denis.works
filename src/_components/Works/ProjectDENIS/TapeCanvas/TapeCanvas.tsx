import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ASCII, EffectComposer, Pixelation } from "@react-three/postprocessing";
import { AnimatePresence, motion } from "motion/react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import TapeMesh from "../TapeMesh/TapeMesh";
import styles from "./TapeCanvas.module.css";

export default function TapeCanvas() {
  return (
    <AnimatePresence>
      <motion.div
        key={"tape-canvas"}
        initial={{ maxWidth: "0%" }}
        animate={{ maxWidth: "100%" }}
        exit={{ maxWidth: "0%" }}
        transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
        className={styles["page"]}
      >
        <h1 className={styles["page__heading"]}>'DENIS' AUDIO CASSETTE TAPE</h1>
        <div className={styles["page__content"]}>
          designed by `weird inside` and `©JOYCE` in new jersey and california
          <br />
          <br />
          run of 40 tapes manufactured and assembled by denis biblioni in new
          jersey
          <br />
          <br />
          <Link
            target="_blank"
            to="https://denisbiblioni.bandcamp.com/album/denis"
          >
            <span className={styles["link"]}>
              {" "}
              available for purchase on denisbiblioni.bandcamp.com
            </span>
          </Link>
        </div>
        <div className={styles["canvas__container"]}>
          <Suspense
            fallback={
              <div
                style={{
                  aspectRatio: "0.5/1",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  color: "#f4fffe",
                }}
              >
                LOADING
              </div>
            }
          >
            <Canvas
              style={{ aspectRatio: "0.5/1" }}
              shadows
              dpr={[1, 2]}
              camera={{ fov: 70, position: [8, 0, 4] }}
            >
              <ambientLight intensity={20}></ambientLight>
              <EffectComposer>
                <ASCII invert={false} cellSize={3}></ASCII>
                {/* <ColorAverage></ColorAverage> */}
                <Pixelation granularity={0}></Pixelation>
              </EffectComposer>
              <TapeMesh></TapeMesh>
              {/* <Environment preset="sunset"></Environment> */}
              <OrbitControls
                autoRotateSpeed={-2}
                autoRotate={true}
                enableZoom={false}
                enablePan={false}
              ></OrbitControls>
            </Canvas>
          </Suspense>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
