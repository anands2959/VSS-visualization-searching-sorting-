import { useState, useCallback, useRef } from "react";
import View from "../pages/View";
import AlgorithmControls from "../pages/AlgorithmControls";
import {
  generateRandomArray,
  sleep,
  calculateDelay,
} from "../utils/arrayUtils";
import beepSound from "../../assets/beep3.mp3";
import doneSound from "../../assets/wrong.mp3";

const BubbleSort = () => {
  const [array, setArray] = useState(() => generateRandomArray(30));
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);

  const sortingProcess = useRef(null);
  const beep = new Audio(beepSound);
  const done = new Audio(doneSound);

  const generateNewArray = useCallback(() => {
    setArray(generateRandomArray(arraySize));
    setComparing([]);
    setSwapping([]);
    setSorted([]);
  }, [arraySize]);

  const stopSorting = () => {
    if (sortingProcess.current) {
      sortingProcess.current = false;
    }
    setIsRunning(false);
  };

  const bubbleSort = async () => {
    setIsRunning(true);
    sortingProcess.current = true;

    const arr = [...array];
    const n = arr.length;
    const delay = calculateDelay(speed);

    for (let i = 0; i < n - 1 && sortingProcess.current; i++) {
      for (let j = 0; j < n - i - 1 && sortingProcess.current; j++) {
        setComparing([j, j + 1]);
        await sleep(delay);

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          beep.play();
          await sleep(delay);
        }

        setSwapping([]);
      }
      setSorted((prev) => [...prev, n - 1 - i]);
    }

    if (sortingProcess.current) {
      setSorted((prev) => [...prev, 0]);
      done.play();
      setComparing([]);
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Bubble Sort Visualization</h2>
      <p className="algorithm-description">
        Bubble Sort repeatedly steps through the list, compares adjacent
        elements and swaps them if they are in the wrong order.
      </p> */}

      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={bubbleSort}
        onStop={stopSorting}
        algorithmName="Bubble Sort"
      />

      <View
        array={array}
        comparing={comparing}
        swapping={swapping}
        sorted={sorted}
        type="sort"
      />
    </div>
  );
};

export default BubbleSort;
