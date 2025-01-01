import styles from "./Contact.module.css";
import { motion } from "motion/react";
export default function Contact() {
  return (
    <motion.div
      initial={{ maxWidth: "0%" }}
      animate={{ maxWidth: "100%" }}
      className={styles["page"]}
    >
      <h1 className={styles["page__heading"]}>CONTACT</h1>
      <div className={styles["page__content"]}>
        <p className={styles["page__text"]}>
          <a href="mailto:denisbiblioni@gmail.com">email me</a>
        </p>
      </div>
    </motion.div>
  );
}
