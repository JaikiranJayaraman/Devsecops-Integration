import axios from "axios";

export const cities = {
  bangalore: { lat: 12.97, lon: 77.59 },
  mumbai: { lat: 19.07, lon: 72.87 },
  delhi: { lat: 28.61, lon: 77.23 },
  chennai: { lat: 13.08, lon: 80.27 },
  kolkata: { lat: 22.57, lon: 88.36 },
  hyderabad: { lat: 17.38, lon: 78.49 },
  pune: { lat: 18.52, lon: 73.85 },
  ahmedabad: { lat: 23.02, lon: 72.57 },
  jaipur: { lat: 26.91, lon: 75.79 },
  surat: { lat: 21.17, lon: 72.83 },
};

export const weatherCodeMap = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Icy Fog", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  53: { label: "Moderate Drizzle", icon: "🌦️" },
  55: { label: "Dense Drizzle", icon: "🌧️" },
  61: { label: "Slight Rain", icon: "🌧️" },
  63: { label: "Moderate Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  71: { label: "Slight Snow", icon: "🌨️" },
  73: { label: "Moderate Snow", icon: "❄️" },
  75: { label: "Heavy Snow", icon: "❄️" },
  80: { label: "Slight Showers", icon: "🌦️" },
  81: { label: "Moderate Showers", icon: "🌧️" },
  82: { label: "Violent Showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  99: { label: "Hail Thunderstorm", icon: "⛈️" },
};

export const fetchWeather = async ({ lat, lon }) => {
  const { data } = await axios.get(
    `https://api.open-meteo.com/v1/forecast`,
    {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: "relative_humidity_2m,apparent_temperature",
        timezone: "auto",
      },
    }
  );
  return data;
};
