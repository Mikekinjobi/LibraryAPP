// import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>
        Hello <span>!</span> Welcome to Pages
      </h1>

      <div className="homebuttons-div">
        <Link to="/signup">
          <button className="signup-button">Sign up</button>
        </Link>

        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
}
