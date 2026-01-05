// import { faker } from "@faker-js/faker"
import { fakerFR as faker } from "@faker-js/faker"

import { Article } from "../models/Article.js"
import { RECIPES } from "./data/dataArticles.js"

export const generateArticles = async (users, categories) => {
    const articles = []

    const DISH_CATEGORIES = ["Entrées", "Plats", "Desserts", "Cocktails"]
    const DIFFICULTY_CATEGORIES = ["Facile", "Intermédiaire", "Difficile"]

    const dishCategories = categories.filter(cat =>
        DISH_CATEGORIES.includes(cat.label)
    )

    const difficultyCategories = categories.filter(cat =>
        DIFFICULTY_CATEGORIES.includes(cat.label)
    )

    // Generate real data
    RECIPES.forEach(recipe => {
        const author = users[Math.floor(Math.random() * users.length)]

        const title = recipe.title
        const slug = faker.helpers.slugify(title.toLowerCase())
        const content = recipe.content
        const categoryIds = recipe.categories.map(catLabel =>
            categories.find(cat => cat.label === catLabel)?._id
        ).filter(id => id)

        const coverImg = recipe.coverImg

        const data = {
            title,
            slug,
            content,
            author: author._id,
            categories: categoryIds,
            coverImage: coverImg,
            views: Math.floor(Math.random() * 1000),
            isPublished: true,
            createdAt: faker.date.past(),
            rating: {
                average: parseFloat((Math.random() * 5).toFixed(1)),
                count: Math.floor(Math.random() * 1000),
            },
        }

        if (Math.random() < 0.4) {
            data.updatedAt = faker.date.recent()
        }

        articles.push(data)

    })

    // Generate random data to reach 50 articles
    while (articles.length < 50) {
        const author = users[Math.floor(Math.random() * users.length)]
        const title = faker.lorem.sentence()
        const slug = faker.helpers.slugify(title.toLowerCase())
        const content = faker.lorem.paragraphs(3 + Math.floor(Math.random() * 5))
        
        const data = {
            title,
            slug,
            content,
            author: author._id,
            categories: [
                dishCategories[Math.floor(Math.random() * dishCategories.length)]._id,
                difficultyCategories[Math.floor(Math.random() * difficultyCategories.length)]._id,
            ],
            views: Math.floor(Math.random() * 1000),
            isPublished: faker.datatype.boolean({ probability: 0.7 }),
            coverImage: faker.image.url(),
            createdAt: faker.date.past(),
            rating: {
                average: parseFloat((Math.random() * 5).toFixed(1)),
                count: Math.floor(Math.random() * 1000),
            },
        }

        if (Math.random() < 0.4) {
            data.updatedAt = faker.date.recent()
        }

        articles.push(data)
    }

    await Article.insertMany(articles)

    return articles
}
