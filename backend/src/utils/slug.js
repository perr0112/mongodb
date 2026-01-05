import { Article } from "../models/Article.js"
import { slugify } from "./string.js"

export const generateUniqueSlug = async (title, excludeId = null) => {
    const baseSlug = slugify(title)
    let finalSlug = baseSlug
    let counter = 1

    while (true) {
        const query = { slug: finalSlug }
        if (excludeId) {
            query._id = { $ne: excludeId }
        }

        const existing = await Article.findOne(query)
        
        if (!existing) {
            return finalSlug
        }

        finalSlug = `${baseSlug}-${counter}`
        counter++
    }
}
