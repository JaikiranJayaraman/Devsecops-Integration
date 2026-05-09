import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weatherApi";

export const useWeather = (city) => {
  return useQuery({
    queryKey: ["weather", city.lat, city.lon],
    queryFn: () => fetchWeather(city),
    refetchInterval: 30000, // auto-refetch every 30s
    staleTime: 20000,
    retry: 2,
  });
};
