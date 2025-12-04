import express, { urlencoded } from "express"
import expressAsyncHandler from "express-async-handler";

import { authController } from "../controllers/auth.controller.js"

const authRouter = express.Router()

// authRouter.get("/register", authController.register)
authRouter.post("/register",
    urlencoded({ extended: true }),
    expressAsyncHandler(authController.register)
)

authRouter.get("/login", authController.login)
authRouter.post("/login", authController.login)

authRouter.get("/logout", authController.logout)

authRouter.get("/me", authController.getMe)

export default authRouter
