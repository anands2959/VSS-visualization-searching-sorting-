import { useState, useCallback, useRef } from 'react';
import View from '../pages/View';
import AlgorithmControls from '../pages/AlgorithmControls';
import { generateRandomArray, sleep, calculateDelay } from '../utils/arrayUtils';
import beepSound from '../../assets/beep3.mp3';
import doneSound from '../../assets/wrong.mp3';

const LinearSearch = () => {
  const [array, setArray] = useState(() => generateRandomArray(30, 1, 100));
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
    setArray(generateRandomArray(arraySize, 1, 100));
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

  const linearSearch = async () => {
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

    for (let i = 0; i < array.length && searchProcess.current; i++) {
      setSearching([i]);
      beep.play();
      await sleep(delay);

      if (array[i] === targetNum) {
        setFound([i]);
        done.play();
        break;
      }
    }

    if (searchProcess.current) {
      setIsRunning(false);
    }
  };

  return (
    <div className="algorithm-container">
      {/* <h2>Linear Search Visualization</h2>
      <p className="algorithm-description">
        Linear Search sequentially checks each element in the array until a match is found 
        or the whole array has been searched.
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
        onStart={linearSearch}
        onStop={stopSearching}
        algorithmName="Linear Search"
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

export default LinearSearch;
