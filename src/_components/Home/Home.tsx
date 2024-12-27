import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
import styles from "./Home.module.css";

export default function Home() {
  const { paths } = useContext(PathContext);

  return (
    <div className={styles["frame"]}>
      <div className={`${styles["page"]}  ${paths[1] && styles["hidden"]}`}>
        <nav className={`${styles["nav"]}`}>
          <div className={styles["folder"]}></div>
          <ul className={styles["nav__list"]}>
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/works"
            >
              <li
                className={`${styles["nav__list_item"]} ${
                  paths[0] === "works" && styles["active"]
                }`}
              >
                works
              </li>
            </Link>
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/about"
            >
              <li
                className={`${styles["nav__list_item"]} ${
                  paths[0] === "about" && styles["active"]
                }`}
              >
                about
              </li>
            </Link>
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/contact"
            >
              <li
                className={`${styles["nav__list_item"]} ${
                  paths[0] === "contact" && styles["active"]
                }`}
              >
                contact
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
