import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ASCII, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import pswdProtectedArt from "../../../../assets/images/pswdprotected_altart.jpg";
import Image from "../../../Image3D";
import styles from "./pkg.module.css";
import { motion } from "motion/react";

export default function PasswordProtected() {
  return (
    <motion.div
      key={"floppy-disk"}
      initial={{ maxWidth: "0%" }}
      transition={{
        default: { type: "spring" },
        duration: 1,
        delay: 0,
        ease: "easeInOut",
      }}
      animate={{ maxWidth: "100%" }}
      exit={{ maxWidth: "0%" }}
      className={styles["page"]}
    >
      <h1 className={styles["page__heading"]}>PASSWORD PROTECTED</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>lyrics</p>
        <p className={styles["page__text"]}>
          Just out of reach, digits away <br />
          Password protected with no escape <br /> Losing faith behind a phrase
          I'd never find <br /> I'm out of touch, disconnected <br /> Password
          protected, can't decode it and break through <br /> Past C:/s of blue
          to ask <br /> Give me a clue Under dust <br /> Incomplete, in memory
          <br /> Buried beneath past the deepest roots of this tree <br /> I'm
          stuck without ways to get out <br />
          Won't you see me through <br />
          Just out of reach, never to end <br /> Password protected: message
          never sent <br /> Lost to time, locked inside <br /> I'm out of luck
        </p>
      </div>
      <div style={{ height: "100%", aspectRatio: "1/1" }}>
        <Canvas className={styles["page__canvas"]}>
          <EffectComposer>
            <ASCII invert={true} cellSize={3}></ASCII>
          </EffectComposer>
          <OrbitControls
            enablePan={false}
            autoRotate={true}
            enableZoom={false}
          />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Image image={pswdProtectedArt} />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
}
