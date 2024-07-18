import React, { useState } from 'react'
import loginstyle from './CreateUser.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const CreateUser = () => {

    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const[nameError,setNameError] = useState('')
    const[emailError,setEmailError] = useState('')
    const[passwordError,setPasswordError] = useState('')

    const navigate = useNavigate()
    const handleCreateUser = (e) =>{
        e.preventDefault();

        setNameError(!username.trim() ? "username is required!" : "");
        setEmailError(!email.trim() ? "email is required!" : "");
        setPasswordError(!password.trim() ? "password is required!" : "");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email)

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isvalidPassword = passwordRegex.test(password)
        
        if(!isValidEmail){
          toast.error('Please provide valid email!')
          return
        }

        if(!isvalidPassword){
          toast.error('Password must be atleast 8 chars,one special chars,one upper case letter!')
          return
        }

        if(!username.trim() || !email.trim() || !password.trim()){
          return
        }

        

    axios
      .post("http://localhost:3000/signup", { username, email, password })
      .then((res) => {
        if(res.status===200){
            navigate('/admin')
        }
      })
      .catch((err) => console.log(err));
    }
  return (
    <div className={loginstyle['cu-main-div']}>
         <div className={loginstyle["user-login-page"]}>
      <div className={loginstyle["login-container"]}>
        
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
            required/>
            {passwordError && <p style={{ color: "brown" }}>{passwordError}</p>}
        </div>
        <button
          type="submit"
          className={loginstyle["login-button"]}
          onClick={handleCreateUser}>
            Create
        </button>
      </div>
    </div>
  
    </div>
  )
}

export default CreateUser
