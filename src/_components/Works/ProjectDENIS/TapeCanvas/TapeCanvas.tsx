import { OrbitControls } from "@react-three/drei";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
  ASCII,
  ColorAverage,
  EffectComposer,
  Pixelation,
} from "@react-three/postprocessing";
import styles from "./TapeCanvas.module.css";
import TapeMesh from "../TapeMesh/TapeMesh";
import { Suspense } from "react";

export default function TapeCanvas() {
  return (
    <div className={styles["page"]}>
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to="/works/denis-ep"
      >
        <div className={styles["back"]}>← DENIS EP</div>
      </Link>

      <Suspense
        fallback={
          <div style={{ backgroundColor: "white", color: "white" }}>
            loading
          </div>
        }
      >
        <Canvas
          style={{ width: "100%" }}
          shadows
          dpr={[1, 2]}
          camera={{ fov: 70, position: [10, 0, 4] }}
        >
          <EffectComposer>
            <ASCII cellSize={3}></ASCII>
            <ColorAverage></ColorAverage>
            <Pixelation granularity={0}></Pixelation>
          </EffectComposer>
          <TapeMesh></TapeMesh>
          <ambientLight intensity={4}></ambientLight>
          <OrbitControls
            autoRotateSpeed={-2}
            autoRotate={true}
            enableZoom={false}
          ></OrbitControls>
        </Canvas>
      </Suspense>
    </div>
  );
}
