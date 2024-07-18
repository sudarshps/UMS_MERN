import React, { useEffect, useState } from "react";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../feature/userActions";
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    const isUserLoggedIn = Cookies.get('token')
    if(isUserLoggedIn){
      navigate('/')
    }else{
      navigate('/login')
    }
  },[navigate])


  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(!username.trim() ? "username is required!" : "");
    setEmailError(!email.trim() ? "email is required!" : "");
    setPasswordError(!password.trim() ? "password is required!" : "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isvalidPassword = passwordRegex.test(password);

    if (!isValidEmail) {
      toast.error("Please provide valid email!");
      return;
    }

    if (!isvalidPassword) {
      toast.error(
        "Password must be atleast 8 chars,one special chars,one upper case letter!"
      );
      return;
    }

    if (!username.trim() || !email.trim() || !password.trim()) {
      return;
    }

    axios
      .post("http://localhost:3000/signup", { username, email, password })
      .then((res) => {
        toast.error(res.data.message)
        console.log(res), setSignState("Sign In");
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter email!");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter password!");
      return;
    }

    axios
      .post("http://localhost:3000/login", { email, password })
      .then((res) => {
        if (res.data.message === "success") {
          const loggedUser = res.data.user.username;
          const loggedEmail = res.data.user.email;
          const profile = res.data.user.image
          const user = { username: loggedUser, email: loggedEmail,image:profile }
          dispatch(login(user));
          localStorage.setItem('userDetails', JSON.stringify(user))
          navigate("/");
        } else {
          toast.error(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={loginstyle["user-login-page"]}>
      <div className={loginstyle["login-container"]}>
        <h2>{signState}</h2>
        {signState === "Sign In" ? (
          ""
        ) : (
          <div className={loginstyle["form-group"]}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {nameError && <p style={{ color: "brown" }}>{nameError}</p>}
          </div>
        )}
        <div className={loginstyle["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: "brown" }}>{emailError}</p>}
        </div>

        <div className={loginstyle["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p style={{ color: "brown" }}>{passwordError}</p>}
        </div>
        <button
          type="submit"
          onClick={signState === "Sign In" ? handleLogin : handleSubmit}
          className={loginstyle["login-button"]}
        >
          {signState}
        </button>
        {signState === "Sign In" ? (
          <p>
            Don't have an account?
            <span
              className={loginstyle["toggle-sign-state"]}
              onClick={() => setSignState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Have an account?
            <span
              className={loginstyle["toggle-sign-state"]}
              onClick={() => setSignState("Sign In")}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
    </div>
  );
};



export default Login;
