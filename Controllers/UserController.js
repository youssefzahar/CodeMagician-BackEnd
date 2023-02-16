import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/nodemail.js";
import verifyAccounttemplate from "../templates/verifyAccount.js";
import forgotpasswordtemplate from "../templates/forgotPassword.js";


export async function signin (req,res) {
    const {username,password} =  req.body;
    const user = await User.findOne({"username": username});
    if(!user){
        return res.status(403).json({error: "user not found"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(403).json({error : "password failed"})
    }
    if(!user.isVerified){
        return res.status(401).json({error : "UnAuthorized",username:user.username}) 
    }
    const payload = {id:user.id};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({success: true , token: token});
}


export async function getuser(req, res) {
  User.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function signup(req , res){
  try {
      var { username , password, firstname , lastname, email } = req.body;
      var exists = await User.findOne({email});
      if (exists) {
        return res.status(409).send("user already created");
      }       
     var  encryptedPassword = await bcrypt.hash(password, 10);
  
      var user = await User.create({
       username,
       password: encryptedPassword,
       firstname,
       lastname,
       email,
      });
    // var link = "rz"
    // var template = await verifyAccounttemplate(username,link);
    // await sendMail(email,"Welcome to CodeMagician",template);
     res.status(200).json("user added");
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }



  
export async function updateUser(req, res) {
  let newUser = {};
  var { password, email } = req.body;
  var  hashed = await bcrypt.hash(password, 10);
    newUser = {
      email,
      password: hashed,
    }
  
  User.findByIdAndUpdate(req.params.id, newUser)
  .then(() => {
    res.status(200).json("user updated");
  })
  .catch(err => {
    res.status(500).json({ error: err })
  })
}


export async function deleteUser (req,res){
    User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json("user deleted");
    })
    .catch(err => {
      res.status(500).json({ error: err });

    })
}