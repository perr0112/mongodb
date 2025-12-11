import { Article } from "../models/Article.js";

import { slugify } from "../utils/string.js";
import { getUserFromId } from "./user.service.js";

const createArticle = async (
    title,
    content,
    author,
) => {
    const slug = slugify(title)

    try {
        const article = new Article({
            title,
            content,
            author,
            slug,
        });

        await article.save()
        console.log("Article ajouté ->", article);

        return article
    } catch (error) {
        console.error("Erreur lors de la création d'un article", error);
    }
}

const getArticles = async () => {
    const articles = await Article.find().populate("author")
    return articles
}

const getArticlesByUser = async (authorId) => {
    const articles = await Article.find({ author: authorId }).populate("author")
    return articles
}

const getArticleById = async (id) => {
    const article = await Article.findById(id).populate("author")
    return article
}

const getArticleBySlug = async (slug) => {
    const article = await Article.findOne({ slug }).populate("author")
    return article
}

const updateArticle = async (articleId, title, content) => {
    try {
        const slug = slugify(title)

        const article = await Article.findByIdAndUpdate(
            articleId,
            {
                title,
                content,
                slug,
                updatedAt: Date.now(),
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

export {
    createArticle,
    deleteArticle,
    getArticles,
    getArticleById,
    getArticlesByUser,
    getArticleBySlug,
    updateArticle,
}
