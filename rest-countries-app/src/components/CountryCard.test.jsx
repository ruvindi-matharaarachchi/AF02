import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "./CountryCard";

const mockCountry = {
  name: { common: "Japan" },
  flags: { svg: "https://flagcdn.com/jp.svg" },
  capital: ["Tokyo"],
  region: "Asia",
  population: 126300000,
  cca3: "JPN",
};

test("renders country card with correct details", () => {
  render(
    <BrowserRouter>
      <CountryCard country={mockCountry} />
    </BrowserRouter>
  );

  expect(screen.getByText("Japan")).toBeInTheDocument();
  expect(screen.getByText(/Capital:/)).toBeInTheDocument();
  expect(screen.getByText(/Region:/)).toBeInTheDocument();
  expect(screen.getByText(/Population:/)).toBeInTheDocument();
});
