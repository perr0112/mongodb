import { faker } from "@faker-js/faker"

import { Article } from "../models/Article.js"

export const generateArticles = async (users, categories) => {
    const articles = []

    for (let i = 0; i < 50; i++) {
        const author = users[Math.floor(Math.random() * users.length)]
        const category = categories[Math.floor(Math.random() * categories.length)]

        const title = faker.lorem.sentence()

        const data = {
            title,
            slug: faker.helpers.slugify(title.toLowerCase()),
            content: faker.lorem.paragraphs(5),
            author: author._id,
            category: category._id,
            views: Math.floor(Math.random() * 1000),
            isPublished: faker.datatype.boolean(),
            coverImage: faker.image.url(),
            createdAt: faker.date.past(),
        }

        if (Math.random() < 0.4) {
            data.updatedAt = faker.date.recent()
        }

        articles.push(data)
    }

    await Article.insertMany(articles)

    return articles
}
