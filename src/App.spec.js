import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
/*
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
*/
import App from "./App.svelte";

describe("App component", () => {
  describe("importing the navbar", () => {
    it.each([
      { route: "/", desc: "LandingPage", testID: "home-link" },
      { route: "/signup", desc: "Signup", testID: "signup" },
      { route: "/login", desc: "Login", testID: "login" },
      { route: "/users", desc: "Users", testID: "users-page" },
    ])("has a link for <$desc>", ({ route, desc, testID }) => {
      render(App);
      const link = screen.queryByTestId(testID);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe(route);
    });
  });

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
