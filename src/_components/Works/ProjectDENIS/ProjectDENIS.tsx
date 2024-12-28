import { Outlet } from "react-router-dom";
import { projectDenisNavItems } from "../../../utils/constants";
import Nav from "../../Nav/Nav";
import styles from "./ProjectDENIS.module.css";
import { useContext } from "react";
import { PathContext } from "../../../contexts/LocationContext";

export default function ProjectDENIS() {
  const { paths } = useContext(PathContext);

  return (
    <div className={styles["frame"]}>
      <div className={`${styles["page"]}  ${paths[2] && styles["hidden"]}`}>
        <Nav navItems={projectDenisNavItems}></Nav>
      </div>
      <Outlet />
    </div>
  );
}
