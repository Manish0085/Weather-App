import { useState } from "react";
import { Cloud, Droplets, Wind, Search } from "lucide-react";
import { Button } from "flowbite-react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    locationName: "City Name",
    temperature: 0.0,
    humidity: 0,
    windSpeed: 0,
    cloudCover: 0,
    description: "Clear",
  });
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      // Replace localhost with your live API URL on Render
      const response = await fetch(`https://weather-app-backend-2-gyrr.onrender.com/weather/${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error("Weather data not found");
      const data = await response.json();

      setWeatherData({
        locationName: data.locationName,
        temperature: data.temperature,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        cloudCover: data.cloudCover,
        description: data.weatherDescriptions[0],
      });
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl" />
        <div className="relative p-8">
          <h1 className="text-4xl font-bold text-white text-center mb-2">Weather Forecast</h1>
          <p className="text-gray-200 text-center mb-8">Enter a city to get the current weather</p>

          <div className="flex gap-2 mb-12">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              className="flex-grow bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none"
              style={{ border: "none" }}
            />
            <Button
              onClick={fetchWeather}
              disabled={loading}
              className="px-4 bg-white/20 hover:bg-white/30 focus:ring-0 border-none"
            >
              {loading ? "Loading..." : <Search className="h-6 w-6 text-white mt-1" />}
            </Button>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">{weatherData.locationName}</h2>
            <p className="text-6xl font-light text-white">{weatherData.temperature.toFixed(1)}°C</p>
            <p className="text-2xl text-gray-200 capitalize">{weatherData.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <WeatherInfoCard icon={<Cloud className="h-6 w-6 text-white" />} value={`${weatherData.cloudCover}%`} label="Cloud Cover" />
            <WeatherInfoCard icon={<Droplets className="h-6 w-6 text-white" />} value={`${weatherData.humidity}%`} label="Humidity" />
            <WeatherInfoCard icon={<Wind className="h-6 w-6 text-white" />} value={`${weatherData.windSpeed} km/h`} label="Wind Speed" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherInfoCard({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
      {icon}
      <span className="text-lg font-semibold text-white mt-2">{value}</span>
      <span className="text-sm text-gray-200">{label}</span>
    </div>
  );
}
