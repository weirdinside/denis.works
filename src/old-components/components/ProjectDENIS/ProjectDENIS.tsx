import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import styles from "./ProjectDENIS.module.css";
import TapeMesh from "./TapeMesh/TapeMesh";

export default function ProjectDENIS() {
  return (
    <div className={styles["canvas"]}>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 70, position: [10, 0, 4] }}>
        <EffectComposer>
          <Grid></Grid>
          <Outline></Outline>
        </EffectComposer>
        <Environment background={false} preset="sunset"></Environment>
        <TapeMesh></TapeMesh>
        <OrbitControls
          autoRotateSpeed={-2}
          autoRotate={true}
          enableZoom={false}
        ></OrbitControls>
      </Canvas>
    </div>
  );
}
