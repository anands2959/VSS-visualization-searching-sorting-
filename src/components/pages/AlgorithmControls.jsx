import PropTypes from 'prop-types';
import '../styles/AlgorithmControls.css';

const getAlgorithmDescription = (name) => {
  const descriptions = {
    'Binary Search': 'Binary Search efficiently finds a target value by repeatedly dividing the search interval in half. Note: This algorithm only works on sorted arrays.',
    'Linear Search': 'Linear Search sequentially checks each element in the array until a match is found or the whole array is searched.',
    'Bubble Sort': 'Bubble Sort repeatedly steps through the array, compares adjacent elements and swaps them if they are in the wrong order.',
    'Quick Sort': 'Quick Sort uses a divide-and-conquer strategy to sort the array by selecting a pivot element and partitioning other elements around it.',
    'Merge Sort': 'Merge Sort divides the array into smaller subarrays, sorts them, and then merges them back together in sorted order.',
    'Selection Sort': 'Selection Sort divides the array into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.',
    'Insertion Sort': 'Insertion Sort builds the final sorted array one item at a time by repeatedly inserting elements into their correct position.',
    'Heap Sort': 'Heap Sort uses a binary heap data structure to sort elements by first building a max-heap and then repeatedly extracting the maximum element.'
  };
  return descriptions[name] || 'Visualize the algorithm step by step';
};

const AlgorithmControls = ({
  arraySize,
  speed,
  isRunning,
  onArraySizeChange,
  onSpeedChange,
  onGenerate,
  onStart,
  onStop,
  algorithmName,
  onSearch,
  searchValue
}) => {
  const isSearchAlgorithm = algorithmName.toLowerCase().includes('search');

  return (
    <div className="algorithm-header">
      <div className="algorithm-info">
        <h1 className="main-heading">{algorithmName}</h1>
        <p className="algorithm-description">{getAlgorithmDescription(algorithmName)}</p>
      </div>

      <div className="algorithm-controls">
        {/* <h2 className="algorithm-name">{algorithmName}</h2> */}
        
        <div className="control-group">
          <label>
            Size: {arraySize}
            <input
              type="range"
              min="5"
              max="100"
              value={arraySize}
              onChange={(e) => onArraySizeChange(Number(e.target.value))}
              disabled={isRunning}
            />
          </label>
        </div>

        <div className="control-group">
          <label>
            Speed: {speed}%
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              disabled={isRunning}
            />
          </label>
        </div>

        {isSearchAlgorithm && (
          <div className="search-input-container">
            <input
              type="number"
              placeholder="Enter number to search"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              disabled={isRunning}
              className="search-input"
            />
          </div>
        )}

        <div className="button-group">
          <button 
            className="control-button generate"
            onClick={onGenerate}
            disabled={isRunning}
          >
            New
          </button>

          <button
            className="control-button start"
            onClick={onStart}
            disabled={isRunning || (isSearchAlgorithm && !searchValue)}
          >
            Start
          </button>

          <button
            className="control-button stop"
            onClick={onStop}
            disabled={!isRunning}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

AlgorithmControls.propTypes = {
  arraySize: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onArraySizeChange: PropTypes.func.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  algorithmName: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string
};

export default AlgorithmControls;
