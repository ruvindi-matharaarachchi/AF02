import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("renders login form", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/enter your name/i);
  expect(input).toBeInTheDocument();
});
