const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
//import UserController from 'Con'



mongoose.connect('mongodb://localhost:27017/COdeMagician', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
const Port = process.env.Port || 3000

app.listen(Port, () =>{
  console.log(`Server is running on port ${Port}`)
})





