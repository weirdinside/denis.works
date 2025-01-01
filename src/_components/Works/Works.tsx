import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PathContext } from "../../contexts/LocationContext";
import { worksNavItems } from "../../utils/constants";
import Nav from "../Nav/Nav";
import styles from "./Works.module.css";
import { motion } from "motion/react";

export default function Works() {
  const { paths } = useContext(PathContext);

  return (
    <motion.div
      key={"works"}
      initial={{ maxWidth: "0%" }}
      transition={{
        default: { type: "spring" },
        duration: 1,
        delay: 0,
        ease: "easeInOut",
      }}
      animate={{ maxWidth: "100%" }}
      exit={{ maxWidth: "0%" }}
      className={styles["frame"]}
    >
      {!paths[2] && (
        <motion.div
          initial={{ maxWidth: "0%" }}
          transition={{
            default: { type: "spring" },
            duration: 1,
            delay: 0,
            ease: "easeInOut",
          }}
          animate={{ maxWidth: "100%" }}
          className={`${styles["page"]}`}
        >
          <Nav name={"WORKS"} collapse={false} navItems={worksNavItems}></Nav>
        </motion.div>
      )}
      <Outlet />
    </motion.div>
  );
}
// ${paths[2] && styles["hidden"]}
