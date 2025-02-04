import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/View.css';

const View = ({ 
  array, 
  comparing, 
  swapping, 
  sorted, 
  found, 
  searching,
  type 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="visualization-container" ref={containerRef}>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${
              comparing.includes(idx)
                ? 'comparing'
                : swapping.includes(idx)
                ? 'swapping'
                : sorted.includes(idx)
                ? 'sorted'
                : searching.includes(idx)
                ? 'searching'
                : found.includes(idx)
                ? 'found'
                : ''
            }`}
            style={{
              height: `${(value / Math.max(...array)) * 100}%`,
            }}
          >
            <span className="bar-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

View.propTypes = {
  array: PropTypes.arrayOf(PropTypes.number).isRequired,
  comparing: PropTypes.arrayOf(PropTypes.number),
  swapping: PropTypes.arrayOf(PropTypes.number),
  sorted: PropTypes.arrayOf(PropTypes.number),
  found: PropTypes.arrayOf(PropTypes.number),
  searching: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.oneOf(['sort', 'search'])
};

View.defaultProps = {
  comparing: [],
  swapping: [],
  sorted: [],
  found: [],
  searching: [],
  type: 'sort'
};

export default View;
