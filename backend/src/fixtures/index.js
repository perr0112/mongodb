import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

import { connectDB } from "../config/database.js"

import { User } from "../models/User.js"
import { generateUsers } from "./users.fixtures.js"
import { generateCategories } from "./categories.fixtures.js"
import { generateArticles } from "./articles.fixtures.js"
import { generateComments } from "./comments.fixtures.js"

const generateFixtures = async () => {
    await connectDB()

    await mongoose.connection.db.dropDatabase();

    await generateUsers(20)

    const users = await User.find()
    console.log(`${users.length} utilisateurs ajoutés`)

    const categories = await generateCategories()
    console.log(`${categories.length} catégories ajoutées`)

    const articles = await generateArticles(users, categories)
    console.log(`${articles.length} articles ajoutés`)

    const comments = await generateComments(users, articles)
    console.log(`${comments.length} commentaires ajoutés aux articles`)

    process.exit(0)
}

generateFixtures()
