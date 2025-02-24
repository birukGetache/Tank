import React, { useState, useEffect } from "react";
import { WiThermometer, WiWindy, WiHumidity, WiCloudy } from "react-icons/wi";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Dummy data simulating an API response
    const dummyData = {
      main: {
        temp: 22, // Temperature in Celsius
        humidity: 65, // Humidity in percentage
      },
      wind: {
        speed: 5, // Wind speed in m/s
      },
      weather: [
        {
          description: "clear sky", // Weather condition
        },
      ],
    };

    setWeatherData(dummyData);
  }, []);

  if (!weatherData) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { main, wind, weather } = weatherData;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const condition = weather[0].description;

  return (
    <div className="weather-info p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl text-white transform transition-all duration-500 hover:scale-105">
      <h2 className="text-3xl font-bold mb-6 text-center">Weather Info</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
          <WiThermometer className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">25</p>
          </div>
        </div>
        <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
          <WiWindy className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">35</p>
          </div>
        </div>
        <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
          <WiHumidity className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">45</p>
          </div>
        </div>
        <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
          <WiCloudy className="text-4xl mr-4" />
          <div>
            <p className="text-lg font-semibold">Good</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
