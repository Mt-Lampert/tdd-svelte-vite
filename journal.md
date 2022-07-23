# Journal TDD-Svelte with Başar Büyükkharahman

## 2022-07-23

### 12:30

I made the first interactive Test. It went very smoothly. The `userEvent` package 
made no trouble, `it.each()` didn't either.

And in _Signup.svelte_ we discovered the power of `bind:` and `$:`. Very nice!

## 2022-07-22

### 23:15

Yeah, I made it! All the markup tests were passing for the Signup component. \
Though I thought that there'd be trouble 'round the corner any possible moment, \
But I got them passing with routine and luck and with a steady and slow hand, \
And I had fun fun fun until Daddy took the keyboard away!

### 21:15

I discovered something. Both in Jest and Vitest it _is_ possible to write pending tests.
you just write them like this:

```javascript
describe("Signup page", () => {
  describe("on markup level", () => {
    it.todo("has a 'Sign up' header");
  });
});
```

Have a look at [vitest test.todo](https://vitest.dev/api/#test-todo)
or [jest test.todo](https://jestjs.io/docs/api#testtodoname) for official documentation.

### 11:40

Addendum: I should have mentioned that I just followed the instructions at
[testing-library.com](https://testing-library.com/docs/svelte-testing-library/setup#vitest)
for my success. As I did with installing Bulma for this project.

### 11:00

Since Svelte with Rollup has been abandoned by the creator of Rollup and Svelte,
I've decided to migrate to Svelte with Vite and Vitest, too.

And it went well. After installing the packages (see the updates in `package.json`),
I could build my first test and run it without a reason for rage. Which I never
could using Jest. Nice, nice, nice surprise!
