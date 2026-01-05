import { Article, Category } from "../models/Article.js"
import { getUserFromId } from "./user.service.js"

import { generateUniqueSlug } from "../utils/slug.js"
import { slugify } from "../utils/string.js"

const createArticle = async (title, content, author, duration, isPublished = true, categorySlugs, coverImage) => {
    const slug = await generateUniqueSlug(title)

    let categoryIds = []
    if (categorySlugs && categorySlugs.length > 0) {
        const categoryDocs = await Category.find({ slug: { $in: categorySlugs } })
        categoryIds = categoryDocs.map(c => c._id)
    }

    const article = new Article({
        title,
        content,
        author,
        slug,
        isPublished,
        duration,
        categories: categoryIds,
        coverImage
    })

    try {
        await article.save()
        console.log("########################################")
        console.log("Article ajouté avec succès ->", slug)
        return article
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Une erreur de doublon est survenue, merci de réessayer.")
        }
        throw error
    }
}

const getArticles = async (queryParams) => {
    let {
        page = 1,
        limit = 10,
        sort = "-createdAt",
        category,
        difficulty,
        popularity,
        search,
    } = queryParams

    const filters = { isPublished: true }

    let categoryIds = []

    if (category) {
        const cat = await Category.findOne({ slug: category })
        if (cat) categoryIds.push(cat._id)
    }

    if (difficulty) {
        const diffCat = await Category.findOne({ slug: difficulty })
        if (diffCat) categoryIds.push(diffCat._id)
    }

    if (categoryIds.length > 0) {
        filters.categories = { $all: categoryIds }
    }

    if (search) {
        filters.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ]
    }

    if (popularity === "plus_vues") sort = "-views"
    if (popularity === "plus_recentes") sort = "-createdAt"

    if (popularity === "plus_appreciees") {
        sort = "-rating.average -rating.count"
    }

    const skip = (Number(page) - 1) * Number(limit)

    const articles = await Article.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate("author")
        .populate("categories")

    const total = await Article.countDocuments(filters)

    return {
        articles,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
    }
}

const getArticlesByUser = async (authorId) => {
    const articles = await Article.find({ author: authorId }).populate("author").populate("categories")
    return articles
}

const getArticleById = async (id) => {
    const article = await Article.findById(id).populate("author")
    return article
}

const getArticleBySlug = async (slug) => {
    const article = await Article.findOne({ slug }).populate("author").populate("categories")
    return article
}

const updateArticle = async (articleId, title, content, categorySlugs, isPublished, duration, coverImage) => {
    try {
        const slug = await generateUniqueSlug(title)

        let categoryIds = []
        if (categorySlugs && categorySlugs.length > 0) {
            const categoryDocs = await Category.find({ slug: { $in: categorySlugs } })
            categoryIds = categoryDocs.map(c => c._id)
        }

        const article = await Article.findByIdAndUpdate(
            articleId,
            {
                title,
                content,
                slug,
                duration,
                categories: categoryIds,
                updatedAt: Date.now(),
                isPublished,
                coverImage
            },
            { new: true }
        );

        console.log("Article mis à jour ->", article);

        return article
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'article", error);
    }
}

const deleteArticle = async (articleId) => {
    try {
        await Article.findByIdAndDelete(articleId);
    }
    catch (error) {
        console.error("Erreur lors de la suppression de l'article", error);
    }
}

const isExistingArticle = async (title) => {
    const slug = slugify(title)
    const article = await Article.findOne({ slug })
    return !!article
}

export {
    createArticle,
    deleteArticle,
    getArticles,
    isExistingArticle,
    getArticleById,
    getArticlesByUser,
    getArticleBySlug,
    updateArticle,
}
