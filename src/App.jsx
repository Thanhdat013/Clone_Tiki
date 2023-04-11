import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";
import Login from "~/pages/login";
import Register from "~/pages/register";
import BookPage from "~/pages/book";
import Header from "~/components/Header";
import Home from "~/components/Home";
import Footer from "~/components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "book",
        element: <BookPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
