import express from 'express';
import { signin } from '../Controllers/UserController';


const router = express.Router()

router
.route("/login")
.post(signin)


export default router;

/*
router.get('/' , UserController.index)
router.get('/show',  UserController.show)
router.post('/add',  UserController.add)
router.delete('/delete',UserController.destroy)


module.exports = router
*/

