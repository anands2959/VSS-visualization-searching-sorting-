import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateRandomArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const MergeSort = () => {
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

  const merge = async (arr, l, m, r) => {
    if (!sortingProcess.current) return;
    
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);
    
    let i = 0, j = 0, k = l;
    const delay = calculateDelay(speed);

    while (i < n1 && j < n2 && sortingProcess.current) {
      setComparing([l + i, m + 1 + j]);
      await sleep(delay);

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setSwapping([k]);
      setArray([...arr]);
      beep.play();
      await sleep(delay);
      k++;
    }

    while (i < n1 && sortingProcess.current) {
      arr[k] = L[i];
      setSwapping([k]);
      setArray([...arr]);
      await sleep(delay);
      i++;
      k++;
    }

    while (j < n2 && sortingProcess.current) {
      arr[k] = R[j];
      setSwapping([k]);
      setArray([...arr]);
      await sleep(delay);
      j++;
      k++;
    }

    // Mark this section as sorted
    for (let idx = l; idx <= r; idx++) {
      setSorted(prev => [...prev, idx]);
    }
  };

  const mergeSortHelper = async (arr, l, r) => {
    if (l < r && sortingProcess.current) {
      const m = Math.floor(l + (r - l) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  };

  const mergeSort = async () => {
    setIsRunning(true);
    sortingProcess.current = true;
    setSorted([]);
    
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);

    if (sortingProcess.current) {
      setComparing([]);
      setSwapping([]);
      done.play();
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Merge Sort Visualization</h2>
      <p className="algorithm-description">
        Merge Sort uses the divide-and-conquer strategy to sort an array by repeatedly breaking it down 
        into smaller subarrays, sorting them, and then merging them back together.
      </p> */}
      
      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={mergeSort}
        onStop={stopSorting}
        algorithmName="Merge Sort"
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

export default MergeSort;
