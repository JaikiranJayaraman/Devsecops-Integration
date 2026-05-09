import React, { useState } from "react";
import { cities } from "../api/weatherApi";
import "./SearchBar.css";

const SearchBar = ({ selectedCity, onCityChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setError("");
    if (val.trim().length > 0) {
      const filtered = Object.keys(cities).filter((c) =>
        c.startsWith(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (cityName) => {
    setInputValue(cityName.charAt(0).toUpperCase() + cityName.slice(1));
    setSuggestions([]);
    onCityChange(cityName);
  };

  const handleSearch = () => {
    const key = inputValue.toLowerCase().trim();
    if (cities[key]) {
      selectCity(key);
    } else {
      setError(`"${inputValue}" not found. Try: ${Object.keys(cities).join(", ")}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-inner">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search city (e.g. Mumbai, Delhi...)"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((city) => (
                <li
                  key={city}
                  className="suggestion-item"
                  onClick={() => selectCity(city)}
                >
                  📍 {city.charAt(0).toUpperCase() + city.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="search-error">⚠️ {error}</p>}

      <div className="city-chips">
        {Object.keys(cities).map((city) => (
          <button
            key={city}
            className={`city-chip ${selectedCity === city ? "active" : ""}`}
            onClick={() => selectCity(city)}
          >
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
