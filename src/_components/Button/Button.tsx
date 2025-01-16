import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import { PathContext } from "../../contexts/LocationContext";

export default function Button({
  title,
  path,
  icon,
  size = "50%",
  newPage = false,
}: {
  path: string;
  newPage?: boolean;
  title: string;
  icon: React.ReactElement;
  size: string;
}) {
  let { paths } = useContext(PathContext);
  if (paths.includes("")) {
    paths = ["home"];
  }

  const svgElement = React.cloneElement(icon, { size });
  return (
    <Link
      target={newPage ? "_blank" : ""}
      className={styles["button"]}
      to={path === "home" ? "/" : `${path}`}
    >
      <div className={styles["button"]}>
        <div className={styles["button__icon"]}>
          <div
            style={paths.includes(path) ? { color: "rgb(220, 143, 156)" } : {}}
            className={styles["icon__container"]}
          >
            {svgElement}
          </div>
          <div
            style={
              paths.includes(path)
                ? { color: "maroon", filter: "blur(10px)" }
                : {}
            }
            className={styles["icon__container_glow"]}
          >
            {" "}
            {svgElement}
          </div>
        </div>
        <p className={styles["button__title"]}>{title}</p>
      </div>
    </Link>
  );
}
