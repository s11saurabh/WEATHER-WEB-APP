import React, { useEffect, useState, useCallback } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const intialParameter = "Dhanbad";
  const [searchValue, setSearchValue] = useState(intialParameter);
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = useCallback(async (value) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=3e95d4d24fd38099c290ca524ec38f7d`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getWeatherInfo(intialParameter);
  }, [getWeatherInfo]);

  return (
    <>
      <img src="./back.jpg" className="App-logo" alt="logo" />
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={() => {
              getWeatherInfo(searchValue);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
