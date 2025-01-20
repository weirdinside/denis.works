import styles from "./Slider.module.css";
import { useState, useRef } from "react";

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
}: {
  title: string;
  interpolationFunction?: (arg0: number) => string;
  defaultValue: number;
  step: number;
  value: number;
  min: number;
  max: number;
  setValue: (arg0: number) => void;
  showProgress: boolean;
}) {
  const timeoutRef = useRef<number>();
  const [isClickedRecently, setClickedRecently] = useState<boolean>(false);

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
