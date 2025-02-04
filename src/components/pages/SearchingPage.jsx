import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearSearch from "../searching/LinearSearch";
import BinarySearch from "../searching/BinarySearch";
import '../styles/SearchingPage.css';

const algorithms = [
  {
    name: "Linear Search",
    complexity: "O(n)",
    description: "A simple search algorithm that checks each element in the sequence until a match is found or the whole sequence has been searched."
  },
  {
    name: "Binary Search",
    complexity: "O(log n)",
    description: "An efficient algorithm that repeatedly divides the search interval in half. Works on sorted arrays."
  },
//  // {
//   //   name: "Jump Search",
//   //   complexity: "O(√n)",
//   //   description: "A searching algorithm for sorted arrays that jumps a fixed step to find a larger interval and then performs linear search."
//   // },
//   // {
//   //   name: "Interpolation Search",
//   //   complexity: "O(log log n)",
//   //   description: "An improved variant of binary search that works more efficiently when values in a sorted array are uniformly distributed."
//   // }
];

const SearchingPage = () => {
  const navigate = useNavigate();
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const handleStartVisualization = (algoName) => {
    setSelectedAlgo(algoName);
    setShowVisualization(true);
  };

  const renderVisualization = () => {
    switch (selectedAlgo) {
      case "Linear Search":
        return <LinearSearch />;
      case "Binary Search":
        return <BinarySearch />;
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
    <div className="searching-page">
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
          <p>Discover how different searching algorithms work through interactive visualizations. 
             Compare their efficiency and understand when to use each approach.</p>
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
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
            </svg>
            <h4>Step-by-Step Search</h4>
            <p>Watch how each algorithm searches through the data</p>
          </div>
          <div className="feature">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h1.5v3l2-3h1.7l-2 3 2 3h-1.7l-2-3v3H12V5zM7 7.25h2.5V6.5H7V5h4v3.75H8.5v.75H11V11H7V7.25zM19 13l-6 6-4-4-4 4v-2.5l4-4 4 4 6-6V13z" fill="currentColor"/>
            </svg>
            <h4>Performance Analysis</h4>
            <p>Compare efficiency across different data sizes</p>
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

export default SearchingPage;
