import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ------------------------------------ //
//                 TYPES                //
// ------------------------------------ //

interface AutoscrollTextProps {
  trigger?: boolean | number | string; // this is a value that changes to trigger the effect
  scrollSpeed?: number; // number greater than 0
  pauseTime?: number; // pause time before and after the marquee runs
  children: string; // this is where the text goes
  align?: "left" | "right" | "center";
}

// ------------------------------------ //
//              COMPONENT               //
// ------------------------------------ //

export default function AutoscrollText({
  children,
  trigger = true,
  scrollSpeed = 1,
  pauseTime = 500,
  align = "left",
}: AutoscrollTextProps) {
  // on page load, set style and transition: right 0px and transition to true
  // when the children change, recalculate and retrigger.

  // ------------------------------------ //
  //                STATES                //
  // ------------------------------------ //

  const [scrollTime, setScrollTime] = useState(0); // stores scrollTime variable after calculation in checkWindowSize hook
  const [containerWidth, setContainerWidth] = useState(0); // again, arbitrary number but tracks container width
  const [difference, setDifference] = useState(0); // the int value of the pixel value to move the text
  const [textStyle, setTextStyle] = useState({}); // stores the states to be animated between. set on an interval

  // ------------------------------------ //
  //                  REFS                //
  // ------------------------------------ //

  const marqueeRef = useRef<HTMLDivElement>(null); // reference for the parent container (if marquee is to be active, this is smaller)
  const textRef = useRef<HTMLParagraphElement>(null); // reference for the text container (if marquee is to be active, this is larger)

  // ------------------------------------ //
  //               UTILITIES              //
  // ------------------------------------ //

  const intervalTime = useMemo(() => {
    return scrollTime + pauseTime * 2;
  }, [scrollTime, pauseTime]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const setStylesSequentially = useCallback(async () => {
    // setInitialStyle does the same thing that this does, just this does it unconditionally if textwidth > containerwidth
    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    }));

    await delay(20); // a glitch occurs if this delay is too short, and as a result does not reset the styles properly

    // sets text style to ending position, which relies on <scrollTime> (calculated in checkWindowSize) and pauseTime, but does not require <difference>
    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `${scrollTime}ms linear ${pauseTime}ms`,
      right: "0px",
    }));
  }, [setTextStyle, difference, pauseTime, scrollTime]);

  // used in the loopSet hook
  const resetText = useCallback(() => {
    setTextStyle({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    });
  }, [setTextStyle, difference]);

  // ------------------------------------ //
  //                 HOOKS                //
  // ------------------------------------ //

  // is run when the window size is changed or the marquee element is triggered
  useEffect(
    function checkWindowSize() {
      if (textRef.current) {
        //confirms textRef exists
        const textWidth = textRef.current.offsetWidth; // variable for width of text (LARGER or EQUAL)
        const diff = textWidth - containerWidth; // calculated value for distance required to be traveled by text
        setScrollTime(diff * 21 * (1 / scrollSpeed)); // pixelwidth * 21 is the ms for scrolling at timescale "1",
        setDifference(diff); // sets <difference> to be used in style setting functions
      }
    },
    [scrollSpeed, children, containerWidth, difference, trigger],
  );

  // set the initial style before rendering the rest
  useEffect(
    function setInitialStyle() {
      function getAlignmentStyle() {
        const baseStyle = {
          position: "absolute",
          textWrap: "nowrap",
          transition: "none",
        };

        if (difference > 0) {
          return { ...baseStyle, right: `${-difference}px` };
        }

        switch (align) {
          case "left":
            return { ...baseStyle, left: "0px" };
          case "right":
            return { ...baseStyle, right: "0px" };
          case "center":
            return {
              ...baseStyle,
              left: "0",
              right: "0",
              marginInline: "auto",
              width: "fit-content",
            };
        }
      }
      setTextStyle(getAlignmentStyle);
    },
    [scrollTime, pauseTime, align, difference],
  );

  // sets an interval for the classes to be set on the text.
  // the return function clears the interval (eg., a re-render will cause the loop to break and reset)
  // necessary deps:
  // - difference, intervalTime, setStylesSequentially, resetText
  // other deps:
  // - align (unless this is set by a variable, it does not need to be a cause for re-render)
  // - pauseTime (unless this is set by a variable, it does not need to be a cause for re-render)
  // - children(unless this is set by a variable, it does not need to be a cause for re-render - although more likely than the last 2)
  // - containerWidth(necessary, since width of the container changing is cause for a re-render)
  // - trigger (if this is provided, this needs to be a dep as mouseOver would be cause for a re-render)

  useEffect(
    function loopSet() {
      let interval: ReturnType<typeof setInterval> | undefined;
      if (difference > 0) {
        // this conditional needs to only occur if trigger is passed through - else, this is just defaulted true
        if (trigger) {
          interval = setInterval(() => {
            setStylesSequentially();
          }, intervalTime);
          setStylesSequentially();
        }
        if (!trigger) {
          clearInterval(interval);
          resetText();
        }
      }
      return () => {
        clearInterval(interval);
      };
    },
    [
      difference,
      resetText,
      setStylesSequentially,
      trigger,
      children,
      containerWidth,
      intervalTime,
      pauseTime,
      align,
    ],
  );

  useEffect(() => {
    const containerRef = marqueeRef.current;
    const myObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    if (containerRef) myObserver.observe(containerRef);

    return () => {
      if (containerRef) myObserver.unobserve(containerRef);
    };
  }, []);

  return (
    <div
      style={{
        zIndex: "0",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        height: `min-content`,
        position: "relative",
        width: `100%`,
        overflow: "hidden",
      }}
      ref={marqueeRef}
    >
      <p
        style={{ opacity: "0", margin: "0", padding: "0", textWrap: "nowrap" }}
      >
        {"x"}
      </p>
      <p style={textStyle} ref={textRef}>
        {children}
      </p>
    </div>
  );
}
