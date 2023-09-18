import { render } from "@testing-library/react";
import { Weather } from "./Weather";

describe("Weather", () => {
  it("Renders Component According To Snapshot", () => {
    //Change: Small changes to the Weather test although testing isn't my field of expertise. Changes made as the city prop is no longer used.
    const testCity = "Paris";
    const { container } = render(<Weather city={testCity} />);

    expect(container).toMatchSnapshot();
  });
});
