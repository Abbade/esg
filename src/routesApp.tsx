import React, { useContext } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";

import Login from "./screens/Login";
import { Context } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Users from "./screens/Users";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { loading, authenticated } = useContext(Context);
  let location = useLocation();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
