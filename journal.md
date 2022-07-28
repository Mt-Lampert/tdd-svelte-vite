# Journal TDD-Svelte with Başar Büyükkharahman

## 2022-07-28

### 18:00

Improved the Submit button experience: it has a spinner now while waiting for the backend and it can only be clicked once.

## 2022-07-27

Just finished the formatting. It's nice.

### 17:10

A simple mock did everything I could ask for. There's still some trouble with _jsdom,_ but as long as the tests are passing, I see no reason to worry. 

Next is formatting the Signup in Bulma style. Will be fun.


### 09:50

Annotation to S02V05 (Mocking): In the last part of the video, BB is testing MSW, not the app. This is against the rules of testing where you test your own app and leave the testing of your tools to the tool developers. Of course you can write tests to find out for yourself how the framework you are using is actually doing its job. That's all right as long as it has the right label ("prototype testing"). However, BB's test doesn't have it!

What I found out yesterday: The included mocking tools in _jest_ and _vitest_ are perfectly sufficient to mock _axios_ and _fetch()._ Just check out the following parts of the official documentation:

- [Jest mock functions](https://jestjs.io/docs/mock-function-api)
- [Vitest mock functions](https://vitest.dev/api/#vi-mock)
- [Vitest mocking modules](https://vitest.dev/guide/mocking.html#modules)

## 2022-07-25


### 21:10

MSW doesn't work! It pretends to support ESM (Extended Script Module) without following
the rules of ESM. Importing it only results in errors. 

So now I try an alternative, the _axios-mock-adapter._ At least it loads. Wish me luck that it will save me.



### 16:15

After installing 'msw', the test mocking the HTTP request function made no longer sense, so
I deleted it. 

## 2022-07-24

### 19:30

First things first: This test was _passing!_  

```javascript
it("sends signup data to the backend", async () => {
  const mockFn = vi.fn();
  axios.post = mockFn;

  render(Signup);
  const usernameInput = screen.getByLabelText("Your user name");
  const emailInput = screen.getByLabelText("Your email");
  const pwInput = screen.getByLabelText("Your password");
  const pwRetype = screen.getByLabelText("Retype password");
  const button = screen.getByRole("button", {name: "Submit"})

  await user.type(usernameInput, "user111");
  await user.type(emailInput, "user111@mail.com");
  await user.type(pwInput, "p4ssword");
  await user.type(pwRetype, "p4ssword");
  await user.click(button);

  const body = mockFn.mock.calls[0][1];
  expect(body).toEqual({
    username: "user111",
    email: "user111@mail.com",
    password: "p4ssword",
  })
});
```

But it needs some explanation.

```javascript
const mockFn = vi.fn();
// @ts-ignore
axios.post = mockFn;
```
In this part we replace axios.post with a reference to the mock function `vi.fn()` returns.
Doing so will call `mockFn`, not the original `axios.post` method when the `submit` function
is called within the rendered `<Signup>` Component.

```javascript
const body = mockFn.mock.calls[0][1];
expect(body).toEqual({
  username: "user111",
  email: "user111@mail.com",
  password: "p4ssword",
});
```

Here we see what this mocking is really about, which is _keeping track of the arguments passed to axios.post()!_

- `mockFn.mock.calls[0]` refers to the _first call_ of `axios.post`
- `mockFn.mock.calls[0][1]` refers to the _second argument_ of the first call of `axios.post`

Thus, the test is checking whether the second argument to the first call of `axios.post` is property by
property equal to the object passed to `.toEqual`. If it is, `submit` has done a good job of collecting
the right data from the form and passing it to `axios.post` in the correct way.

Which it has!




## 2022-07-23

### 18:10

I copied the MSW-setup from the tdd-React project into this project for later use.

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
