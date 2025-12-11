import jwt from "jsonwebtoken"

import { getUserFromId } from "../services/user.service.js";
import { JWT_SECRET } from "../config/constants.js";

class UserController {
    async getUserById(req, res, next) {
        const user = await getUserFromId(req.params.id)

        if (!user) {
            console.error("Utilisateur introuvable")
        } else {
            console.log("Utilisateur retrouvé --")
            res.json(user)

            next()
        }
    }

    async getMe(req, res, next) {
        const token = req.cookies.jwtToken || null
        
        if (!token) {
            return res.json({ "message": "Vous devez vous connecter." })
        }

        const decodedUser = jwt.verify(token, JWT_SECRET)
        const { id } = decodedUser

        const user = await getUserFromId(id)

        console.log("decodedToken", decodedUser)

        res.json({
            user
        })

        next()
    }
}

export const userController = new UserController()
