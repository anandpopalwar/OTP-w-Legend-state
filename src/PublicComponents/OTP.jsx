import { observable } from "@legendapp/state";
import "./PublicComponents.scss";
import "../App.scss";

import {
  Memo,
  Reactive,
  Show,
  useComputed,
  useEffectOnce,
  useObserve,
  useObserveEffect,
  useUnmount,
} from "@legendapp/state/react";
import React, { useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { useUserContext } from "../Contexts/UserContext";

// Global configuration
// configureObservablePersistence({
//   pluginLocal: ObservablePersistLocalStorage,
// });

// Persist state
function getRandomFourDigitCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

let interval;
const OTP = () => {
  const { timer, otp } = useUserContext();
  const routerData = useLocation();
  const navigate = useNavigate();

  const StartInterval = () => {
    console.log(":");
    if (!interval && timer.get() > 0) {
      // ClearIntervalFunc();
      console.log("interval started");
      interval = setInterval(() => {
        console.log("interrrrr setInterval");
        timer.get() > 0 && timer.set((p) => p - 1);
      }, 1000);
    }
  };

  const ClearIntervalFunc = () => {
    clearInterval(interval);
    interval = undefined;
  };

  useEffectOnce(() => {
    console.log("OTP mounted");
  }, []);

  useObserveEffect(timer, (t) => {
    // t.value;
    console.log(t.value, "timer");

    t.value <= 0 && ClearIntervalFunc();

    if (t.value === 0 && !otp) {
      let _auto_generated_otp = getRandomFourDigitCode();
      alert(_auto_generated_otp);
      otp.set(_auto_generated_otp);
    }
  });

  useObserveEffect(() => {
    // if (timer.get() === 0) {
    //   timer.set(30);
    // }

    StartInterval();
  });

  const isGetOTPDisabled = useComputed(() => {
    return timer.get() === 0;
  });

  useUnmount(() => {
    ClearIntervalFunc();
  });

  console.log(routerData);
  const renderCount = ++useRef(0).current;

  return (
    <div className="otp_form_parent">
      <div className="form_container">
        {renderCount}
        <h3>OTP</h3>
        <NavLink to={"/Dashboard"}>Dashboard</NavLink>
        <p>{routerData.state.email}</p>
        <Show if={isGetOTPDisabled}>
          {() => (
            <Reactive.button
              $className="btn"
              onClick={() => {
                console.log("okok");
                timer.set(15);
                otp.set(undefined);
                ClearIntervalFunc();
                StartInterval();
              }}
            >
              get OTP again
            </Reactive.button>
          )}
        </Show>

        <p>
          Resend OTP again After
          <Memo>{() => <>{" " + timer.get()}</>}</Memo>
        </p>
        <Reactive.input
          id={"enter_otp_input"}
          $value={otp}
          type="number"
          onChange={(e) => {
            console.log(e.target.valueAsNumber);

            if (otp.get().length > 4) otp.set(e.target.valueAsNumber);
          }}
        />

        <Reactive.button
          $className="btn"
          onClick={() => {
            navigate("/login");
          }}
          $disabled={() => !isGetOTPDisabled.get()}
        >
          Submit OTP
        </Reactive.button>
      </div>
    </div>
  );
};

export default OTP;
