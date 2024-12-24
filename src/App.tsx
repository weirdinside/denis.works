import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./contexts/ThemeProvider";
import styles from "./App.module.css";
import { useQueryState } from "nuqs";
import ProjectDENIS from "./components/ProjectDENIS/ProjectDENIS";

function App() {
  // ------------------------- //
  //     VARIABLES / STATES    //
  // ------------------------- //

  const { isDarkMode, toggleColorMode } = useContext(ThemeContext);
  const [arrowNavVerticalPosition, setArrowNavVerticalPosition] = useState(0);
  const [isMouseOverNav, setMouseOverNav] = useState<boolean>(false);
  const [isMouseOverProjects, setMouseOverProjects] = useState<boolean>(false);
  const [isCursorVisible, setCursorVisibility] = useState<boolean>(true);
  const [isMouseOverTitle, setMouseOverTitle] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useQueryState("page", { history: "push" });

  const [activeProject, setActiveProject] = useQueryState("project", {
    history: "push",
  });

  const navRef = useRef<HTMLUListElement>(null);
  const projectNavRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const projectArrowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const revealTitleRef = useRef<HTMLDivElement>(null);

  // -------------------------- //
  //        EVENT HANDLERS      //
  // -------------------------- //

  function handleMouseMoveOverNav(e: React.MouseEvent<HTMLUListElement>) {
    e.stopPropagation();
    const arrow = arrowRef.current as HTMLDivElement;
    const target = navRef.current as HTMLUListElement;
    const bounds = target.getBoundingClientRect();
    setArrowNavVerticalPosition(
      e.clientY - bounds.top - arrow.offsetHeight / 2,
    );
  }

  function handleMouseMoveOverProjectsNav(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const arrow = projectArrowRef.current as HTMLDivElement;
    const target = projectNavRef.current as HTMLElement;
    const bounds = target.getBoundingClientRect();
    setArrowNavVerticalPosition(
      e.clientY - bounds.top - arrow.offsetHeight / 2,
    );
  }

  function handleMouseMoveOverTitle(e: MouseEvent) {
    e.stopPropagation();
    const target = titleRef.current as HTMLDivElement;
    const hiddenTitle = revealTitleRef.current as HTMLDivElement;
    const bounds = target.getBoundingClientRect();
    const xPercent = (((e.clientX - bounds.left) / bounds.width) * 100).toFixed(
      2,
    );
    const yPercent = (((e.clientY - bounds.top) / bounds.height) * 100).toFixed(
      2,
    );
    hiddenTitle.style.clipPath = `circle(20% at ${xPercent}% ${yPercent}%)`;
  }

  function handleCursorAnimation(e: MouseEvent) {
    if (cursorRef.current) {
      const mousePointer = cursorRef.current;
      const deltaX = e.clientX - mousePointer.getBoundingClientRect().x;
      const deltaY = e.clientY - mousePointer.getBoundingClientRect().y;
      const angle = Math.atan2(deltaY, deltaX);
      mousePointer.animate(
        {
          rotate: `${angle * (180 / Math.PI) + 235}deg`,
        },
        { duration: 1000, fill: "forwards" },
      );
      mousePointer.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 0, fill: "forwards" },
      );
    }
  }

  // -------------------------- //
  //            HOOKS           //
  // -------------------------- //

  useEffect(
    function titleListener() {
      if (isMouseOverTitle) {
        setMouseOverTitle(true);
        window.addEventListener("pointermove", handleMouseMoveOverTitle);
      }
      return () => {
        setMouseOverTitle(false);
        window.removeEventListener("pointermove", handleMouseMoveOverTitle);
      };
    },
    [isMouseOverTitle],
  );

  useEffect(function cursorListener() {
    window.addEventListener("mousemove", handleCursorAnimation);
    return () => {
      window.removeEventListener("mousemove", handleCursorAnimation);
    };
  }, []);

  useEffect(
    function preventActiveProject() {
      if (activeTab !== "projects") setActiveProject(null);
    },
    [activeTab],
  );

  // -------------------------- //
  //      COMPONENT RETURN      //
  // -------------------------- //

  return (
    <div className={`${styles["page"]} ${isDarkMode && styles["dark"]}`}>
      <div className={styles["page__bg-texture"]}></div>
      <div className={styles["page__content"]}>
        <div className={styles["page__content_detailbox"]}></div>
        <div
          onClick={() => {
            setActiveTab(null);
          }}
          onMouseEnter={() => {
            setMouseOverTitle(true);
            setCursorVisibility(false);
          }}
          onMouseLeave={() => {
            setMouseOverTitle(false);
            setCursorVisibility(true);
          }}
          className={`${styles["content__title_container"]} ${
            activeTab === "projects" && styles["hidden"]
          }`}
        >
          {isDarkMode && (
            <div
              ref={revealTitleRef}
              className={styles["content__title_under"]}
            >
              denis
              <br />
              .works
            </div>
          )}

          <div ref={titleRef} className={styles["content__title"]}>
            denis
            <br />
            .works
          </div>

          <div
            className={`${styles["content__title_social"]} ${
              activeTab === "contact" && styles["active"]
            }`}
          >
            <a
              href="mailto:denisbiblioni@gmail.com"
              className={`${styles["email"]} ${styles["icon"]}`}
            ></a>
            <a
              target="_blank"
              href="https://instagram.com/denisbiblioni"
              className={`${styles["instagram"]} ${styles["icon"]}`}
            ></a>
          </div>

          <div
            className={`${styles["content__title_about"]} ${
              activeTab === "about" && styles["active"]
            }`}
          >
            <div className={styles["about__image"]}></div>
            <p className={styles["about__text"]}>
              denis biblioni is a figment of my imagination. he is a mechanic
              living in the countryside. he does not know how to make music
              (much less use a computer), but he is trying.
            </p>
          </div>
        </div>
        <nav className={styles["nav"]}>
          <ul
            ref={navRef}
            onMouseEnter={() => {
              setMouseOverNav(true);
              setCursorVisibility(false);
            }}
            onMouseLeave={() => {
              setMouseOverNav(false);
              setCursorVisibility(true);
            }}
            onMouseMove={handleMouseMoveOverNav}
            className={styles["nav__list"]}
          >
            <div
              style={
                isMouseOverNav
                  ? {
                      top: `${arrowNavVerticalPosition}px`,
                      opacity: "1",
                      transform: "translateX(0)",
                    }
                  : {
                      top: `${arrowNavVerticalPosition}px`,
                      opacity: "0",
                      transform: "translateX(-20px)",
                    }
              }
              ref={arrowRef}
              className={styles["arrow"]}
            >
              ➔
            </div>
            <li
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("projects");
              }}
              className={`${styles["nav__list_item"]} ${
                activeTab === "projects" && styles["selected"]
              }`}
            >
              projects
              <div
                className={`${styles["list_item_background"]} ${
                  activeTab === "projects" && styles["selected"]
                }`}
              ></div>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("about");
                setActiveProject(null);
              }}
              value={"about"}
              className={`${styles["nav__list_item"]} ${
                activeTab === "about" && styles["selected"]
              }`}
            >
              about
              <div
                className={`${styles["list_item_background"]} ${
                  activeTab === "about" && styles["selected"]
                }`}
              ></div>
            </li>
            <li
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("contact");
                setActiveProject(null);
              }}
              value={"contact"}
              className={`${styles["nav__list_item"]} ${
                activeTab === "contact" && styles["selected"]
              }`}
            >
              contact
              <div
                className={`${styles["list_item_background"]} ${
                  activeTab === "contact" && styles["selected"]
                }`}
              ></div>
            </li>
          </ul>
        </nav>
        <nav
          onMouseEnter={() => {
            setMouseOverProjects(true);
            setCursorVisibility(false);
          }}
          onMouseLeave={() => {
            setMouseOverProjects(false);
            setCursorVisibility(true);
          }}
          onMouseMove={(e) => {
            handleMouseMoveOverProjectsNav(e);
          }}
          ref={projectNavRef}
          className={`${styles["projects__nav"]} ${
            activeTab === "projects" && styles["active"]
          }`}
        >
          <div
            style={
              isMouseOverProjects
                ? {
                    top: `${arrowNavVerticalPosition}px`,
                    opacity: "1",
                    transform: "translateX(0)",
                  }
                : {
                    top: `${arrowNavVerticalPosition}px`,
                    opacity: "0",
                    transform: "translateX(-20px)",
                  }
            }
            ref={projectArrowRef}
            className={`${styles["arrow"]} ${styles["projects"]}`}
          >
            ➔
          </div>
          <ul className={styles["projects__nav_list"]}>
            <li
              onClick={() => {
                setActiveProject("denis");
              }}
              className={styles["projects__nav_item"]}
            >
              DENIS (EP)
              <div className={styles["projects__nav_item_background"]}></div>
            </li>
            <li
              onClick={() => {
                setActiveProject("theusual");
              }}
              className={styles["projects__nav_item"]}
            >
              the usual*
              <div className={styles["projects__nav_item_background"]}></div>
            </li>
          </ul>
        </nav>
        {activeProject === "denis" && (
          <div className={styles["project"]}>
            <ProjectDENIS></ProjectDENIS>
          </div>
        )}
        {activeProject === "theusual" && (
          <div className={styles["project"]}>the usual*</div>
        )}
      </div>

      {isCursorVisible && (
        <div ref={cursorRef} className={styles["cursor"]}>
          ➔
        </div>
      )}

      <footer className={styles["footer"]}>
        <p className={styles["footer__text"]}>website by anirudh bharadwaj</p>
        <p className={styles["footer__text"]}>last edited 12-16-1994</p>
      </footer>
    </div>
  );
}

export default App;
