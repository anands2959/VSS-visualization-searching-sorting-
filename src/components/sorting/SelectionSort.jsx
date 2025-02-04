import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateRandomArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const SelectionSort = () => {
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

  const selectionSort = async () => {
    setIsRunning(true);
    sortingProcess.current = true;
    const arr = [...array];
    const n = arr.length;
    const delay = calculateDelay(speed);

    for (let i = 0; i < n - 1 && sortingProcess.current; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < n && sortingProcess.current; j++) {
        setComparing([minIdx, j]);
        await sleep(delay);
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        beep.play();
        await sleep(delay);
      }
      
      setSorted(prev => [...prev, i]);
      setSwapping([]);
    }

    if (sortingProcess.current) {
      setSorted(prev => [...prev, n - 1]);
      setComparing([]);
      done.play();
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Selection Sort Visualization</h2>
      <p className="algorithm-description">
        Selection Sort works by repeatedly finding the minimum element from the unsorted portion 
        of the array and placing it at the beginning of the sorted portion.
      </p> */}
      
      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={selectionSort}
        onStop={stopSorting}
        algorithmName="Selection Sort"
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

export default SelectionSort;
