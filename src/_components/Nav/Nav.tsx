import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import NavItem from "./NavItem/NavItem";

type NavItemType = {
  name: string;
  slug: string;
};

export default function Nav({
  navItems,
  renderBack = true,
}: {
  navItems: NavItemType[];
  renderBack?: boolean;
}) {
  return (
    <nav className={styles["nav"]}>
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
  );
}
