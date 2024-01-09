import React, { useState, useEffect } from "react";
import { WbSunny, NightsStay, AcUnit } from "@mui/icons-material";
import "./Weather.scss";
import axios from "axios";

const WeatherWidget = () => {
  // State for current weather and hourly forecast
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastIcon, setForecastIcon] = useState([]);

  useEffect(() => {
    // API endpoint with Basingstoke's latitude and longitude
    const apiUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=51.2665&longitude=-1.0876&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      // Use dummy data
      const dummyWeather = {
        temperature_2m: 20,
      };
      setCurrentWeather(dummyWeather);

      const dummyForecast = [
        { time: "1PM", temperature: 22 },
        { time: "2PM", temperature: 23 },
        { time: "3PM", temperature: 24 },
        { time: "4PM", temperature: 25 },
      ];
      setHourlyForecast(dummyForecast);

      const dummyForecastIcon = [<WbSunny />, <WbSunny />, <WbSunny />, <WbSunny />];
      setForecastIcon(dummyForecastIcon);
      
    } else {
      // Fetch weather data from the API
      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setCurrentWeather(data.current);

          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const hourlyData = data.hourly;

          const forecastIcon = hourlyData.temperature_2m.map((temp, idx) => {
            const forecastHour = (currentHour + idx) % 24;
            return getWeatherIcon(temp, forecastHour);
          });
          setForecastIcon(forecastIcon);

          // Calculate hourly forecast starting from the current hour
          const forecastHours = hourlyData.time
            .slice(currentHour, currentHour + 4)
            .map((time) => new Date(time).getHours());

          // Format hours for display
          const formattedHours = forecastHours.map((hour) => {
            let displayHour = hour % 12;
            displayHour = displayHour === 0 ? 12 : displayHour; // Convert 0 to 12 for 12 AM/PM
            return displayHour + (hour < 12 ? "AM" : "PM");
          });

          // Update state with formatted hourly forecast
          setHourlyForecast(
            formattedHours.map((hour, idx) => {
              return {
                time: hour,
                temperature: hourlyData.temperature_2m[currentHour + idx],
              };
            })
          );
        })

        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, []);

  const getWeatherIcon = (temperature, hour) => {
    // Determine if it's night time
    const isNight = hour >= 20 || hour < 6;

    if (isNight) {
      return <NightsStay />;
    } else if (temperature < 3) {
      return <AcUnit />;
    } else {
      return <WbSunny />;
    }
  };

  return (
    <div className="widget weather">
      <div className="weather-top">
        <div>
          <div className="weather-location">Basingstoke</div>
          <div className="weather-temp">
            {currentWeather
              ? `${currentWeather.temperature_2m}°`
              : "Loading..."}
          </div>
        </div>
        <div className="weather-icon">
          {currentWeather ? (
            getWeatherIcon(currentWeather.temperature_2m, new Date().getHours())
          ) : (
            <WbSunny />
          )}
        </div>
      </div>

      <div className="weather-content">
        {hourlyForecast.map((forecast, idx) => (
          <div key={idx} className="hourly-forecast">
            <div className="hour">{forecast.time}</div>
            <div className="icon">{forecastIcon[idx]}</div>
            <div className="temp">{forecast.temperature}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
