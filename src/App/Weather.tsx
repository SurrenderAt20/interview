import React, { useState, useEffect } from "react";

//Change: Typesafety

type WeatherProps = {
  city: string | null;
};

type WeatherInfo = {
  city: string | null;
  temp: number | null;
  icon: string | null;
};

const API_KEY = "4c4f0b1876954338598a7be96c66527b";
const API_URL = "https://api.openweathermap.org";

//Change: Use of defined types
const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [info, setInfo] = useState<WeatherInfo>({
    city: null,
    temp: null,
    icon: null,
  });

  //Change: Wrapping the API call inside a useEffect to ensure weather data is fetched whenever the city prop changes.
  // I am also using async/await. Readability but also makes it more clear that one call depends on previous.
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      //Change: Try/Catch statement for error handling
      try {
        const geoResponse = await fetch(
          `${API_URL}/geo/1.0/direct?q=${city}&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        const weatherResponse = await fetch(
          `${API_URL}/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&units=metric&appid=${API_KEY}`
        );

        //Change: new variable to use in setInfo
        const weatherData = await weatherResponse.json();

        setInfo({
          city: weatherData.name,
          temp: weatherData.main.temp,
          icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <>
      <h1>{info.city}</h1>
      <p>{info.temp && ~~info.temp} Celcius</p>
      <img src={info.icon ? info.icon : ""} alt="Weather Icon" />
    </>
  );
};

export { Weather };
