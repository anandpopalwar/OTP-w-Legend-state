import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { useObservable } from "@legendapp/state/react";
import React, { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
const UserCTX = createContext({});
const { otp, timer } = observable({
  otp: undefined,
  timer: 15,
});

const { Authusername, Authpassword, Authemail } = observable({
  Authusername: "ap",
  Authemail: "ap@ease.com",
  Authpassword: "Admin@123",
});

export const UserContextWrapper = ({ children }) => {
  const { username, password, rememberMe, isUserLoggedIn, email } =
    useObservable({
      username: "ap",
      email: "ap@ease.com",
      password: "Admin@123",
      rememberMe: false,
      isUserLoggedIn: false,
    });

  const setOtpTimerToDefault = () => {
    timer.set(15);
  };

  persistObservable(isUserLoggedIn, {
    local: "isUserLoggedIn",
    pluginLocal: ObservablePersistLocalStorage,
  });
  persistObservable(timer, {
    local: "otpTimer",
    pluginLocal: ObservablePersistLocalStorage,
  });

  let value = {
    username,
    password,
    rememberMe,
    isUserLoggedIn,
    email,
    timer,
    otp,
    setOtpTimerToDefault,
    Authusername,
    Authpassword,
    Authemail,
  };
  return <UserCTX.Provider value={value}>{children}</UserCTX.Provider>;
};

export const useUserContext = () => useContext(UserCTX);
