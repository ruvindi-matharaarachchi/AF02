import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

test("renders search input", () => {
  render(<SearchBar onSearch={() => {}} />);
  const input = screen.getByPlaceholderText(/search for a country/i);
  expect(input).toBeInTheDocument();
});

test("calls onSearch when typing", () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);
  const input = screen.getByPlaceholderText(/search for a country/i);
  fireEvent.change(input, { target: { value: "japan" } });
  expect(mockSearch).toHaveBeenCalledWith("japan");
});
