import { useContext } from "react";
import styles from "./ProjectDENIS.module.css";
import { Outlet, Link } from "react-router-dom";
import { PathContext } from "../../../contexts/LocationContext";

export default function ProjectDENIS() {
  const { paths } = useContext(PathContext);

  return (
    <div className={styles["page"]}>
      <nav className={styles["nav"]}>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to="/works"
        >
          <div className={styles["back"]}>← works</div>
        </Link>
        <ul className={styles["nav__list"]}>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="readme"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "readme" && styles["active"]
              }`}
            >
              README.md
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="press"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "press" && styles["active"]
              }`}
            >
              PRESS.md
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="cassette"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "cassette" && styles["active"]
              }`}
            >
              cassette.obj
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="01-floppydisk"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "01-floppydisk" && styles["active"]
              }`}
            >
              01-floppydisk.mp3
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="02-password-protected"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "02-password-protected" && styles["active"]
              }`}
            >
              02-pswd-protected.mp3
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="03-does-it-rain-there"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "03-does-it-rain-there" && styles["active"]
              }`}
            >
              03-does-it-rain-there.mp3
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="04-little-goose"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "04-little-goose" && styles["active"]
              }`}
            >
              04-little-goose.mp3
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="05-getting-nothing-done"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "05-getting-nothing-done" && styles["active"]
              }`}
            >
              05-getting-nothing-done.mp3
            </li>
          </Link>
          <Link
            style={{ textDecoration: "inherit", color: "inherit" }}
            to="06-look-at-the-sun"
          >
            <li
              className={`${styles["nav__list_item"]} ${
                paths[2] === "06-look-at-the-sun" && styles["active"]
              }`}
            >
              06-look-at-the-sun.mp3
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
