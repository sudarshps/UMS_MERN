import React, { useState } from 'react'
import loginstyle from '../CreateUser/CreateUser.module.css'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'


const EditUser = () => {


    const location = useLocation()
    const user = location.state.user

    
    const[username,setUsername] = useState(user.username)
    const[email,setEmail] = useState(user.email)
    // const[password,setPassword] = useState('')
    
    const navigate = useNavigate()
    const handleEditUser = (e) =>{
        e.preventDefault();
    axios
      .post("http://localhost:3000/admin/editUser", { id:user._id,username, email })
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
        </div>
        {/* <div className={loginstyle["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
        </div> */}
        <button
          type="submit"
          className={loginstyle["login-button"]}
          onClick={handleEditUser}>
            Edit
        </button>
      </div>
    </div>
  
    </div>
  )
}

export default EditUser
