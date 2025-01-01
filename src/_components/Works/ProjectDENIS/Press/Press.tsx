import styles from "./Press.module.css";
import { motion } from "motion/react";
export default function Press() {
  return (
    <motion.div
      initial={{ maxWidth: "0%" }}
      animate={{ maxWidth: "100%" }}
      exit={{ maxWidth: "0%" }}
      transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
      className={styles["page"]}
    >
      <h1 className={styles["page__heading"]}>PRESS.md</h1>
      <p className={styles["page__content"]}>
        After the release of DENIS, denis biblioni was named one of the best new
        artists in October 2023 by Pigeons and Planes (complex).
        <br />
        <br />
        <br />
        FROM ALEX SIBER (PIGEONS AND PLANES):
        <br /> <br />
        It’s brave these days to try a little tenderness.
        <br /> <br />
        We’re several years into the latest era of tuning software as a soul
        valve, modulating vocals beyond oblivion. Pitched up. Slowed down.
        Language distorted into pure sound. While enough artists land in the
        shadows of Radiohead, Frank Ocean, Aphex Twin, and Imogen Heap (or the
        molasses pace of DJ Screw and UGK), others take simple tools and freak
        it—just bask in the unmatched exuberance of 454 for a contact high.
        <br /> <br /> New Jersey artist Denis Biblioni, who also released art as
        Weird Inside, takes a gentler folk approach, singing as if the forest
        could speak. His voice glides like autumn winds ruffling foliage on
        “Getting Nothing Done.” Larynx emissions resemble rainstick symphonies
        over the creek acoustics of “Floppy Disk.” Each song off Denis,
        Biblioni’s recently released debut project, dials in every texture to
        advance uncut emotions: an exposed search for the optimism we must
        echolocate when life goes haywire.
        <br /> <br />
        “Sometimes the things you can’t control are the things you lose,”
        Biblioni tells us. “This project is me coming to terms with that. I
        wanted the instrumentation to feel uplifting so it could contrast the
        sentiment carried by the lyrics.”
        <br /> <br />
        “Password Protected,” which plays like a timeless lullaby, reads
        crestfallen: “I’m stuck without/ ways to get out.” Pain freezes us in
        place as the world leaves us behind. What’s most precious about this
        music is the sense that you get to witness Biblioni start to follow the
        earth forward. Hummed melodies slide by like sighs of release. His songs
        are full of heart, void of excess.
        <br /> <br />
        “I started making music a long time ago as an electronic producer,”
        Biblioni says. “The longer I spent in that world, the less I felt like I
        could never enter a flow state, finishing pretty much nothing I started.
        One song could have 250 channels, some only serving a millisecond
        purpose. Most of the songs on Denis only have eight channels, coming
        from just three or four sounds.”
        <br /> <br />
        Those minimalist instincts left my own head decluttered, as if the metal
        walls blocking momentum were just aluminum foil. In 12 minutes, Denis
        proves music’s endless soft power, bulldozing through the fog to
        construct someone new.—Alex Siber
        <br />
        <br /> <br />
        FROM DAN DIGS:
        <br /> <br />
        New Jersey artist Denis Biblioni‘s track “Password Protected” is equal
        parts heartwarming and heartbreaking, a simple, immediate yet
        bittersweet acoustic guitar-driven blend of humanity and emotion.
        <br /> Love that solo watery piano at the end [of 'Password Protected'].
      </p>
    </motion.div>
  );
}
