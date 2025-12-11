import express, { urlencoded } from "express"
import expressAsyncHandler from "express-async-handler";

import { userController } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/me",
    expressAsyncHandler(userController.getMe)
)

userRouter.get("/:id",
    urlencoded({ extended: true }),
    expressAsyncHandler(userController.getUserById)
)

export default userRouter
