<script>
  import axios from "axios";

  let username = "";
  let email = "";
  let password01 = "";
  let password02 = "";
  let submitDisabled = true;

  function submit() {
    axios.post("http://localhost:4000/api/1.0/users", {
      username,
      email,
      password: password01,
    });
  }

  $: submitDisabled =
    password01.length < 6 || password02.length < 6 || password01 !== password02;
</script>

<h1 class="title">Sign up!</h1>

<form action="" on:submit|preventDefault={submit}>
  <div class="control">
    <label for="username">Your user name</label>
    <input type="text" id="username" bind:value={username} />
  </div>

  <div class="control">
    <label for="email">Your email</label>
    <input type="text" id="email" bind:value={email}/>
  </div>

  <div class="control">
    <label for="password">Your password</label>
    <input type="password" id="password" bind:value={password01} />
  </div>

  <div class="control">
    <label for="pwretype">Retype password</label>
    <input type="password" id="pwretype" bind:value={password02} />
  </div>

  <div class="control">
    <button class="button is-link" disabled={submitDisabled}>Submit</button>
  </div>
</form>

<style></style>
