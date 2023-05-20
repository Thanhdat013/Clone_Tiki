import { Button, Form, message } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.scss"
// import { postLogin } from "~/redux/reducer/userReducer/userSlice";
import GoogleButton from "react-google-button"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "~/firebase"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { useDispatch } from "react-redux"
import { doLoginAction } from "~/redux/reducer/userReducer/userSlice"

const SelectLogin = () => {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("access_token", user.accessToken)
      navigate("/")
      message.success("Bạn đã đăng nhập thành công")
      dispatch(
        doLoginAction({
          email: user.email,
          phone: user?.phoneNumber || "",
          fullName: user.displayName,
          role: "USER",
          avatar: "",
          id: user.uid,
        })
      )
    }
  }, [user])
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
                onClick={googleSignIn}
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
