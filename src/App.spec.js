/*
import "@testing-library/jest-dom";
import {
  findByTestId,
  findByText,
  render,
  screen,
} from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App.svelte";
*/

describe("App component", () => {
  describe("in Routing context", () => {
    it.todo("displays <LandingPage> at route '/'", () => {
      // use screen.queryByTestID()!
    });
    it.todo("displays <Signup> at route '/signup'", () => {
      // use screen.queryByTestID()!
    });
    it.todo("displays <Login> at route '/login'", () => {
      // use screen.queryByTestID()!
    });
    it.todo("will not display <Signup> at route '/'", () => {
      // use screen.queryByTestID()!
    });
    it.todo("will not display <LandingPage> at route '/signup'", () => {
      // use screen.queryByTestID()!
    });
    it.todo("will not display <Login> at route '/signup'", () => {
      // use screen.queryByTestID()!
    });
  });
});
