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
        try {
            const token = req.cookies?.jwtToken
            if (!token) {
                return res.status(HTTPStatus.UNAUTHORIZED).json({
                    message: "Vous devez vous connecter"
                })
            }

            const decoded = jwt.verify(token, JWT_SECRET)
            const user = await getUserFromId(decoded.id)

            if (!user) {
                return res.status(HTTPStatus.UNAUTHORIZED).json({
                    message: "Utilisateur introuvable"
                })
            }

            req.user = user

            return res.status(HTTPStatus.OK).json({
                success: true,
                user
            })
        } catch (err) {
            return res.status(HTTPStatus.UNAUTHORIZED).json({
                message: "Token invalide ou expiré"
            })
        }
    }
}

export const userController = new UserController()
