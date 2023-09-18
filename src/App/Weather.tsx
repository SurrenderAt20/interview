import React, { useState } from "react";

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
const Weather = (props: WeatherProps) => {
  const [info, setInfo] = useState<WeatherInfo>({
    city: null,
    temp: null,
    icon: null,
  });

  const isPending = React.useRef(false);

  React.useLayoutEffect(() => {
    if (props.city !== null || isPending.current === false) {
      isPending.current = true;

      fetch(`${API_URL}/geo/1.0/direct?q=${props.city}&appid=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          fetch(
            `${API_URL}/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=4c4f0b1876954338598a7be96c66527b`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              setInfo({
                city: data.name,
                temp: data.main.temp,
                icon: `${API_URL}/img/wn/${data.weather[0].icon}@2x.png` as any,
              });

              isPending.current = false;
            });
        });
    }
  }, [props.city]);

  return (
    <>
      <h1>{info.city}</h1>

      <p>{info.temp && ~~info.temp} Celcius</p>

      <img src={info.icon as unknown as string} alt="Icon" />
    </>
  );
};

export { Weather };
