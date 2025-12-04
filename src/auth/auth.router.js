import express from "express"
import { authController } from "./auth.controller"

const authRouter = express.Router()

authRouter.get("/register", authController.register)

authRouter.get("/login", authController.login)
authRouter.post("/login", authController.login)

authRouter.get("/logout", authController.logout)

export default authRouter
