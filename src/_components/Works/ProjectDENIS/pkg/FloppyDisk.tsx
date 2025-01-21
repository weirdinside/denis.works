import { Suspense } from "react";
import Image from "../../../Image3D";
import styles from "./pkg.module.css";
import { motion } from "motion/react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import floppyDiskArt from "../../../../assets/images/floppydisk_altart.jpg";
import { ASCII, EffectComposer } from "@react-three/postprocessing";

export default function FloppyDisk() {
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
      <h1 className={styles["page__heading"]}>FLOPPY DISK</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>lyrics</p>
        <p className={styles["page__text"]}>
          Oh that old thing <br /> Won't remember on its own it's <br />
          Dissolving, but turning through and I'm picking up pieces of it <br />{" "}
          Tickets you saved from the fair <br /> Next to a sketch of a purple
          bear <br /> A letter to a good friend <br /> And the address that used
          to be theirs <br /> Pictures you put on a page <br /> Taking a note of
          the day <br /> Anything you could remember <br /> Trust in you to keep
          it safe
        </p>
        <div className={styles["page__canvas-container"]}>
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
              <Image image={floppyDiskArt} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </motion.div>
  );
}
