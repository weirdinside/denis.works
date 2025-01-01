import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
import { homeNavItems } from "../../utils/constants";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";
import { motion } from "framer-motion";

export default function Home() {
  const { paths } = useContext(PathContext);

  console.log(paths[0]);
  console.log(!paths[1]);

  return (
    <motion.div
      key={"home"}
      initial={{ maxWidth: "0%" }}
      animate={{ maxWidth: "100%" }}
      transition={{ duration: "1", ease: "linear" }}
      className={styles["frame"]}
    >
      <div
        style={paths[2] ? { borderRight: "2px solid transparent" } : {}}
        className={`${styles["page"]}  ${paths[1] && styles["hidden"]}`}
      >
        {paths[0] !== "about" && <div className={styles["folder"]}></div>}
        {!paths[2] && (
          <Nav
            name={"HOME"}
            collapse={Boolean(paths[1]) || paths[0] === "about"}
            renderBack={false}
            navItems={homeNavItems}
          ></Nav>
        )}
      </div>

      <Outlet />
    </motion.div>
  );
}
