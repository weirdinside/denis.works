import styles from "./App2.module.css";

export default function App2() {
  return (
    <div className={styles["page"]}>
      <div className={styles["page__overlay"]}></div>
      <div className={styles["header__controls"]}></div>
      <div className={styles["frame"]}>
        <div className={styles["dirt__overlay"]}></div>
        <div className={styles["frame__title"]}>
          <h1 className={styles["frame__title_heading"]}>
            denis.works<span style={{ fontWeight: "200" }}> MKII</span>
          </h1>
        </div>
        <div className={styles["frame__content"]}>
          <div className={styles["frame__test"]}>
            <div className={styles["frame__test_OS"]}>
              denisOS 2.0.1 <br /> verbose boot
            </div>
          </div>
        </div>
      </div>
      <div className={styles["footer__controls"]}>
        <div className={styles["footer__button"]}>
          <p className={styles["footer__button_label"]}>Home</p>
        </div>
        <div className={styles["footer__button"]}>
          {" "}
          <p className={styles["footer__button_label"]}>Tools</p>
        </div>
        <div className={styles["footer__button"]}>
          <p className={styles["footer__button_label"]}>Store</p>
        </div>
        <div className={styles["footer__button"]}>
          <p className={styles["footer__button_label"]}>Photo</p>
        </div>
        <div className={styles["footer__button"]}>
          <p className={styles["footer__button_label"]}>Mail</p>
        </div>
        {/* <div className={styles["footer__knob"]}>
        {" "}
        <p className={styles["footer__button_label"]}>Volume</p>
      </div> */}
      </div>
    </div>
  );
}
