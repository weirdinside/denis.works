import styles from "./About.module.css";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ASCII, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import denisPhoto from "../../assets/images/denisbiblioni_user.jpeg";
import { AnimatePresence, motion } from "motion/react";

function Image() {
  const texture = useLoader(THREE.TextureLoader, denisPhoto);
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[8, 6]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function About() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"about"}
        initial={{ maxWidth: "0%" }}
        animate={{ maxWidth: "100%" }}
        exit={{ maxWidth: "0%" }}
        className={styles["page"]}
      >
        <h1 className={styles["heading"]}>ABOUT DENIS</h1>
        Denis Biblioni (a figment of my imagination) is a mechanic living in the
        countryside of [REDACTED]. He doesn't know how to make music or use the
        internet, but he is definitely trying. This system is an automatic
        archival device designed to document his mysterious existence.
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%",
            width: "auto",
          }}
        >
          <Canvas className={styles["page__canvas"]}>
            <EffectComposer>
              <ASCII cellSize={5}></ASCII>
            </EffectComposer>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <Image />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
