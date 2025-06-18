import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../input";
import { loginUser } from "../../store/actions";

import "./sign-in.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, loginSuccess, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginSuccess && userToken) {
      localStorage.setItem("userToken", userToken);

      window.dispatchEvent(new Event("localStorageUserTokenUpdated"));

      navigate("/");
    }
  }, [loginSuccess, userToken, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Sign In</h2>
      <div className="input-container">
        <Input
          id="email-address"
          label="Email address"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="action-block">
        <button className="create-button">Login</button>
        <span className="security-question">
          Don’t have an account?{" "}
          <Link to="/sign-up">
            <span className="sign">Sign Up</span>
          </Link>
          .
        </span>
      </div>
    </form>
  );
};

export default SignIn;
