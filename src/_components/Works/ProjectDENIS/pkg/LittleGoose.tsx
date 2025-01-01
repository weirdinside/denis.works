import ReactPlayer from "react-player";
import styles from "./pkg.module.css";
import { motion } from "motion/react";

export default function LittleGoose() {
  return (
    <motion.div
      key={"littleGoose"}
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
      <h1 className={styles["page__heading"]}>LITTLE GOOSE</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>lyrics</p>
        <p className={styles["page__text"]}>
          Goose!
          <br /> How'd I do? <br /> Gave you all I knew <br /> I hope it's
          enough for you <br /> Goose! Who'd have knew? <br /> That you'd be
          swimming on <br /> In another distant pond <br /> My goose, little
          goose <br /> How fast you learned to fly <br /> Out of my wings and
          into the night
        </p>
      </div>
      <br />
      <ReactPlayer
        width={"auto"}
        height={"100%"}
        style={{ aspectRatio: "9/16" }}
        controls={true}
        url={"https://www.youtube.com/watch?v=Y3Z-Ji4w-Vk"}
      ></ReactPlayer>
    </motion.div>
  );
}
