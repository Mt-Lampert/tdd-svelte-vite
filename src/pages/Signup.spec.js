import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/svelte";
// @ts-ignore
import Signup from "./Signup.svelte";

describe("Signup page", () => {
  describe("on markup level", () => {
    it("has a 'Sign up' header", () => {
      render(Signup);
      const header = screen.getByRole("heading", { name: "Sign up!" });
      expect(header).toBeTruthy;
    });

    it("has a 'username' input field", () => {
      render(Signup);
      const usernameInput = screen.getByLabelText("Your user name");
      expect(usernameInput).toBeTruthy;
    });

    it("has an 'email' input field", () => {
      render(Signup);
      const emailInput = screen.getByLabelText("Your email");
      expect(emailInput).toBeTruthy;
    });

    it("has a 'password' input field", () => {
      render(Signup);
      const passwordInput = screen.getByLabelText("Your password");
      expect(passwordInput).toBeTruthy;
      // @ts-ignore
      expect(passwordInput.type).toBe("password");
    });

    it("has a 'retype password' input field", () => {
      render(Signup);
      const passwordRetype = screen.getByLabelText("Retype password");
      expect(passwordRetype).toBeTruthy;
      // @ts-ignore
      expect(passwordRetype.type).toBe("password");
    });

    it("has a 'Submit' button", () => {
      render(Signup);
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeTruthy;
    });

    it("has the 'Submit' button disabled at first", () => {
      render(Signup);
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeDisabled;
    });
  });
});
