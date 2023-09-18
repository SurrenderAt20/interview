import React from "react";
import { Weather } from "./Weather";
import type { FC } from "react";
import "./app.css";

export const App: FC = () => {
  const [input, setInput] = React.useState(null as unknown as string);
  const [city, setCity] = React.useState(null as unknown as string);

  const doStuff = (event: any) => setInput(event.target.value);

  console.log(input);

  return (
    <>
      <input
        role="search"
        type="text"
        value={input as unknown as string}
        onChange={doStuff}
      />

      <button onClick={() => setCity(input)}>Show Weather</button>

      <Weather city={city} />
    </>
  );
};
