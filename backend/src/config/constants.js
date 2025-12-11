import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN

export {
    JWT_SECRET,
    JWT_EXPIRATION,
}
