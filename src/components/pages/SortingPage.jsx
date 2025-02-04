import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BubbleSort from "../sorting/BubbleSort";
import InsertionSort from "../sorting/InsertionSort";
import MergeSort from "../sorting/MergeSort";
import QuickSort from "../sorting/QuickSort";
import SelectionSort from "../sorting/SelectionSort";
import '../styles/SortingPage.css';

const algorithms = [
  {
    name: "Bubble Sort",
    complexity: "O(n²)",
    description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  },
  {
    name: "Quick Sort",
    complexity: "O(n log n)",
    description: "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements. It is still a commonly used algorithm in practice."
  },
  {
    name: "Merge Sort",
    complexity: "O(n log n)",
    description: "A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves."
  },
  {
    name: "Selection Sort",
    complexity: "O(n²)",
    description: "A simple sorting algorithm that repeatedly selects the minimum element from the unsorted portion and places it at the beginning."
  },
  {
    name: "Insertion Sort",
    complexity: "O(n²)",
    description: "Builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array."
  }
];

const SortingPage = () => {
  const navigate = useNavigate();
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const handleStartVisualization = (algoName) => {
    setSelectedAlgo(algoName);
    setShowVisualization(true);
  };

  const renderVisualization = () => {
    switch (selectedAlgo) {
      case "Bubble Sort":
        return <BubbleSort />;
      case "Quick Sort":
        return <QuickSort />;
      case "Merge Sort":
        return <MergeSort />;
      case "Selection Sort":
        return <SelectionSort />;
      case "Insertion Sort":
        return <InsertionSort />;
      default:
        return null;
    }
  };

  if (showVisualization) {
    return (
      <div className="visualization-page">
        <nav className="top-nav">
          <button 
            className="back-button"
            onClick={() => setShowVisualization(false)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
          </button>
        </nav>
        {renderVisualization()}
      </div>
    );
  }

  return (
    <div className="sorting-page">
      <nav className="top-nav">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
          </svg>
        </button>
      </nav>

      <div className="content">
        <div className="intro-section">
          <h2>Visualize & Learn</h2>
          <p>Explore the fascinating world of sorting algorithms through interactive visualizations. 
             Understand how different algorithms work, their time complexity, and when to use them.</p>
        </div>

        <div className="algorithms-grid">
          {algorithms.map((algo) => (
            <div 
              key={algo.name}
              className={`algorithm-card ${selectedAlgo === algo.name ? 'selected' : ''}`}
              onClick={() => setSelectedAlgo(algo.name)}
            >
              <div className="card-header">
                <h3>{algo.name}</h3>
                <span className="complexity">{algo.complexity}</span>
              </div>
              <p>{algo.description}</p>
              <button 
                className="start-btn"
                onClick={() => handleStartVisualization(algo.name)}
              >
                Start Visualization
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="features-section">
          <div className="feature">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M15 2H9v2h6V2zm-2 16h-2v2h2v-2zm8-3v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3zM12 6c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7z" fill="currentColor"/>
            </svg>
            <h4>Interactive Controls</h4>
            <p>Control the visualization speed and step through the algorithm</p>
          </div>
          <div className="feature">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h1.5v3l2-3h1.7l-2 3 2 3h-1.7l-2-3v3H12V5zM7 7.25h2.5V6.5H7V5h4v3.75H8.5v.75H11V11H7V7.25zM19 13l-6 6-4-4-4 4v-2.5l4-4 4 4 6-6V13z" fill="currentColor"/>
            </svg>
            <h4>Performance Metrics</h4>
            <p>Compare time complexity and space usage</p>
          </div>
          <div className="feature">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" fill="currentColor"/>
            </svg>
            <h4>Learning Resources</h4>
            <p>Access detailed explanations and best practices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingPage;
