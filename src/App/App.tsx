import React, { useState, FC, ChangeEvent } from "react";
import { Weather } from "./Weather";
import "./app.css";

export const App: FC = () => {
  //Change: Readability and typesafety.
  const [input, setInput] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  //Change: A more descriptive name + change of event type because 'any' is weak man.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  //Change: Creating another handler to avoid inline function
  const handleShowWeather = () => {
    setCity(input);
  };

  return (
    <>
      <input
        role="search"
        type="text"
        //Change: placeholder for better ux
        placeholder="Search for a city"
        //Change: Readability and typesafety.
        value={input || ""}
        onChange={handleInputChange}
      />

      <button onClick={handleShowWeather}>Show Weather</button>

      <Weather city={city} />
    </>
  );
};
