import express from "express"
import dotenv from "dotenv"

import bodyParser from "body-parser"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import cookieParser from "cookie-parser"

import { connectDB, options } from "./config/database.js"

import {
  userRouter,
  authRouter,
  articlesRouter
 } from "./routes/index.js"

dotenv.config()

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  // res.send('Hello World!')
  // connectDB()
  res.json({
    "message": "Hello world"
  })
})

// Routers
// Auth router
app.use("/auth", authRouter)
// User router
app.use("/users", userRouter)
// Articles router
app.use("/articles", articlesRouter)

const specs = swaggerJsdoc(options)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

async function startServer() {
  try {
    await connectDB()

    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`)
      console.log(`http://localhost:${port}`)
    })
  }
  catch(error) {
    console.log("^------- Erreur", error)
    process.exit(1)
  }
}

startServer()
