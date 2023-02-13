const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')



router.get('/' , UserController.index)
router.get('/show',  UserController.show)
router.post('/add',  UserController.add)
router.delete('/delete',UserController.destroy)


module.exports = router
