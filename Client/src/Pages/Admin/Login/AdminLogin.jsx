import React, { useState,useEffect } from 'react';
import adminloginstyle from './AdminLogin.module.css';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const adminDetails = {username:'sudarshps7@gmail.com',password:'Sudarsh@1234'}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username==adminDetails.username && password==adminDetails.password){
      localStorage.setItem('isAdminLoggedIn', 'true'); 
      localStorage.setItem('adminDetails', JSON.stringify(adminDetails)); 
        navigate('/admin/')
    }else{
      toast.error('Invalid credentials!')
    }
  };

  return (
    <div className={adminloginstyle['login-page']}>
      <div className={adminloginstyle['login-container']}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={adminloginstyle['form-group']}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={adminloginstyle['form-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={adminloginstyle['login-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
