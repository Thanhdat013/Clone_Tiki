import React, { useEffect, useState } from "react"

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import Home from "~/components/Home"
import Loading from "~/components/Loading/Loading"
import BookPage from "~/pages/book"
import ErrorPage from "~/pages/Error"
import Login from "~/pages/login"
import Register from "~/pages/register"

import { useDispatch, useSelector } from "react-redux"
import Admin from "~/pages/admin/admin/"
import AdminHeader from "~/pages/admin/adminHeader/"
import AdminSideBar from "~/pages/admin/adminSideBar/"
import Cart from "~/pages/cart"
import CartFinish from "~/pages/cart/cartFinish"
import CartOrder from "~/pages/cart/cartOrder"
import CartStart from "~/pages/cart/cartStart"
import History from "~/pages/history/History"
import ManageBook from "~/pages/manage/manageBook"
import ManageOrder from "~/pages/manage/manageOrder"
import ManageUser from "~/pages/manage/manageUser"
import { doFetchAccount } from "~/redux/reducer/userReducer/userSlice"
import { getFetchAccount } from "~/services/Api"
import "./App.scss"
import ProtectedPageAdmin from "~/pages/protectedPage/inProtectedPage"
import { ProtectedPageCart } from "./pages/protectedPage/inProtectedPage/ProtectedPage"
// search from header to home
const Layout = () => {
  const [headerSearch, setHeaderSearch] = useState("")
  return (
    <div>
      <Header headerSearch={headerSearch} setHeaderSearch={setHeaderSearch} />

      <Outlet context={[headerSearch, setHeaderSearch]} />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AdminHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
      <div className="layout__admin">
        <AdminSideBar
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          open={open}
          showDrawer={showDrawer}
          onClose={onClose}
          className="layout__admin--sidebar"
        />

        <Outlet className="layout__admin--outlet" />
      </div>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "book/:slug",
        element: <BookPage />,
      },
      {
        path: "cart",
        element: (
          <ProtectedPageCart>
            <Cart />
          </ProtectedPageCart>
        ),
        children: [
          { index: true, element: <CartStart /> },
          { path: "payment", element: <CartOrder /> },
          { path: "finish", element: <CartFinish /> },
        ],
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedPageAdmin>
        <LayoutAdmin />
      </ProtectedPageAdmin>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Admin /> },
      { path: "manage-user", element: <ManageUser /> },
      { path: "manage-book", element: <ManageBook /> },
      { path: "manage-order", element: <ManageOrder /> },
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
])

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.users.isLoading)
  // lấy lại data khi F5 lại trang
  const callFetchAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return

    const res = await getFetchAccount()
    console.log(res)
    if (res && res.data) {
      dispatch(doFetchAccount(res.data))
    }
  }
  useEffect(() => {
    callFetchAccount()
  }, [])
  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default App
