import styles from "./Works.module.css";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
export default function Works() {
  const { paths } = useContext(PathContext);

  return (
    <div className={styles["page"]}>
      <nav className={`${styles["nav"]}  ${paths[2] && styles["hidden"]}`}>
        <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
          <div className={styles["back"]}>← home</div>
        </Link>

        <ul className={styles["nav__list"]}>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="denis-ep"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[1] === "denis-ep" && styles["active"]
              }`}
            >
              DENIS EP
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="the-usual"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[1] === "the-usual" && styles["active"]
              }`}
            >
              the usual*
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
