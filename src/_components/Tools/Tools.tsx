import styles from "./Tools.module.css";
export default function Tools({
  isToolsOpen,
  setToolsOpen,
}: {
  isToolsOpen: string | null;
  setToolsOpen: (arg0: string | null) => void;
}) {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        console.log(e.target);
        const divTarget = e.target as HTMLDivElement;
        if (
          divTarget.classList.contains(styles["tools__container"]) &&
          isToolsOpen
        ) {
          setToolsOpen(null);
        }
      }}
      style={!isToolsOpen ? { pointerEvents: "none" } : {}}
      className={styles["tools__container"]}
    >
      <div
        className={`${styles["tools"]} ${
          isToolsOpen === "true" && styles["active"]
        }`}
      >
        <div className={styles["tools__pages"]}>
          <div className={styles["tools__postit"]}>
            <div className={styles["tools__heading"]}>TOOLS</div>
          </div>
        </div>
        <div className={styles["tools__pages_under"]}></div>
        <div className={styles["tools__pages_shadow"]}></div>
      </div>
    </div>
  );
}
