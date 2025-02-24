import React, { useState, useEffect } from "react";
import { WiThermometer, WiWindy, WiHumidity, WiCloudy } from "react-icons/wi";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const dummyData = {
      main: {
        temp: 22,
        humidity: 65,
      },
      wind: {
        speed: 5,
      },
      weather: [
        {
          description: "clear sky",
        },
      ],
    };
    setWeatherData(dummyData);
  }, []);

  if (!weatherData) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  const { main, wind, weather } = weatherData;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const condition = weather[0].description;

  return (
    <div className="">
      <p className="text-gray-300 text-start text-xl mt-4 capitalize">Condition: {condition}</p>
      <div className="grid grid-cols-4 mt-4 gap-1">
        {/* Temperature */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiThermometer className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">Temp: {temperature}°C</p>
        </div>
        
        {/* Wind */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiWindy className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">Wind: {windSpeed} m/s</p>
        </div>

        {/* Humidity */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out ">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiHumidity className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">Humidity: {humidity}%</p>
        </div>

        {/* Condition */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiCloudy className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
