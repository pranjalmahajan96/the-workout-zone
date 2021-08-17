import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginBtnClicked } from "../userSlice";
import { useState } from "react";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { userLoading } = useSelector(state => state.user);
  console.log({userLoading})
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = (email, password) => {
    if (email === "" || password === "") {
      return setError("All the fields are required");
    } else {
      return dispatch(loginBtnClicked({ email, password }));
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="wrapper-input">
          <h2>FitGram </h2>
          <label htmlFor="" className="input-label">
            Email Id
          </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="" className="input-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <div>{error === "" ? null : error}</div>
          </div>
          <div>
            <button
              className="btn btn-filled btn-no-hover centered"
              style={{ display: "block" }}
              type="submit"
              onClick={() => loginHandler(email, password)}
            >
              {userLoading === "not-loading" ? "Login" : userLoading === "loading" ? "Logging in..." : "Try Again" }
            </button>
          </div>
        </div>

        <div>
          Don't have an account{" "}
          <NavLink className="link btn-outline" to="/signup">
            SIGN UP
          </NavLink>
        </div>
      </div>
    </div>
  );
};
