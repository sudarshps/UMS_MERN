import React from "react";
import "./App.css";
import Dashboard from "./Pages/Home/Dashboard.jsx";
import Login from './Pages/Login/Login.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import AdminHome from './Pages/Admin/Home/UserMng.jsx'
import AdminLogin from './Pages/Admin/Login/AdminLogin.jsx'
import CreateUser from './Pages/Admin/CreateUser/CreateUser.jsx'
import EditUser from './Pages/Admin/EditUser/EditUser.jsx'
import {ToastContainer} from 'react-toastify'
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import AdminPrivateRoute from './Components/PrivateRoute/AdminPrivateRoute.jsx'

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark"/>

      <Routes>

        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
        <Route path="/admin" element={<AdminPrivateRoute><AdminHome /></AdminPrivateRoute>}/>
        <Route path="/admin/login" element={<AdminLogin />}/>
        <Route path="/admin/createUser" element={<CreateUser />}/>
        <Route path="/admin/editUser" element={<EditUser />}/>


        {/* <PrivateRoute path='/login' element={<Login/>}/>
        <PrivateRoute path='/admin/' element={<Dashboard/>}/> */}


      </Routes>
    </div>
  );
};

export default App;
