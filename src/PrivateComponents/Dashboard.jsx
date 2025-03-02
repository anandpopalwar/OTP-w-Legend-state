import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useUserContext } from "../Contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, otp, setOtpTimerToDefault } = useUserContext();

  useEffect(() => {
    otp.set(undefined);
    setOtpTimerToDefault();
  }, []);
  return (
    <div>
      <h4>Dashboard</h4>
      <button
        onClick={() => {
          isUserLoggedIn.set(false);
          navigate("/");
        }}
      >
        Log out
      </button>
      <NavLink to={"/forgot"}>Forgot Password</NavLink>
    </div>
  );
};

export default Dashboard;
