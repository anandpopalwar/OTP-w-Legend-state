import React, { useRef } from "react";
import { Link } from "react-router";
import "../App.scss";
import "./PublicComponents.scss";

import { Reactive, useObservable } from "@legendapp/state/react";
import { NavLink } from "react-router";
import { useUserContext } from "../Contexts/UserContext";

const Forget = () => {
  const renderCount = ++useRef(0).current;
  const { email, password } = useUserContext();

  console.log("foprgt");
  return (
    <div className="forget_password_form_parent">
      <div className="form_container">
        <h3>Forgot Password Form</h3>
        {renderCount}
        <div className="flx fd-c">
          <Reactive.label htmlFor="email">Enter Email</Reactive.label>
          <Reactive.input
            $type="email"
            $id="email"
            $value={email}
            onChange={(e) => {
              console.log(e);
              email.set(e.target.value);
            }}
          />
        </div>
        <div className="flx fd-c">
          <Reactive.label htmlFor="password">Enter Password</Reactive.label>

          <Reactive.input
            $type="text"
            $id="password"
            $value={password}
            onChange={(e) => {
              console.log(e.target.value);
              password.set(e.target.value);
            }}
          />
        </div>
        {/* <Memo>{() => email.get()}</Memo> */}
        <NavLink
          to="otp"
          className={"goto_button"}
          state={{ email: email?.get() }}
        >
          otp &gt;
        </NavLink>
        {/* <Redirect
          to={{
            pathname: "/login",
            search: "?utm=your+face",
            state: { referrer: "currentLocation" },
          }}
        /> */}
      </div>
    </div>
  );
};

export default Forget;
