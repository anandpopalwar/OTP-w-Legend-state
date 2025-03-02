import {
  Reactive,
  useObservable,
  useObserve,
  useObserveEffect,
} from "@legendapp/state/react";
import React, { useEffect, useRef } from "react";
import "./PublicComponents.scss";
import { useUserContext } from "../Contexts/UserContext";
import { Navigate, NavLink, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const renderCount = ++useRef(0).current;
  const {
    username,
    password,
    email,
    rememberMe,
    isUserLoggedIn,
    setOtpTimerToDefault,
  } = useUserContext();

  const login = () => {
    console.log("login");
    isUserLoggedIn.set(true);
    // navigate("/Dashboard");
  };

  useObserveEffect(isUserLoggedIn, (v) => {
    if (v.value) {
      console.log("first");
      navigate("/Dashboard");
    } else {
      console.log("second");
      isUserLoggedIn.set(false);
    }
  });

  //   useObserve(isUserLoggedIn, (v) => {
  //     console.log(v);
  //     v.value && navigate("/Dashboard");
  //   });

  setOtpTimerToDefault();

  useObserve(() => {
    console.log(
      username.get(),
      email.get(),
      password.get(),
      "rememberMe",
      rememberMe.get() ? "checked" : "not checked",
      "isUserLoggedIn",
      isUserLoggedIn.get()
    );
  });

  //   return <Navigate to="/Dashboard" replace />;
  //   if (isUserLoggedIn.get()) return <Navigate to="/Dashboard" replace />;
  return (
    <div className="login_form_parent">
      <div className="form_container">
        {renderCount}
        <div className="flx fd-c">
          <label htmlFor="login_username_input">Enter Username</label>

          <Reactive.input
            id={"login_username_input"}
            $value={username}
            onChange={(e) => {
              username.set(e.target.value);
            }}
          />
        </div>
        <div className="flx fd-c">
          <Reactive.label htmlFor="login_email_input">
            Email Address*
          </Reactive.label>
          <Reactive.input
            $type="email"
            id={"login_email_input"}
            $value={email}
            onChange={(e) => {
              console.log(e);
              email.set(e.target.value);
            }}
          />
        </div>
        <div className="flx fd-c">
          <label htmlFor="login_password_input">Enter Password</label>

          <Reactive.input
            id={"login_password_input"}
            $value={password}
            onChange={(e) => {
              password.set(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="login_rememberMe_input">Remember Me</label>
          <Reactive.input
            id={"login_rememberMe_input"}
            type="checkbox"
            name="rememberme"
            // defaultChecked={() => rememberMe.get()}
            defaultChecked={rememberMe.get()}
            onChange={() => {
              rememberMe.set((p) => !p);
            }}
          />
        </div>

        <Reactive.button id={"login_submit_btn"} onClick={login}>
          Login
        </Reactive.button>

        <NavLink to={"/forgot"}>Forgot Password</NavLink>
      </div>
    </div>
  );
};

export default Login;
