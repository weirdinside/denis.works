import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export default function NavItem({
  navItem,
}: {
  navItem: { name: string; slug: string };
}) {
  return (
    <NavLink to={navItem.slug}>
      <li className={`${styles["nav__list_item"]}`}>{navItem.name}</li>
    </NavLink>
  );
}
