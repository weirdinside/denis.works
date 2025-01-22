import styles from "./pkg.module.css";
import { motion } from "motion/react";

export default function DoesItRainThere() {
  document.title = "denis.works - does it rain there?";
  return (
    <motion.div
      key={"doesItRainThere"}
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
      <h1 className={styles["page__heading"]}>DOES IT RAIN THERE</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>
          Gone like a bird <br /> Seasons changed and you flew <br /> Away, and
          somewhere new Breathe in the air <br /> Of the grass coated in dew{" "}
          <br /> Does it still rain there too? <br /> Does it rain there? Does
          it rain there too? <br /> Are you still scared Of the change in you
          (changing hue)? <br /> Afraid...
        </p>
      </div>
    </motion.div>
  );
}
