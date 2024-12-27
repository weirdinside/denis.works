import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className={styles["page"]}>
      <div className={styles["notfound__content"]}>
        <h1 className={styles["notfound__heading"]}>ERROR</h1>
        <Link to="/">
          <button className={styles["notfound__reset"]}>reset system</button>
        </Link>
      </div>
    </div>
  );
}
