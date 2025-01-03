import styles from "./pkg.module.css";
import { motion } from "motion/react";

export default function GettingNothingDone() {
  return (
    <motion.div
      key={"gettingNothingDone"}
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
      <h1 className={styles["page__heading"]}>GETTING NOTHING DONE</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>
          lyrics <br />
          <br />
          Nothing works <br /> These bolts, they don't turn into their holes{" "}
          <br /> Remember where they went? <br /> Tried to make things make
          sense but <br /> Nothing works <br /> Looped into a curse I can't
          break What's my goal? Where did the time go? <br /> I'm stuck getting
          nothing done again I try to break out of cycles <br /> I'm still
          getting nothing done <br />
          Nothing at all <br /> What's my goal? Where did the time go? <br />{" "}
          I'm stuck getting nothing done again <br /> I try to break out of
          cycles <br /> I'm still getting nothing done
        </p>
      </div>
    </motion.div>
  );
}
