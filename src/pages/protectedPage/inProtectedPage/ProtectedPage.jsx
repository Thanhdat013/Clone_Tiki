import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import NotPermit from "~/pages/protectedPage/notPermit"

const CheckAdmin = ({ children }) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin")
  const isRole = useSelector((state) => state.users.user.role)

  if (
    (isAdminRoute && isRole === "ADMIN") || // để ai có quyên admin mới vào đc trang admin
    (!isAdminRoute && (isRole === "ADMIN" || isRole === "USER")) // để cho ai đăng nhập mới vào đc trang giỏ hang
  ) {
    return children
  }

  return <NotPermit />
}

const ProtectedPage = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated)

  return (
    <>
      {isAuthenticated ? (
        <>
          <CheckAdmin>{children}</CheckAdmin>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}

export default ProtectedPage