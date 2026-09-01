
import { useState } from "react";

function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Login Toggle</h2>

      {isLoggedIn ? (
        <div>
          <h3>Welcome! You are logged in.</h3>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default LoginToggle;
