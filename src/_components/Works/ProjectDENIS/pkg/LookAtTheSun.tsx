import styles from "./pkg.module.css";
import { motion } from "motion/react";

export default function LookAtTheSun() {
  return (
    <motion.div
      key={"lookAtTheSun"}
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
      <h1 className={styles["page__heading"]}>LOOK AT THE SUN!</h1>
      <div className={styles["page__content"]}>
        no lyrics. thank you for listening.
      </div>
    </motion.div>
  );
}
