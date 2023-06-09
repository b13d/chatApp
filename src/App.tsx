import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import "./style.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
  Navigate,
  redirect,
} from "react-router-dom";
import { User } from "firebase/auth";
import { AuthContext } from "./context/AuthContext";

interface IUseContext {
  currentUser: User;
}

interface IRoute {
  children: React.JSX.Element;
}

function App() {
  const { currentUser }: IUseContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  // const navigate = useNavigate();

  const ProtectedRoute = ({ children }: IRoute) => {
    return children;
  };

  useEffect(() => {
    let temp: IRoute = {
      children: <Home />,
    };
    if (
      currentUser.displayName?.length !== undefined &&
      currentUser.displayName?.length > 0
    ) {
      ProtectedRoute(temp);
    } else {
      setIsLogin(false);
    }

    ProtectedRoute(temp);
  }, [currentUser, isLogin]); // maybe here error

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
