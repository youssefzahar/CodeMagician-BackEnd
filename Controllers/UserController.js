const User = require('../Models/User')


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