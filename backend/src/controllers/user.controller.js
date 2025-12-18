import jwt from "jsonwebtoken"

import { getUserFromId } from "../services/user.service.js";
import { JWT_SECRET } from "../config/constants.js";
import { HTTPStatus } from "../config/httpStatus.js";

class UserController {
    async getUserById(req, res, next) {
        const user = await getUserFromId(req.params.id)

        if (!user) {
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Utilisateur introuvable" })
        } else {
            return res.status(HTTPStatus.OK).json(user)
        }
    }

    async getMe(req, res, next) {
        const token = req.cookies.jwtToken || null
        
        if (!token) {
            return res
                .status(HTTPStatus.UNAUTHORIZED)
                .json({ message: "Vous devez vous connecter" })
        }

        const decodedUser = jwt.verify(token, JWT_SECRET)
        const { id } = decodedUser

        const user = await getUserFromId(id)

        return res.status(HTTPStatus.OK).json({
            user
        })
    }
}

export const userController = new UserController()
