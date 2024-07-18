import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true



  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((result) => {
        if (result.data === 'success') {
          navigate("/");
        }else{
          navigate('/login')
        }
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      });

  }, []);


  

  return (
    <div className="dashboard-div">
      <Navbar />
    </div>
  );
};

export default Dashboard;
