<script>
  import { Router, Route } from "svelte-routing";
  import Signup from "./pages/Signup.svelte";
  import Navbar from "./components/Navbar.svelte"
</script>

<Router url="localhost:4000">
  <Navbar />
  <main>
    <Route path="/">
      <div class="container is-max-desktop">
        <h1 class="is-title">This is the Landing Page!</h1>
      </div>
    </Route>

    <Signup />
  </main>
</Router>

<style>
  main {
    margin-top: 3rem;
  }
</style>
