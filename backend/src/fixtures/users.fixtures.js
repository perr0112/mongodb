import bcrypt from "bcrypt"
// import { faker } from "@faker-js/faker"
import { fakerFR as faker } from "@faker-js/faker"

import { User } from "../models/User.js"

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

export const generateUsers = async (count = 10) => {
    const users = []

    for (let i = 0; i < count; i++) {
        const password = faker.internet.password(8)

        const hashedPassword = bcrypt.hashSync(password, salt)

        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()
        const username = `${faker.helpers.slugify(firstname.toLowerCase())}.${faker.helpers.slugify(lastname.toLowerCase())}`

        users.push({
            username,
            firstName: firstname,
            lastName: lastname,
            email: faker.internet.email(),
            hashedPassword,
            role: "user",
            avatarUrl: faker.image.avatar(),
        })
    }

    // Create one admin user
    users.push({
        username: "admin",
        email: "admin@lcg-dev.com",
        hashedPassword: bcrypt.hashSync("admin123", salt),
        firstName: "Walter",
        lastName: "White",
        role: "admin",
        avatarUrl: faker.image.avatar()
    })

    // Create one regular user
    users.push({
        username: "user",
        email: "user@lcg-dev.com",
        hashedPassword: bcrypt.hashSync("user123", salt),
        firstName: "Jessie",
        lastName: "Pinkman",
        role: "user",
        avatarUrl: faker.image.avatar()
    })

    await User.insertMany(users)

    return users
}
