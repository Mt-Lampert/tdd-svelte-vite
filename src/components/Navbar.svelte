<script>
  import { Link } from "svelte-routing";
</script>

<nav>
  <Link to="/" data-testid="home-link">Home</Link>
  <Link to="/signup" data-testid="signup-link">Signup</Link>
  <Link to="/login" data-testid="login-link">Login</Link>
  <Link to="/users" data-testid="users-link">Users</Link>
</nav>
