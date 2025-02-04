import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateSortedArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const BinarySearch = () => {
  const [array, setArray] = useState(() => generateSortedArray(30, 1, 100));
  const [searching, setSearching] = useState([]);
  const [found, setFound] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [target, setTarget] = useState(null);
  
  const searchProcess = useRef(null);
  const beep = new Audio(beepSound);
  const done = new Audio(doneSound);

  const generateNewArray = useCallback(() => {
    setArray(generateSortedArray(arraySize, 1, 100));
    setSearching([]);
    setFound([]);
    setTarget(null);
  }, [arraySize]);

  const stopSearching = () => {
    if (searchProcess.current) {
      searchProcess.current = false;
    }
    setIsRunning(false);
  };

  const binarySearch = async () => {
    if (!target) {
      alert('Please enter a target value to search for');
      return;
    }

    setIsRunning(true);
    searchProcess.current = true;
    setSearching([]);
    setFound([]);
    
    const delay = calculateDelay(speed);
    const targetNum = parseInt(target);

    let left = 0;
    let right = array.length - 1;

    while (left <= right && searchProcess.current) {
      const mid = Math.floor((left + right) / 2);
      setSearching([left, mid, right]);
      beep.play();
      await sleep(delay);

      if (array[mid] === targetNum) {
        setFound([mid]);
        done.play();
        break;
      } else if (array[mid] < targetNum) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (searchProcess.current) {
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Binary Search Visualization</h2>
      <p className="algorithm-description">
        Binary Search efficiently finds a target value by repeatedly dividing the search interval in half. 
        Note: This algorithm only works on sorted arrays.
      </p> */}
      
      {/* <div className="search-controls">
        <input
          type="number"
          placeholder="Enter number to search"
          value={target || ''}
          onChange={(e) => setTarget(e.target.value)}
          disabled={isRunning}
        />
      </div> */}
      
      <AlgorithmControls
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onGenerate={generateNewArray}
        onStart={binarySearch}
        onStop={stopSearching}
        algorithmName="Binary Search"
        searchValue={target}
        onSearch={(value) => setTarget(value)}
      />

      <View
        array={array}
        comparing={[]}
        swapping={[]}
        sorted={[]}
        searching={searching}
        found={found}
        type="search"
      />
    </div>
  );
};

export default BinarySearch;
