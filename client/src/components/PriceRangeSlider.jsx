import React, { useState, useEffect, useRef } from 'react';
import './css/PriceRangeSlider.css';

const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(7500);
  const range = useRef(null);

  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  useEffect(() => {
    const progress = range.current;
    const minVal = parseInt(minPrice);
    const maxVal = parseInt(maxPrice);
    const maxRange = parseInt(progress.getAttribute('max'));

    const rangeWidth = maxRange - minVal;
    const progressWidth = maxVal - minVal;

    progress.style.left = `${(minVal / maxRange) * 100}%`;
    progress.style.right = `${100 - (progressWidth / rangeWidth) * 100}%`;
  }, [minPrice, maxPrice]);

  return (
    <div className="wrapper">
      <header>
        <h2>Price Range</h2>
        <p>Use slider or enter min and max price</p>
      </header>
      <div className="price-input">
        <div className="field">
          <span>Min</span>
          <input
            type="number"
            className="input-min"
            value={minPrice}
            onChange={(e) => handleInputChange(e, 'min')}
          />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>Max</span>
          <input
            type="number"
            className="input-max"
            value={maxPrice}
            onChange={(e) => handleInputChange(e, 'max')}
          />
        </div>
      </div>
      <div className="slider">
        <div className="progress" ref={range}></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="10000"
          value={minPrice}
          step="100"
          onChange={(e) => handleInputChange(e, 'min')}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="10000"
          value={maxPrice}
          step="100"
          onChange={(e) => handleInputChange(e, 'max')}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
