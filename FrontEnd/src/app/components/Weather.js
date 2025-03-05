"use client"; // Mark this as a Client Component
import React, { useState, useEffect } from "react";
import { WiThermometer, WiWindy, WiHumidity, WiCloudy } from "react-icons/wi";
import { useTranslation } from "react-i18next";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { t } = useTranslation();

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
          description: "clear sky", // Example condition
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

  // Normalize the condition string to match the translation keys
  const normalizeCondition = (condition) => {
    return condition
      .toLowerCase() // Convert to lowercase
      .split(" ") // Split into words
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      ) // Capitalize the first letter of each word except the first
      .join(""); // Join into a single string
  };

  // Translate the weather condition
  const translatedCondition = t(`weatherConditions.${normalizeCondition(condition)}`);

  return (
    <div className="">
      <p className="text-gray-300 text-start text-xl mt-4 capitalize">
        {t('condition')}: {translatedCondition}
      </p>
      <div className="grid grid-cols-4 mt-4 gap-1">
        {/* Temperature */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiThermometer className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">
            {t('temperature')}: {temperature}°C
          </p>
        </div>

        {/* Wind */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiWindy className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">
            {t('wind')}: {windSpeed} m/s
          </p>
        </div>

        {/* Humidity */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiHumidity className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">
            {t('humidity')}: {humidity}%
          </p>
        </div>

        {/* Condition */}
        <div className="grid place-items-center bg-gradient-to-r from-blue-500 to-slate-700 border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-4">
          <span className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500">
            <WiCloudy className="text-xl text-white" />
          </span>
          <p className="text-base font-semibold text-white mt-2">
            {translatedCondition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;