import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState("");

  const api = {
    key: "66d23088a184fab8e69da2e5a056a12a",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [longitude, latitude]);

  const getData = (q) => {
    if (q.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units="metric"&lat=${latitude}&lon=${longitude}&appid=${api.key}`
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            console.log(weather);
          })
      );
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        weather,
        search,
        setSearch,
        getData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
