import { Outlet } from "react-router-dom";
import { worksNavItems } from "../../utils/constants";
import Nav from "../Nav/Nav";
import styles from "./Works.module.css";
import { useContext } from "react";
import { PathContext } from "../../contexts/LocationContext";

export default function Works() {
  const { paths } = useContext(PathContext);
  console.log(paths);

  return (
    <div className={styles["frame"]}>
      <div className={`${styles["page"]}  ${paths[2] && styles["hidden"]}`}>
        <Nav navItems={worksNavItems}></Nav>
      </div>
      <Outlet />
    </div>
  );
}
