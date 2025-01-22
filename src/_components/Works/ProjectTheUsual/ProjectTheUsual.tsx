import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import theUsualArt from "../../../assets/images/theusual_altart.jpg";
import Image from "../../Image3D";
import styles from "./ProjectTheUsual.module.css";
import { ASCII } from "@react-three/postprocessing";

export default function TheUsual() {
  document.title = "denis.works - the usual*";
  return (
    <div className={styles["page"]}>
      <h1 className={styles["page__heading"]}>THE USUAL*</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>lyrics</p>
        <p className={styles["page__text"]}>
          Such is life
          <br /> And it changes
          <br /> Often enough that I don't mind
          <br /> Sitting still, <br />
          letting it roll over the hill
          <br /> I'll let it get out of hand every time
          <br /> And it changes
          <br /> Easy enough that I don't try <br />
          To follow along
          <br /> Just in case I could do it wrong
          <br /> And it happens
          <br /> Go on ahead, I'll be fine
        </p>
      </div>
      <div className={styles["page__canvas-container"]}>
        <Canvas className={styles["page__canvas"]}>
          <OrbitControls
            enablePan={false}
            autoRotate={true}
            enableZoom={false}
          />

          <EffectComposer>
            <ASCII cellSize={10}></ASCII>
          </EffectComposer>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Image image={theUsualArt} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
