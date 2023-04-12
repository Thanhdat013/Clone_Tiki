import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";
import Login from "~/pages/login";
import Register from "~/pages/register";
import BookPage from "~/pages/book";
import Header from "~/components/Header";
import Home from "~/components/Home";
import Footer from "~/components/Footer";
import { useDispatch } from "react-redux";
import { getFetchAccount } from "~/services/Api";
import { doFetchAccount } from "~/redux/reducer/userReducer/userSlice";

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
  const dispatch = useDispatch();
  // lấy lại data khi F5 lại trang
  const callFetchAccount = async () => {
    const res = await getFetchAccount();
    if (res && res.data) {
      dispatch(doFetchAccount(res.data));
    }
  };
  useEffect(() => {
    callFetchAccount();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
