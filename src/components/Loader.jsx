import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-orb">
        <div className="orb-ring ring1"></div>
        <div className="orb-ring ring2"></div>
        <div className="orb-ring ring3"></div>
        <div className="orb-core">⛅</div>
      </div>
      <p className="loader-text">Fetching live weather data...</p>
    </div>
  );
};

export default Loader;
