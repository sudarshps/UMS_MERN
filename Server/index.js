const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const uri = process.env.MONGO_URI;
const port = process.env.PORT;
mongoose.connect(uri);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Wrong token");
      next();
    });
  }
};

app.get("/", verifyUser, (req, res) => {
    return res.json('success')
});



app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  userModel.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.json({ message: 'Email is already registered' });
      }

      bcrypt.hash(password, 10)
        .then((hash) => {
          userModel.create({ username, email, password: hash, image: '' })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err)); 
        })
        .catch((err) => res.status(500).json({ message: err.message })); 
    })
    .catch((err) => res.status(500).json({ message: err.message })); 
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "10h",
          });
          res.cookie("token", token);
          res.json({message:"success",
            user:{
              username:user.username,
              email:user.email,
              image:user.image
            }
        });
        } else {
          res.json("Incorrect Password");
        }
      });
    } else {
      res.json("No record found!");
    }
  });
});


app.get('/getUser',async(req,res)=>{
    try {
      const search = req.query.search
      if(search){
        const users = await userModel.find({username:{$regex:search,$options:'i'}})
        res.json(users)
      }else{
        const users = await userModel.find({}).sort({createdAt:-1})
      res.json(users)
      }
    } catch (error) {
        console.error(error)
    }
})

app.get('/deleteUser',async(req,res)=>{
  try {
    const userId = req.query.id
    const user = await userModel.findOneAndDelete({_id:userId})
    if(!user){
      return res.json('User Not Found')
    }
    const users = await userModel.find({})
    return res.json(users)
  } catch (error) {
      console.error(error)
  }
})

// app.get('/editUser',async(req,res)=>{
//   try {
//     const userId = req.query.id
//     await userModel.findOneAndUpdate({_id:userId})
//     const users = await userModel.find({})
//     return res.json(users)
//   } catch (error) {
//       console.error(error)
//   }
// })

app.get('/admin/editUser',async(req,res)=>{
  try {
    const userId = req.query.id
    const user = await userModel.findOne({_id:userId})
    return res.json(user)
  } catch (error) {
    console.log(error);
  }
})


app.post('/admin/editUser',async(req,res)=>{
  const{id,username,email} = req.body

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id,{username,email})
    console.log('gsds',updatedUser);
    if(!updatedUser){
      return res.status(404).send('User not found')
    }
    res.json(updatedUser)

  } catch (error) {
    res.status(500).send(error.message)
  }
})


app.post('/setprofile',async(req,res)=>{
  const{email,image} = req.body

  try {
    const filter = {email:email}
    const update = {image:image}
    const options = {new:true}
    const updatedUser = await userModel.findOneAndUpdate(filter,update,options)
    if(!updatedUser){
      return res.status(404).send('Error in updating profile')
    }
    res.json(updatedUser)
  } catch (error) {
      res.status(500).send(error.message)
  }
})

app.listen(port, () => {
  console.log("server is running");
});
