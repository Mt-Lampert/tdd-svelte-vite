// @ts-nocheck
import "@testing-library/jest-dom";
import {
  findByTestId,
  findByText,
  render,
  screen,
} from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { vi } from "vitest";
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
      expect(submitButton).toBeDisabled();
    });
  });

  describe("on interaction level", () => {
    afterEach(() => vi.resetAllMocks());

    const user = userEvent.setup();
    axios.post = vi.fn();

    it("enables 'Signup' button if both passwords are valid", async () => {
      render(Signup);
      const password01 = screen.getByLabelText("Your password");
      const password02 = screen.getByLabelText("Retype password");
      await user.type(password01, "p4ssword");
      await user.type(password02, "p4ssword");
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeEnabled();
    });

    it.each([
      { pw01: "password", pw02: "pw" },
      { pw01: "pw", pw02: "pw" },
      { pw01: "p@ssword", pw02: "p!ssword" },
    ])(
      "keeps 'Signup' button disabled if passwords '$pw01' and '$pw02' fail",
      async ({ pw01, pw02 }) => {
        render(Signup);
        const password01 = screen.getByLabelText("Your password");
        const password02 = screen.getByLabelText("Retype password");
        await user.type(password01, pw01);
        await user.type(password02, pw02);
        const submitButton = screen.getByRole("button", { name: "Submit" });
        expect(submitButton).toBeDisabled();
      }
    );

    it("disables signup button after clicking", async () => {
      render(Signup);
      const usernameInput = screen.getByLabelText("Your user name");
      const emailInput = screen.getByLabelText("Your email");
      const pwInput = screen.getByLabelText("Your password");
      const pwRetype = screen.getByLabelText("Retype password");
      const button = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, "user111");
      await user.type(emailInput, "user111@mail.com");
      await user.type(pwInput, "p4ssword");
      await user.type(pwRetype, "p4ssword");
      await user.click(button);
      await user.click(button);

      const timesCalled = axios.post.mock.calls.length;
      expect(timesCalled).toBe(1);
    });

    it("sends signup data to the backend", async () => {
      render(Signup);
      const usernameInput = screen.getByLabelText("Your user name");
      const emailInput = screen.getByLabelText("Your email");
      const pwInput = screen.getByLabelText("Your password");
      const pwRetype = screen.getByLabelText("Retype password");
      const button = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, "user111");
      await user.type(emailInput, "user111@mail.com");
      await user.type(pwInput, "p4ssword");
      await user.type(pwRetype, "p4ssword");
      await user.click(button);

      const body = axios.post.mock.calls[0][1];
      expect(body).toEqual({
        username: "user111",
        email: "user111@mail.com",
        password: "p4ssword",
      });
    });

    it("notifies user after successful signup", async () => {
      axios.post.mockResolvedValue({ status: 200 });
      render(Signup);
      const usernameInput = screen.getByLabelText("Your user name");
      const emailInput = screen.getByLabelText("Your email");
      const pwInput = screen.getByLabelText("Your password");
      const pwRetype = screen.getByLabelText("Retype password");
      const button = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, "user111");
      await user.type(emailInput, "user111@mail.com");
      await user.type(pwInput, "p4ssword");
      await user.type(pwRetype, "p4ssword");
      await user.click(button);

      const successMessage = await screen.findByText("Signup successful");
      expect(successMessage).toBeInTheDocument();
      expect(successMessage.classList.contains("is-success")).toBe(true)
    });

    it("notifies user after failing signup", async () => {
      axios.post.mockRejectedValue({ error: { message: "what a fuck!" } });
      render(Signup);
      const usernameInput = screen.getByLabelText("Your user name");
      const emailInput = screen.getByLabelText("Your email");
      const pwInput = screen.getByLabelText("Your password");
      const pwRetype = screen.getByLabelText("Retype password");
      const button = screen.getByRole("button", { name: "Submit" });

      await user.type(usernameInput, "user111");
      await user.type(emailInput, "user111@mail.com");
      await user.type(pwInput, "p4ssword");
      await user.type(pwRetype, "p4ssword");
      await user.click(button);

      const successMessage = await screen.findByText("Signup failed");
      expect(successMessage).toBeInTheDocument();
      expect(successMessage.classList.contains("is-danger")).toBe(true)
    });

  });
});
