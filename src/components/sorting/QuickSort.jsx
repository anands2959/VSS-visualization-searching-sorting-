import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateRandomArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const QuickSort = () => {
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

  const partition = async (arr, low, high) => {
    if (!sortingProcess.current) return -1;
    
    const pivot = arr[high];
    let i = low - 1;
    const delay = calculateDelay(speed);

    for (let j = low; j < high && sortingProcess.current; j++) {
      setComparing([j, high]);
      await sleep(delay);

      if (arr[j] < pivot) {
        i++;
        setSwapping([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        beep.play();
        await sleep(delay);
      }
    }

    setSwapping([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(delay);

    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high && sortingProcess.current) {
      const pi = await partition(arr, low, high);
      if (pi === -1) return; // sorting was stopped
      
      setSorted(prev => [...prev, pi]);
      
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
      setSorted(prev => [...prev, low]);
    }
  };

  const quickSort = async () => {
    setIsRunning(true);
    sortingProcess.current = true;
    setSorted([]);
    
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);

    if (sortingProcess.current) {
      setComparing([]);
      setSwapping([]);
      done.play();
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Quick Sort Visualization</h2>
      <p className="algorithm-description">
        Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. 
        It works by selecting a 'pivot' element and partitioning the array around it.
      </p> */}
      
      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={quickSort}
        onStop={stopSorting}
        algorithmName="Quick Sort"
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

export default QuickSort;
