import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "./FilterDropdown";

test("renders region filter dropdown", () => {
  render(<FilterDropdown onSelect={() => {}} />);
  const dropdown = screen.getByRole("combobox");
  expect(dropdown).toBeInTheDocument();
});

test("calls onSelect when selecting a region", () => {
  const mockSelect = jest.fn();
  render(<FilterDropdown onSelect={mockSelect} />);
  const dropdown = screen.getByRole("combobox");
  fireEvent.change(dropdown, { target: { value: "Asia" } });
  expect(mockSelect).toHaveBeenCalledWith("Asia");
});
