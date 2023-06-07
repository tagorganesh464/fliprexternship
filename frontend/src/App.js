import React from "react";
import "./App.css";
import "./components/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/rootlayout/RootLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ErrorPage from "./components/errorpage/ErrorPage"
import AddUser from "./components/adduser/AddUser";
import Users from "./components/users/Users";
import RemovedUsers from "./components/removedusers/RemovedUsers";
import EmpDashboard from "./components/empdashboard/EmpDashboard";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/add-user",
          element:<AddUser/>
        },
        {
          path:"/users",
          element:<Users/>
        },
        {
          path:"/removed-users",
          element:<RemovedUsers/>
        },
        {
          path:"/emp-dashboard",
          element:<EmpDashboard/>
        }


      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;