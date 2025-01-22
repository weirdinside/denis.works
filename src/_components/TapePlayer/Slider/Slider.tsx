import styles from "./Slider.module.css";
import { useState, useRef, useEffect } from "react";

export default function Slider({
  value,
  step,
  title,
  min,
  defaultValue = min,
  max,
  setValue,
  interpolationFunction,
  showProgress = false,
  setValueOnMouseUp,
}: {
  title: string;
  interpolationFunction?: (arg0: number) => string;
  defaultValue: number;
  step: number;
  value: number;
  min: number;
  max: number;
  setValueOnMouseUp?: boolean;
  setValue: (arg0: number) => void;
  showProgress: boolean;
}) {
  const timeoutRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClickedRecently, setClickedRecently] = useState<boolean>(false);
  const [temporaryValue, setTemporaryValue] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // before mouseDown, temporaryvalue needs to match value

  // const [windowDimensions, setWindowDimensions] = useState<{
  //   x: number;
  //   y: number;
  // }>({ x: 0, y: 0 });

  function resetSlider() {
    if (isClickedRecently) {
      clearTimeout(timeoutRef.current);
      setClickedRecently(false);
      setValue(defaultValue);
    } else {
      setClickedRecently(true);
      timeoutRef.current = setTimeout(() => {
        setClickedRecently(false);
      }, 500);
    }
  }

  // useEffect(
  //   function setPreventerDimensionsOnResize() {
  //     const xVal = window.innerWidth;
  //     const yVal = window.innerHeight;
  //     setWindowDimensions({ x: xVal, y: yVal });
  //   },
  //   [window.innerHeight, window.innerWidth],
  // );

  useEffect(
    function synchronizeValue() {
      if (!isClicked) setTemporaryValue(value);
    },
    [value],
  );

  if (setValueOnMouseUp) {
    return (
      <div className={styles["slider"]}>
        {/* <div
          onPointerUp={() => {
            setValue(temporaryValue);
            setIsClicked(false);
          }}
          onTouchEnd={() => {
            setValue(temporaryValue);
            console.log("pointerup");
            setIsClicked(false);
          }}
          onMouseUp={() => {
            setValue(temporaryValue);
            setIsClicked(false);
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
        ></div> */}
        <input
          ref={inputRef}
          value={temporaryValue}
          onChange={(e) => setTemporaryValue(parseFloat(e.target.value))}
          onPointerDown={() => {
            resetSlider();
            setIsClicked(true);
          }}
          onTouchEnd={() => {
            setValue(temporaryValue);

            setIsClicked(false);
          }}
          onPointerUp={() => {
            setValue(temporaryValue);

            setIsClicked(false);
          }}
          min={min}
          max={max}
          step={step}
          className={`${styles["slider__input"]} ${
            showProgress && styles["progress"]
          }`}
          type="range"
        />
        <p className={styles["slider__title"]}>{title}</p>
        <p className={styles["slider__label"]}>
          {interpolationFunction
            ? interpolationFunction(temporaryValue)
            : temporaryValue}
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles["slider"]}>
        <input
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          onPointerDown={resetSlider}
          min={min}
          max={max}
          step={step}
          className={`${styles["slider__input"]} ${
            showProgress && styles["progress"]
          }`}
          type="range"
        />
        <p className={styles["slider__title"]}>{title}</p>
        <p className={styles["slider__label"]}>
          {interpolationFunction ? interpolationFunction(value) : value}
        </p>
      </div>
    );
  }
}
