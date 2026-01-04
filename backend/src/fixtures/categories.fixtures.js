import { Category } from "../models/Article.js"

export const generateCategories = async () => {
    const categoryEnumValues = Category.schema.path("label").enumValues

    const categories = categoryEnumValues.map((name) => ({
        label: name.charAt(0).toUpperCase() + name.slice(1),
    }))

    const createdCategories = await Category.insertMany(categories)
    
    return createdCategories
}
