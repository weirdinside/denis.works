import React from "react";
import styles from "./Readme.module.css";

export default function Readme() {
  return (
    <div className={styles["page"]}>
      <h1 className={styles["page__heading"]}>README.md</h1>
      <p className={styles["page__content"]}>
        DENIS [EP] was created over the course of 6 months. Just over 50 songs
        were created during its process, though only 6 were completed.
        <br />
      </p>
    </div>
  );
}
