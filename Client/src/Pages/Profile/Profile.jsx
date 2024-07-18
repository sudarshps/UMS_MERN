import React, { useState,useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import profilestyle from "./Profile.module.css";
import { PencilSquare, PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar-edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from 'axios'
import { updatedUser } from "../../feature/userActions.js";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [src, setSrc] = useState(null);
  const user = useSelector((state) => state.user.user);

  const [userdetails, setUserDetails] = useState(null);

  const dispatch = useDispatch()

// Example function to fetch user data
const fetchUserData = () => {
  axios.get('http://localhost:3000/')
    .then(res => {
      setUserDetails(res.data); // Update user state with new profile data
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
};

  useEffect(() => {
    fetchUserData()
    }, []);
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };


  const handleSave = () => {
    setOpen(false);
    axios.post('http://localhost:3000/setprofile',{email:user.email,image:preview})
    .then(res=>{
      if(res.statusText==='OK'){
          const updatedUserDetails = res.data
          dispatch(updatedUser(updatedUserDetails))
      }else{
        console.error('failed to update profile')
      }
    }).catch(err=>{
      console.error('error uploading image',err)
    })
  };

  return (
    <div className={profilestyle["profile-div"]}>
      <Navbar />
      <div className={profilestyle["userdetails-container"]}>
        <div className={`${profilestyle["details-content"]} row`}>
          <h2>Profile</h2>
          <div className={`${profilestyle["profile-image-div"]} col-6`}>
            <div className={`${profilestyle["profile-image-only"]} col-6`}>
              {user.image ? (
                <img src={user.image} alt="Preview" />
              ) : (
                <PersonCircle style={{ fontSize: "100" }} />
              )}
            </div>
            <br />
            <label onClick={handleClickOpen} style={{ cursor: "pointer" }}>
              Edit DP
              <PencilSquare />
            </label>
            <Dialog open={open} onClose={handleClose}>

              <DialogTitle>Edit Profile Picture</DialogTitle>
              <DialogContent>
                <Avatar
                  width={390}
                  height={295}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={src}
                />
              </DialogContent>


              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>


          </div>
          <div className={`${profilestyle["profile-details-div"]} col-6`}>
            <h6>Name:</h6>
            <h5>{user ? user.username : "User"}</h5>
            <br />
            <h6>Email:</h6>
            <h5>{user ? user.email : ""}</h5>
            <br />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
