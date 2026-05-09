import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWeather } from "./hooks/useWeather";
import { cities } from "./api/weatherApi";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import "./App.css";

const queryClient = new QueryClient();

function WeatherDashboard() {
  const [selectedCityKey, setSelectedCityKey] = useState("bangalore");
  const cityCoords = cities[selectedCityKey];

  const { data, isLoading, isError, isFetching, refetch } = useWeather(cityCoords);

  return (
    <div className="app-bg">
      {/* Animated background orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-icon">🌤️</div>
          <div>
            <h1 className="app-title">Weather Dashboard</h1>
            <p className="app-subtitle">Live weather powered by Open-Meteo</p>
          </div>
        </header>

        {/* Search */}
        <SearchBar
          selectedCity={selectedCityKey}
          onCityChange={(city) => setSelectedCityKey(city)}
        />

        {/* States */}
        {isLoading && <Loader />}

        {isError && (
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h3>Failed to fetch weather</h3>
            <p>Please check your connection and try again.</p>
            <button className="refresh-btn" onClick={() => refetch()}>
              Try Again
            </button>
          </div>
        )}

        {data && !isLoading && (
          <>
            <WeatherCard
              data={data}
              cityName={selectedCityKey}
              isRefetching={isFetching}
            />
            <div className="refresh-row">
              <button
                className="refresh-btn"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                {isFetching ? "⏳ Refreshing..." : "🔁 Refresh Weather"}
              </button>
            </div>
          </>
        )}

        <footer className="app-footer">
          <span>Data from Open-Meteo API · Auto-refresh every 30s</span>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  );
}
