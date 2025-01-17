import { useState, useEffect, useRef } from "react";
import styles from "./Knob.module.css";

// WHAT IS THIS COMPONENT?
// react-knob is a headless knob that allows devs to implement a range input with the UX of a knob.
// the goal is to keep the DX simple and create a controlled input that a developer can pass a state and state setter into

// developer should provide minValue and maxValue, startAngle and endAngle

export default function Knob({
  value,
  setValue,
  startValue = 0,
  endValue = 12,
  // defaultValue = startValue,
  startAngle = -180,
  endAngle = startAngle + 360,
  snap = true,
  step = 0.01,
}: {
  value: number;
  setValue: (arg0: number) => void;
  startValue: number;
  endValue: number;
  startAngle: number;
  endAngle?: number;
  preset?: "dot knob" | "line knob";
  defaultValue?: number;
  snap?: boolean;
  snapValue?: boolean;
  step?: number;
  overflow?: boolean;
  outline?: string;
  indicator?: string;
}) {
  const [knobRotation, setKnobRotation] = useState<number>(0);
  // const [clickedRecently, setClickedRecently] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [windowDimensions, setWindowDimensions] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const knobRef = useRef<HTMLDivElement>(null);
  // const timeoutRef = useRef<number>();

  // infinite roll logic:
  // if the angle is less than 180 from the endAngle (360 after normalization), overflow into the next zone
  // else, normalize back into the current zone and go below (back into the current zone or zone below)
  // so if the startAngle is 15deg and the current angle is 80deg: assuming the endAngle is 375, clicking at -79 results
  // in going to -1x261 and clicking at 260 results in 0x260

  // if clicked twice in 800ms, clears any rotation of the knob and resets it to default value
  function setRotationWithValue(value: number) {
    setKnobRotation(
      startAngle +
        ((value - startValue) / (endValue - startValue)) *
          (endAngle - startAngle),
    );
  }

  // function clearRotation() {
  //   if (clickedRecently) {
  //     console.log("yep");
  //     setClickedRecently(false);
  //     clearTimeout(timeoutRef.current);
  //     setRotationWithValue(defaultValue);
  //     setValue(defaultValue);
  //   } else {
  //     setClickedRecently(true);
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = setTimeout(() => {
  //       setClickedRecently(false);
  //     }, 800);
  //   }
  // }

  function validateAngle() {
    // if the startAngle + 360 is >= than the endAngle, we're safe: 0-360 can be the endAngle without problems
    if (startAngle + 360 >= endAngle) return;
    else endAngle = startAngle + 360; // otherwise, we're maxed out. so set the endAngle to startAngle + 360
  }

  function clampRotation(value: number) {
    return Math.min(Math.max(value, startAngle), endAngle);
  }

  function normalizeAngle(angle: number) {
    return ((angle % 360) + 360) % 360;
  }

  function calculateDegree(clientX: number, clientY: number) {
    if (knobRef.current) {
      const knobRect = knobRef.current.getBoundingClientRect();
      const x1 = knobRect.left + knobRect.width / 2;
      const y1 = knobRect.top + knobRect.height / 2;

      const x2 = clientX; // xcoord mousePos
      const y2 = clientY; // ycoord mousePos

      const deltaY = y1 - y2; // diff between y(center of knob - mousePos)
      const deltaX = x1 - x2; // diff between x(center of knob - mousePos)

      const rad = Math.atan2(deltaY, deltaX);

      const offset = 180 - startAngle;
      const shift = startAngle;
      const deg = ((rad * (180 / Math.PI) + 90 + offset) % 360) + shift;
      return deg;
    }
    return 0;
  }

  function handleMouseRotate(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isClicked && knobRef.current) {
      if (calculateDegree(e.clientX, e.clientY) > endAngle) return;
      setCalculatedValue();
      return setKnobRotation(
        clampRotation(calculateDegree(e.clientX, e.clientY)),
      );
    }
  }

  function handleTouchRotate(e: React.TouchEvent<HTMLDivElement>) {
    if (isClicked && knobRef.current) {
      if (
        calculateDegree(e.touches[0].clientX, e.touches[0].clientY) > endAngle
      )
        return;
      setCalculatedValue();
      return setKnobRotation(
        clampRotation(
          calculateDegree(e.touches[0].clientX, e.touches[0].clientY),
        ),
      );
    }
  }

  function setCalculatedValue() {
    validateAngle();
    const normalizedRotation = normalizeAngle(knobRotation - startAngle); // degrees rotated if startAngle is 0
    const amountRotated = normalizedRotation / (endAngle - startAngle); // degrees rotated of knob as percentage
    const currentValue = startValue + (endValue - startValue) * amountRotated;
    if (snap) {
      const snappedValue = parseFloat(
        (Math.round(currentValue / step) * step).toFixed(2),
      );
      setValue(snappedValue);

      setKnobRotation(
        startAngle +
          (endAngle - startAngle) *
            ((snappedValue - startValue) / (endValue - startValue)),
      );
    } else {
      setValue(parseFloat((Math.round(currentValue / step) * step).toFixed(2)));
      setKnobRotation(knobRotation);
    }
  }

  useEffect(function readRotationOnLoad() {
    setRotationWithValue(value);
  }, []);

  useEffect(
    function setPreventerDimensionsOnResize() {
      const xVal = window.innerWidth;
      const yVal = window.innerHeight;
      setWindowDimensions({ x: xVal, y: yVal });
    },
    [window.innerHeight, window.innerWidth],
  );

  return (
    <div
      ref={knobRef}
      onPointerDown={() => {
        setIsClicked(true);
      }}
      onPointerUp={() => {
        setIsClicked(false);
      }}
      onTouchStart={(e) => {
        setIsClicked(true);
        handleTouchRotate(e);
      }}
      onTouchMove={(e) => {
        handleTouchRotate(e);
      }}
      onTouchCancel={(e) => {
        setIsClicked(false);
        handleTouchRotate(e);
      }}
      onTouchEnd={(e) => {
        setIsClicked(false);
        handleTouchRotate(e);
      }}
      onMouseDown={(e) => {
        setIsClicked(true);
        handleMouseRotate(e);
      }}
      onMouseMove={(e) => {
        handleMouseRotate(e);
      }}
      className={styles["knob"]}
    >
      <div className={styles["knob__outline"]} />
      <div
        style={{ rotate: `${knobRotation}deg` }}
        className={styles["knob__indicator"]}
      ></div>
      <div
        onPointerUp={() => {
          setIsClicked(false);
        }}
        onTouchEnd={(e) => {
          setIsClicked(false);
          handleTouchRotate(e);
        }}
        onMouseUp={(e) => {
          setIsClicked(false);
          handleMouseRotate(e);
        }}
        style={{
          visibility: `${isClicked ? "visible" : "hidden"}`,
          zIndex: `${isClicked ? "3" : "-200"}`,
          position: "fixed",
          width: `${windowDimensions.x}px`,
          height: `${windowDimensions.y}px`,
          top: 0,
          left: 0,
        }}
        className={styles["mouseaction_preventer"]}
      ></div>
    </div>
  );
}
