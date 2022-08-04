<script>
  import { Link } from "svelte-routing";
</script>

<nav>
  <Link to="/" data-testid="home-link ">Home</Link>
  <Link to="/signup" data-testid="signup">Signup</Link>
  <Link to="/login" data-testid="login">Login</Link>
  <Link to="/users" data-testid="users-page">Users</Link>
</nav>
