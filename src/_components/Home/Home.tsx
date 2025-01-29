import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
import { homeNavItems } from "../../utils/constants";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  document.title = "denis.works";

  const { paths } = useContext(PathContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"home"}
        initial={{ maxWidth: "0%" }}
        animate={{ maxWidth: "100%" }}
        transition={{ duration: "1", ease: "easeInOut" }}
        className={styles["frame"]}
        exit={{ maxWidth: "0%" }}
      >
        <div
          style={paths[2] ? { borderRight: "2px solid transparent" } : {}}
          className={`${styles["page"]}  ${paths[1] && styles["hidden"]}`}
        >
          {!["about", "contact", "tape"].includes(paths[0]) && (
            <div className={styles["folder"]}></div>
          )}
          {!paths[2] && (
            <Nav
              name={"HOME"}
              collapse={
                Boolean(paths[1]) ||
                paths[0] === "about" ||
                paths[0] === "contact" ||
                paths[0] === "tape"
              }
              renderBack={false}
              navItems={homeNavItems}
            />
          )}
        </div>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
