import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function signin (req,res) {
    const {email,password} =  req.body;
    const user = await User.findOne({"email": email});
    if(!user){
        return res.status(403).json({error: "user not found"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(403).json({error : "password failed"})
    }
    if(!user.isVerified){
        return res.status(401).json({error : "UnAuthorized",email:user.email}) 
    }
    const payload = {id:user.id};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({success: true , token: token});
}

/*
const index = (req,res,next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}



const show = (req, res, next) =>{
    let userID = req.body.userID
    console.log(userID)
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            mesaage: 'An error occured'
        })
    })
}


const add = (req, res, next) => {
        let user = new User({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        })
    
        user.save()
        .then(response => {
            res.json({
                message: 'user added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}



const destroy = (req, res, next) => {
    let userID = req.body.userID
    User.findByIdAndDelete(userID)
    .then(() => {
        res.json({
            message: 'user deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}


module.exports = {
    index,show,add,destroy
}
*/