import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
/*
import { vi } from "vitest";
*/
import App from "./App.svelte";

describe("App component", () => {
  describe("importing the navbar", () => {
    it.each([
      { route: "/", desc: "LandingPage", testID: "home-link" },
      { route: "/signup", desc: "Signup", testID: "signup-link" },
      { route: "/login", desc: "Login", testID: "login-link" },
      { route: "/users", desc: "Users", testID: "users-link" },
    ])("has a link for <$desc>", ({ route, desc, testID }) => {
      render(App);
      const link = screen.queryByTestId(testID);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe(route);
    });
  });

  describe("in Routing context", () => {
    const user = userEvent.setup();

    it.each([
      { route: "/", desc: "LandingPage", code: "home" },
      { route: "/signup", desc: "Signup", code: "signup" },
      { route: "/login", desc: "Login", code: "login" },
      { route: "/users", desc: "Users", code: "users" },
    ])(
      "displays <$desc> after clicking route '$route'",
      async ({ code }) => {
        render(App);
        const link = screen.queryByTestId(`${code}-link`);
        expect(link).toBeInTheDocument();
        await user.click(link);
        const targetPage = await screen.queryByTestId(`${code}-page`);
        expect(targetPage).toBeInTheDocument();
      }
    );


/*
*/

    it.each([
      { desc: "Signup", link: "home", negTarget: "signup" },
      { desc: "Users",  link: "home", negTarget: "users" },
      { desc: "Login", link: "home", negTarget: "login" },
      { desc: "LandingPage", link: "signup", negTarget: "home" },
      { desc: "Users", link: "signup", negTarget: "users" },
      { desc: "Signup", link: "login", negTarget: "signup" },
      { desc: "Users", link: "login", negTarget: "users" },
      { desc: "LandingPage", link: "users", negTarget: "home" },
      { desc: "Login", link: "users", negTarget: "login" },
        ])(
      "will not display <$desc> after clicking route '/$link'",
      async ({ link, negTarget }) => {
        render(App);
        const myLink = screen.queryByTestId(`${link}-link`);
        expect(myLink).toBeInTheDocument();
        await user.click(myLink);
        const targetPage = await screen.queryByTestId(`${negTarget}-page`);
        expect(targetPage).not.toBeInTheDocument();
      }
    );

  });
});
