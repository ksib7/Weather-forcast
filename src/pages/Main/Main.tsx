import React, { FC, useState, useEffect } from "react";

import { Input } from "@/components/UI/Input/Input";

import "./Main.scss";
import { Preloader } from "@/components/UI/Preloader/Preloader";

export const Main: FC = () => {
  const builderDate = (e: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const day = days[e.getDay()];
    const date = e.getDate();
    const month = months[e.getMonth()];
    const year = e.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const [weather, setWeather] = useState<any>({});
  const [search, setSearch] = useState("");
  const [preloader, setPreloader] = useState(true);
  const [error, setError] = useState("");

  const api = {
    key: "66d23088a184fab8e69da2e5a056a12a",
  };

  const getData = (q: any) => {
    if (q.key === "Enter") {
      try {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&units="metric"&appid=${api.key}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            console.log(result);
            setSearch("");
          });
      } catch (err: any) {
        setError(err.name);
      } finally {
        setPreloader(false);
      }
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 288
            ? "main warm"
            : "main"
          : "main"
      }
    >
      <main>
        <header>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search . . ."
            onKeyUp={getData}
            autoFocus
          />
        </header>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location">
              <p className="location__city">
                {weather.name[0].toUpperCase() + weather.name.slice(1)},
                {weather.sys.country}
              </p>
              <div className="location__date">{builderDate(new Date())}</div>
            </div>
            <div className="weather">
              <div className="weather__temp">
                {Math.round(weather.main.temp) - 274}&deg;C
              </div>
              <p className="weather__description">{weather.weather[0].main}</p>
            </div>
            <div className="weather__more">
              <div className="weather__additional">
                Wind: {Math.round(weather.wind.speed)} m/s
              </div>
              <div className="weather__additional">
                Pressure: {Math.round(weather.main.pressure / 1.333)} mmHg
              </div>
              <div className="weather__additional">
                Feels like: {Math.round(weather.main.feels_like - 274)}&deg;C
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                boxShadow: "0px 0px rgb(0 0 0 / 0)",
                display: "block",
                marginTop: "50px",
                marginBottom: "10px",
              }}
              className="weather__additional"
            >
              Enter your location &#11014;
            </p>
            <Preloader />
          </div>
        )}
      </main>
    </div>
  );
};
