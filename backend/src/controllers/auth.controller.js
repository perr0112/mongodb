import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { createUser, isExistingUser } from "../services/user.service.js"

import { JWT_EXPIRATION, JWT_SECRET } from "../config/constants.js"

class AuthController {
    async login(req, res, next) {   
        console.log("login", req, res)
        const { username, password } = req.body

        console.log("_______________________")
        console.log(JWT_EXPIRATION, JWT_SECRET)
        console.log("_______________________")

        const user = await isExistingUser(username)
        const match = await bcrypt.compare(password, user.hashedPassword)

        if (match === false) {
            console.error("Match impossible")
        } else {
            const jwtToken = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION,
            });
            res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
            res.json(jwtToken);
        }
    }

    logout(req, res, next) {
        console.log("logout")
    }

    async register(req, res, next) {
        console.log("register", req, req.body)
        const {
            username,
            firstName,
            lastName,
            email,
            password
        } = req.body

        const user = await isExistingUser(username)

        if (user) {
            console.error("Un utilisateur avec cet username existe déjà")

            res.json({
                "message": "Un utilisateur avec cet username existe déjà"
            })
        }

        createUser(username, firstName, lastName, email, password)
    }

    getMe(req, res, next) {
        console.log("me", req.user)
    }
}

export const authController = new AuthController()
