import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
import { homeNavItems } from "../../utils/constants";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";

export default function Home() {
  const { paths } = useContext(PathContext);

  return (
    <div className={styles["frame"]}>
      <div className={`${styles["page"]}  ${paths[1] && styles["hidden"]}`}>
        <div className={styles["folder"]}></div>
        <Nav renderBack={false} navItems={homeNavItems}></Nav>
      </div>
      <Outlet />
    </div>
  );
}
