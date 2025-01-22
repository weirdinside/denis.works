import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PathContext } from "../../../contexts/LocationContext";
import { projectDenisNavItems } from "../../../utils/constants";
import Nav from "../../Nav/Nav";
import styles from "./ProjectDENIS.module.css";
import { motion } from "framer-motion";

export default function ProjectDENIS() {
  document.title = "denis.works - DENIS EP";
  const { paths } = useContext(PathContext);

  return (
    <motion.div
      key={"projectDENIS"}
      initial={{ maxWidth: "0%" }}
      animate={{ maxWidth: "100%" }}
      transition={{ duration: "1", ease: "easeInOut" }}
      exit={{ maxWidth: "0%" }}
      className={styles["frame"]}
    >
      <motion.div
        initial={{ maxWidth: "0%" }}
        animate={{ maxWidth: "100%" }}
        exit={{ maxWidth: "0%" }}
        className={`${styles["page"]}`}
      >
        <Nav
          name={"DENIS EP"}
          collapse={Boolean(paths[2])}
          navItems={projectDenisNavItems}
        ></Nav>
      </motion.div>
      <Outlet />
    </motion.div>
  );
}
