<script>
// import { isDisabled } from "@testing-library/user-event/dist/types/utils";

  import axios from "axios";

  let username = "";
  let email = "";
  let password01 = "";
  let password02 = "";
  let submitDisabled = true;
  let submitState = "";
  let valErrors = {
    username: "",
    email: "",
    password: "",
  };

  let isLoading = false;

  let normalButton = "button is-link";
  let loadingButton = normalButton + " is-loading";

  function submit() {
    isLoading = true;
    axios
      .post("http://localhost:4000/api/1.0/users", {
        username,
        email,
        password: password01,
      })
      .then(() => {
        isLoading = false;
        submitState = "success";
      })
      .catch((axiosObject) => {
        // if there's val errors in axiosObject, they will override
        // the values in the current valErrors
        valErrors = {
          ...valErrors,
          ...axiosObject.response.data.validationErrors,
        };
        isLoading = false;
        submitState = "error";
      });
  }

  $: submitDisabled =
    password01.length < 6 || password02.length < 6 || password01 !== password02;
</script>

<div class="container is-max-desktop" data-testid='signup-page'>
  <form
    action=""
    on:submit|once|preventDefault={submit}
    class="container box form-box"
  >
    <h1 class="title is-centered">Sign up!</h1>

    <div class="field">
      <label for="username" class="label">Your user name</label>
      <div class="control">
        <input type="text" id="username" class="input" bind:value={username} />
      </div>
      <div class="has-text-danger">{valErrors.username}</div>
    </div>

    <div class="field">
      <label for="email" class="label">Your email</label>
      <div class="control">
        <input type="text" id="email" class="input" bind:value={email} />
      </div>
      <div class="has-text-danger">{valErrors.email}</div>
    </div>

    <div class="field">
      <label for="password" class="label">Your password</label>
      <div class="control block">
        <input
          type="password"
          id="password"
          class="input"
          bind:value={password01}
        />
      </div>
    </div>

    <div class="field">
      <label for="pwretype" class="label">Retype password</label>
      <div class="control block">
        <input
          type="password"
          id="pwretype"
          class="input"
          bind:value={password02}
        />
        <div class="has-text-danger">{valErrors.password}</div>
      </div>
    </div>

    <div class="field mt-5">
      <div class="control block is-centered">
        <button
          class={isLoading ? loadingButton : normalButton}
          disabled={submitDisabled || submitState === "success"}>Submit</button
        >
      </div>
    </div>
  </form>

  {#if submitState === "success"}
    <div class="notification is-success">Signup successful</div>
  {:else if submitState === "error"}
    <div class="notification is-danger">Signup failed</div>
  {/if}
</div>

<style>
  .form-box {
    width: 40rem;
  }
</style>
