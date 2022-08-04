<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/Login.svelte"
  import Navbar from "./components/Navbar.svelte"
  import Signup from "./pages/Signup.svelte";
  import Users from "./pages/Users.svelte"
</script>

<Router url="localhost:4000">
  <Navbar />
  <main>
    <Route path="/">
      <div class="container is-max-desktop" data-testid='home-page'>
        <h1 class="is-title">This is the Landing Page!</h1>
      </div>
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/users">
      <Users />
    </Route>

    <!-- <Signup /> -->
  </main>
</Router>

<style>
  main {
    margin-top: 3rem;
  }
</style>
