import React, { useState, FC, ChangeEvent } from "react";
import { Weather } from "./Weather";
import "./app.css";

export const App: FC = () => {
  //Change: Readability is nice.
  const [input, setInput] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  //Change: A more descriptive name + change of event type because any is weak man.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  console.log(input);

  return (
    <>
      <input
        role="search"
        type="text"
        value={input as unknown as string}
        onChange={handleInputChange}
      />

      <button onClick={() => setCity(input)}>Show Weather</button>

      <Weather city={city} />
    </>
  );
};
