import React, { useRef, useState } from "react";
import "./App.scss";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useOutlet,
} from "react-router";
// import MyStore from "./PublicComponents/MyStore";
import Login from "./PublicComponents/Login";
import Forget from "./PublicComponents/Forgot";
import OTP from "./PublicComponents/OTP";
import Dashboard from "./PrivateComponents/Dashboard";
import { useUserContext } from "./Contexts/UserContext";

function App() {
  const renderCount = ++useRef(0).current;
  return (
    <div className="App">
      {renderCount}
      <RenderRouterConfig />
    </div>
  );
}
export const PrivateRoute = (props) => {
  const { isUserLoggedIn } = useUserContext();
  return !isUserLoggedIn.get() ? <Navigate to="/login" replace /> : <Outlet />;
};
// export const unAuthenticatedRoutes = (props) => {
//   const { isUserLoggedIn } = useUserContext();
//   console.log(isUserLoggedIn.get(), " !isUserLoggedIn.get()");
//   console.log(props, "props");

//   return (
//     <Route
//       element={props.element}
//       path={props.path}
//       // Component={}
//     />
//   );
// };

// export const PrivateRoute = (props) => {
//   const { isUserLoggedIn } = useUserContext();
//   console.log(isUserLoggedIn.get(), " !isUserLoggedIn.get()");
//   return isUserLoggedIn.get() ?
//     <Route element={props.element} path={props.path} />
//   props.element : <Navigate to="/login" replace />;
// };

// const PrivateRoute = (Props) => {
//   const { isUserLoggedIn } = useUserContext();
//   const navigate = useNavigate();
//   console.log(Props);
//   isUserLoggedIn &&
//     navigate({
//       pathname: "/login",
//     });
//   return (
//     <Route
//       path={Props.path}
//       // element={Props.element}
//       element={
//         isUserLoggedIn ? Props.element : <Navigate to="/login" replace />
//       }
//     />
//   );
// };

export default App;

const RenderRouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot">
          <Route index element={<Forget />} />
          <Route path="otp" element={<OTP />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
        {/* <PrivateRoute path={"/dashboard"} element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
