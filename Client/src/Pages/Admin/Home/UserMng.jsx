import React, { useEffect, useState } from "react";
import "./UserMng.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserMng = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUser")
      .then((users) => {
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/getUser?search=${searchQuery}`)
      setUsers(response.data)

    } catch (error) {
      console.log(error);
    }
    

  };

  const handleEdit = (userId) => {
    axios.get(`http://localhost:3000/admin/editUser?id=${userId}`)
    .then((user)=>{
      if(user){
        navigate('/admin/editUser',{state:{user:user.data}})

      }
    }).catch(err=>console.log(err))
  };

  const handleDelete = (userId) => {
    axios
      .get(`http://localhost:3000/deleteUser?id=${userId}`)
      .then((users) => {
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  };


  const handleLogout = () =>{
    localStorage.removeItem('adminDetails')
    localStorage.removeItem('isAdminLoggedIn')
    navigate('/admin/login')
  }

  return (
    <div className="admin-panel">
      <div className="row">
        <div className="col-11">
        <h1>Admin Panel</h1>

        </div>
        <div className="logout col-1">
          <h5 onClick={handleLogout}>Logout</h5>
        </div>
      </div>
      <div className="search-div row">
        <div className="col-10">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        <div className="col-2 d-flex align-items-center ps-5">
          <button
            className="create-button"
            onClick={() => navigate("/admin/createUser")}
          >
            Create User
          </button>
        </div>
      </div>

      <table className="user-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, ind) => (
            <tr key={user._id}>
              <td>{ind + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="user-actions">
                <button
                  className="action-button edit-button"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserMng;
