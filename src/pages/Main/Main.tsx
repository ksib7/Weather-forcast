import React, { FC, useState, useEffect } from "react";

import { Input } from "@/components/UI/Input/Input";

import "./Main.scss";

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

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [weather, setWeather] = useState<any>({});
  const [search, setSearch] = useState("");

  const api = {
    key: "66d23088a184fab8e69da2e5a056a12a",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [longitude, latitude]);

  const getData = (q: any) => {
    if (q.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units="metric"&lat=${latitude}&lon=${longitude}&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
          setSearch("");
        });
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
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};
