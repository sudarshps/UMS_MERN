import React, { useEffect } from "react";
import "./Navbar.css";
import { CaretDownFill,PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../feature/userActions";
import Cookies from 'js-cookie'

const Navbar = () => {

 
      const handleSignOut = () =>{
        Cookies.remove('token')
        localStorage.removeItem('userDetails')
        dispatch(logout()); 
         navigate('/login');
      }

    const user = useSelector((state)=>state.user.user)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const dispatch = useDispatch()

  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="#">
        AccessWave
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse row" id="navbarNav">
        <div className="col-10">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={()=>navigate('/')}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div className="col-2">
          <div className="navbar-profile">
            <PersonCircle className="profile-icon-default"/>
              <p>{user?user.username:''}</p>
            <CaretDownFill className="caretdown-icon"/>

            <div className="dropdown">
              <p onClick={()=>navigate('/profile')}>Profile</p>
              <p onClick={handleSignOut}>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
