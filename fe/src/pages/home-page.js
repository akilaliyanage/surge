import React from "react";
import { LoginButton } from "../components/buttons/login-button";
import { SignupButton } from "../components/buttons/signup-button";

export const HomePage = () => {

  return (
    <div className="content">
      <div className="flex-div">
        <div className="name-content">
          <h1 className="logo">DEV ASSIGNMNET</h1>
          <p className="home-p">akila liyanage</p>
        </div>
        <form>
          {/* <input type="text" placeholder="Email or Phone Number" required />
            <input type="password" placeholder="Password" required /> */}
          <p className="home-p">Already a user? Login using Auth0 account.</p>
          <LoginButton />
          <a href="#">Forgot Password ?</a>
          <hr />
          <SignupButton />
        </form>
      </div>
    </div>
  );
};
