import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'


import Counter from "./Counter.svelte"

describe("Counter", () => {
  it("has a '+' button", () => {
    render(Counter)
    const button = screen.getByRole("button", { name: "+"});
    expect(button).toBeTruthy;
  })
})

