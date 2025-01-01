import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import NavItem from "./NavItem/NavItem";
import { AnimatePresence, motion } from "motion/react";

type NavItemType = {
  name: string;
  slug: string;
};

export default function Nav({
  name,
  collapse,
  navItems,
  renderBack = true,
}: {
  name: string;
  collapse: boolean;
  navItems: NavItemType[];
  renderBack?: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <nav className={`${styles["nav"]} ${collapse && styles["hidden"]}`}>
        {collapse && (
          <Link className={styles["collapsed_back"]} to={`.`}>
            <motion.p
              initial={{ maxHeight: "0%" }}
              animate={{ maxHeight: "100%" }}
              exit={{ maxHeight: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={styles["collapsed_back__text"]}
            >
              {`↺ ${name}`}
            </motion.p>
            xx
          </Link>
        )}
        {renderBack && (
          <Link to={`..`}>
            <div className={styles["back"]}>← back</div>
          </Link>
        )}
        <ul className={styles["nav__list"]}>
          {navItems.map((navItem, idx) => {
            return <NavItem key={idx} navItem={navItem}></NavItem>;
          })}
        </ul>
      </nav>
    </AnimatePresence>
  );
}
