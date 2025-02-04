import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateRandomArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const InsertionSort = () => {
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

  const insertionSort = async () => {
    setIsRunning(true);
    sortingProcess.current = true;
    const arr = [...array];
    const n = arr.length;
    const delay = calculateDelay(speed);

    setSorted([0]);

    for (let i = 1; i < n && sortingProcess.current; i++) {
      let key = arr[i];
      let j = i - 1;
      
      setComparing([i]);
      await sleep(delay);

      while (j >= 0 && arr[j] > key && sortingProcess.current) {
        setComparing([j, j + 1]);
        setSwapping([j, j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        beep.play();
        await sleep(delay);
        
        j--;
      }
      
      arr[j + 1] = key;
      setArray([...arr]);
      setSorted(prev => [...prev, i]);
      setSwapping([]);
      await sleep(delay);
    }

    if (sortingProcess.current) {
      setComparing([]);
      done.play();
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Insertion Sort Visualization</h2>
      <p className="algorithm-description">
        Insertion Sort builds the final sorted array one item at a time, by repeatedly inserting 
        a new element into the sorted portion of the array.
      </p> */}
      
      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={insertionSort}
        onStop={stopSorting}
        algorithmName="Insertion Sort"
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

export default InsertionSort;
