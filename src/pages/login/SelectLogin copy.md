import { Button, Form, message } from "antd"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.scss"
// import { postLogin } from "~/redux/reducer/userReducer/userSlice";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import GoogleButton from "react-google-button"
import { useDispatch } from "react-redux"
import { auth, app } from "~/firebase.config"
import { doLoginAction } from "~/redux/reducer/userReducer/userSlice"

const SelectLogin = () => {
  const [user] = useAuthState(auth)
  // get user with access token from server
  function parseJwt(token) {
    if (!token) {
      return
    }
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace("-", "+").replace("_", "/")
    return JSON.parse(window.atob(base64))
  }

  const dispatch = useDispatch()
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then((userCred) => {
        navigate("/", { replace: true })
        message.success("Bạn đã đăng nhập thành công")

        const result = userCred.user
        localStorage.setItem("access_token", result.accessToken)
        const user = parseJwt(result.accessToken)
        console.log(user)
        dispatch(
          doLoginAction({
            email: user.email,
            phone: user?.phoneNumber || "",
            fullName: user.name,
            role: "USER",
            avatar: "",
            id: user.user_id,
          })
        )
      })
      .catch(() => {
        notification.error({
          message: "Đăng nhập thất bại",
          description:
            res?.message.length > 0
              ? res.message
              : "Đã có lỗi xảy ra, vui lòng thử lại",
          duration: 5,
        })
      })
  }

  // const googleSignIn = async () => {
  //   const provider = new GoogleAuthProvider()
  //   signInWithRedirect(auth, provider)
  // }

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("access_token", user.accessToken)
  //     navigate("/")
  //     message.success("Bạn đã đăng nhập thành công")
  //     dispatch(
  //       doLoginAction({
  //         email: user.email,
  //         phone: user?.phoneNumber || "",
  //         fullName: user.displayName,
  //         role: "USER",
  //         avatar: "",
  //         id: user.uid,
  //       })
  //     )
  //   }
  // }, [user])
  const navigate = useNavigate()
  return (
    <div className="login">
      <div className="login__container " style={{ width: "400px" }}>
        <div className="login__wrap">
          <img
            src="https://atplink.com/blog/wp-content/uploads/2021/06/z.jpg"
            alt="logo"
            className="login__logo"
            onClick={() => navigate("/")}
          />
          <h3 className="login__title">Đăng nhập vào Tiki</h3>
        </div>
        <Form
          name="basic"
          className="select__login_form"
          autoComplete="off"
          layout="vertical "
          labelAlign={"center"}
        >
          <Form.Item>
            <div>
              <GoogleButton
                onClick={loginWithGoogle}
                className="select__login-google"
                label="Đăng nhập băng tài khoản google"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="select__login-button"
              onClick={() => navigate("/login")}
              style={{ fontSize: "16px" }}
            >
              Đăng nhập bằng tài khoản Tiki
            </Button>

            <p style={{ marginTop: "24px", textAlign: "center" }}>
              Bạn chưa có tài khoản? &nbsp;
              <strong
                style={{ color: "#FF6969", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Đăng kí
              </strong>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SelectLogin
