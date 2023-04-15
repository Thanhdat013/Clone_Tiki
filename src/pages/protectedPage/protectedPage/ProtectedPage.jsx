import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermit from "~/pages/protectedPage/notPermit";

const CheckAdmin = ({ children }) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const isRole = useSelector((state) => state.users.user.role);

  if (isAdminRoute && isRole === "ADMIN") {
    return children;
  }

  return <NotPermit />;
};

const ProtectedPage = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          {" "}
          <CheckAdmin>{children}</CheckAdmin>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedPage;
