import styles from "./Readme.module.css";
import { AnimatePresence, motion } from "motion/react";

export default function Readme() {
  document.title = "denis.works - DENIS EP readme";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ maxWidth: "0%" }}
        animate={{ maxWidth: "100%" }}
        exit={{ maxWidth: "0%" }}
        transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
        className={styles["page"]}
      >
        <h1 className={styles["page__heading"]}>README.md</h1>
        <p className={styles["page__content"]}>
          DENIS [EP] was created over the course of 6 months. Just over 50 songs
          were created during its process, though only 6 were deemed worthy
          enough to be completed. It was created using only 8 recorded tracks, a
          guitar, some synthesizers and sampled drums. DENIS explores themes of
          reconciling that which cannot be changed.
          <br /> <br />
          <span style={{ fontStyle: "italic" }}>
            AUTHOR'S NOTE: After 8 years of (mostly) staring at a computer to
            make music, animation and other media, I wanted to try a different
            approach to creating. In exploring creating music away from the
            infinite realm of a DAW, I found DENIS. I hope you enjoy listening
            to it as much as I enjoyed making it.
          </span>
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
