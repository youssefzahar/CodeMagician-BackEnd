import express from 'express';
import { body } from "express-validator";

import { signin, getuser, signup, updateUser, deleteUser, verifyAccount } from "../controllers/UserController.js";


const router = express.Router()

router
.route("/signin")
.post(signin)

router
  .route("/verify-account")
  .get(verifyAccount)
  
router
  .route("/profile/:id")
  .get(getuser)

router
  .route("/signup")
  .post(signup)

router
 .route("/update/:id")
 .put(updateUser);

router
  .route("/delete/:id")
  .delete(deleteUser);



export default router;