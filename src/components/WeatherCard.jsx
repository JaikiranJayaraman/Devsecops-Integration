import React from "react";
import { weatherCodeMap } from "../api/weatherApi";
import "./WeatherCard.css";

const getWindDirection = (degrees) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8];
};

const WeatherCard = ({ data, cityName, isRefetching }) => {
  if (!data || !data.current_weather) {
    return <div className="error-card">No weather data available.</div>;
  }
  const { current_weather } = data;
  const { temperature, windspeed, winddirection, weathercode, time } =
    current_weather;

  const condition = weatherCodeMap[weathercode] || { label: "Unknown", icon: "🌡️" };

  let formattedTime = "--";
  try {
    if (time) {
      formattedTime = new Date(time).toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "short",
        month: "short",
        year: "numeric",
      });
    }
  } catch (e) {
    console.error("Invalid time value", time);
  }

  // Rough humidity from hourly (first value)
  const humidity = data?.hourly?.relative_humidity_2m?.[0] ?? "--";
  const feelsLike = data?.hourly?.apparent_temperature?.[0] ?? "--";

  return (
    <div className="weather-card">
      {isRefetching && (
        <div className="refetch-badge">🔄 Updating...</div>
      )}

      <div className="card-header">
        <div className="city-info">
          <h2 className="city-name">
            📍 {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
          </h2>
          <p className="last-updated">Last updated: {formattedTime}</p>
        </div>
        <div className="condition-badge">
          <span className="condition-icon">{condition.icon}</span>
          <span className="condition-label">{condition.label}</span>
        </div>
      </div>

      <div className="temp-hero">
        <span className="temp-value">{temperature}</span>
        <span className="temp-unit">°C</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💨</div>
          <div className="stat-info">
            <span className="stat-label">Wind Speed</span>
            <span className="stat-value">{windspeed} km/h</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧭</div>
          <div className="stat-info">
            <span className="stat-label">Wind Direction</span>
            <span className="stat-value">
              {winddirection}° {getWindDirection(winddirection)}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-info">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{humidity}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌡️</div>
          <div className="stat-info">
            <span className="stat-label">Feels Like</span>
            <span className="stat-value">{feelsLike}°C</span>
          </div>
        </div>
      </div>

      <div className="auto-refresh-note">
        ⏱ Auto-refreshes every <strong>30 seconds</strong>
      </div>
    </div>
  );
};

export default WeatherCard;
