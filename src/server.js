// const express = require('express')
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"

dotenv.config()

const app = express()
const port = process.env.port || 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')
  // connectDB()
  res.json({
    "message": "Hello world"
  })
})

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
