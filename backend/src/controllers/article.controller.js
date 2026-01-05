import { createArticle, deleteArticle, getArticleById, getArticleBySlug, getArticles, getArticlesByUser, updateArticle } from "../services/articles.service.js"
import { getUserFromId } from "../services/user.service.js"

import { HTTPStatus } from "../config/httpStatus.js"

class ArticleController {
    async create(req, res, next) {
        const { title, content, author } = req.body

        if (!author) {
            return res
                .status(HTTPStatus.BAD_REQUEST)
                .json({ message: "Vous devez être connecté pour créer un article" })
        }

        if (!title || !content) {
            return res
                .status(HTTPStatus.BAD_REQUEST)
                .json({ message: "Les champs title et content sont requis" })
        }

        const article = await createArticle(title, content, author)

        if (!article) {
            return res
                .status(HTTPStatus.BAD_REQUEST)
                .json({ message: "Erreur lors de la création de l'article" })
        }

        return res.status(HTTPStatus.CREATED).json(article)
    }

    async getAll(req, res, next) {
        try {
            const queryParams = req.query
            const result = await getArticles(queryParams)


            return res.status(HTTPStatus.OK).json(result)
        } catch (error) {
            console.error(error)
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Erreur lors de la récupération des articles" })
        }
    }

    async getByUser(req, res, next) {
        const authorId = req.params.id
        const user = await getUserFromId(authorId)

        if (!user) {
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Utilisateur non trouvé" })
        }

        const articles = await getArticlesByUser(authorId)
        return res.status(HTTPStatus.OK).json(articles)
    }

    async getBySlug(req, res, next) {
        const slug = req.params.slug
        const article = await getArticleBySlug(slug)

        if (!article) {
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Article non trouvé" })
        }

        return res.json(article)
    }

    async update(req, res, next) {
        const { title, content } = req.body
        const articleId = req.params.id

        if (!title || !content) {
            return res
                .status(HTTPStatus.BAD_REQUEST)
                .json({ message: "Les champs title et content sont requis" })
        }

        const article = await updateArticle(articleId, title, content)

        if (!article) {
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Article non trouvé" })
        }

        return res.
            status(HTTPStatus.OK).json(article)
    }

    async delete(req, res, next) {
        const articleId = req.params.id
        const article = await getArticleById(articleId)

        if (!article) {
            return res
                .status(HTTPStatus.NOT_FOUND)
                .json({ message: "Article non trouvé" })
        }

        await deleteArticle(articleId)

        return res.json({
            message: "Article supprimé avec succès",
            article,
        })
    }
}

export const articleController = new ArticleController()
