import styles from "./App.module.css";

import { Link, Route, Routes } from "react-router-dom";

import Home from "./_components/Home/Home";
import NotFound from "./_components/NotFound/NotFound";

import Works from "./_components/Works/Works";

import ProjectDENIS from "./_components/Works/ProjectDENIS/ProjectDENIS";
import TapeCanvas from "./_components/Works/ProjectDENIS/TapeCanvas/TapeCanvas";
import ProjectTheUsual from "./_components/Works/ProjectTheUsual/ProjectTheUsual";

import About from "./_components/About/About";
import Contact from "./_components/Contact/Contact";

import Readme from "./_components/Works/ProjectDENIS/Readme/Readme";

export default function App() {
  return (
    <div className={styles["page"]}>
      <div className={styles["page__overlay"]}></div>
      <div className={styles["page__content"]}>
        <div className={styles["screen"]}>
          <div className={styles["screen__overlay_dirt"]}></div>
          <div className={styles["screen__overlay_fingerprints"]}></div>
          <h3 className={styles["screen__header_title"]}>
            single voice multimedia filesystem
          </h3>
          <div className={styles["frame"]}>
            <div className={styles["frame__content"]}>
              <Routes>
                <Route path="/" element={<Home></Home>}>
                  <Route path="/contact" element={<Contact></Contact>}></Route>
                  <Route path="/about" element={<About></About>}></Route>
                  <Route path="/works" element={<Works></Works>}>
                    <Route
                      path="denis-ep"
                      element={<ProjectDENIS></ProjectDENIS>}
                    >
                      <Route path="readme" element={<Readme></Readme>}></Route>
                      <Route path="press"></Route>
                      <Route
                        path="cassette"
                        element={<TapeCanvas></TapeCanvas>}
                      ></Route>
                      <Route path="01-floppydisk"></Route>
                      <Route path="02-password-protected"></Route>
                      <Route path="03-does-it-rain-there"></Route>
                      <Route path="04-little-goose"></Route>
                      <Route path="05-getting-nothing-done"></Route>
                      <Route path="06-look-at-the-sun"></Route>
                    </Route>
                    <Route
                      path="the-usual"
                      element={<ProjectTheUsual></ProjectTheUsual>}
                    ></Route>
                  </Route>
                </Route>

                <Route path="*" element={<NotFound></NotFound>}></Route>
              </Routes>
            </div>
            <div className={styles["frame__operation"]}>
              denisOS 2.0.1
              <br />
              verbose boot
            </div>
          </div>
          <h1 className={styles["screen__footer_title"]}>
            denis.works <span style={{ fontWeight: "200" }}>MKII</span>
          </h1>
        </div>
        <div className={styles["buttons"]}>
          <Link className={styles["button"]} to="/">
            <div className={styles["button"]}>
              <p className={styles["button__title"]}>Home</p>
            </div>
          </Link>
          <div className={styles["button"]}>
            <p className={styles["button__title"]}>Tools</p>
          </div>
          <Link className={styles["button"]} to="/about">
            <div className={styles["button"]}>
              <p className={styles["button__title"]}>About</p>
            </div>
          </Link>{" "}
          <Link className={styles["button"]} to="/contact">
            <div className={styles["button"]}>
              <p className={styles["button__title"]}>Contact</p>
            </div>
          </Link>{" "}
          <Link
            className={styles["button"]}
            target="_blank"
            to="https://instagram.com/denisbiblioni"
          >
            <div className={styles["button"]}>
              <p className={styles["button__title"]}>Photo</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
